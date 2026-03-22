#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# CDN Deployment Script
# Deploys CloudFormation stack and syncs build artifacts to S3
# ─────────────────────────────────────────────────────────────

STACK_NAME="codeblackwell-cdn"
REGION="us-east-1"  # Required for CloudFront + ACM
TEMPLATE="infrastructure/cloudformation.yml"
BUILD_DIR="build"
DOMAIN="codeblackwell.ai"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

usage() {
    cat <<EOF
Usage: $0 <command>

Commands:
  deploy-infra    Create/update the CloudFormation stack (S3, CloudFront, ACM, DNS)
  deploy-site     Build and sync site files to S3, then invalidate CloudFront cache
  deploy-lambda   Deploy/update Lambda@Edge OG tags function and attach to CloudFront
  deploy-all      Deploy infrastructure + site + Lambda@Edge
  status          Show stack status and outputs
  destroy         Delete the CloudFormation stack (requires confirmation)
  outputs         Show stack outputs (bucket name, distribution ID, etc.)
EOF
}

check_aws() {
    if ! aws sts get-caller-identity &>/dev/null; then
        echo -e "${RED}Error: AWS credentials not configured. Run 'aws configure' or set AWS env vars.${NC}"
        exit 1
    fi
    echo -e "${GREEN}AWS authenticated as: $(aws sts get-caller-identity --query 'Arn' --output text)${NC}"
}

get_output() {
    local key=$1
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue" \
        --output text 2>/dev/null
}

deploy_infra() {
    echo -e "${YELLOW}Deploying CloudFormation stack: ${STACK_NAME}${NC}"
    check_aws

    aws cloudformation deploy \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --template-file "$TEMPLATE" \
        --parameter-overrides DomainName="$DOMAIN" \
        --capabilities CAPABILITY_IAM \
        --no-fail-on-empty-changeset

    echo ""
    echo -e "${GREEN}Stack deployed successfully.${NC}"
    echo ""
    show_outputs

    echo ""
    echo -e "${YELLOW}IMPORTANT: If this is the first deploy:${NC}"
    echo "  1. Check the ACM certificate status - you may need to validate DNS records"
    echo "  2. Update your domain registrar's nameservers to the Route 53 nameservers above"
    echo "  3. DNS propagation can take up to 48 hours"
}

deploy_site() {
    check_aws

    BUCKET=$(get_output "BucketName")
    DISTRIBUTION_ID=$(get_output "DistributionId")

    if [ -z "$BUCKET" ] || [ -z "$DISTRIBUTION_ID" ]; then
        echo -e "${RED}Error: Could not retrieve stack outputs. Run 'deploy-infra' first.${NC}"
        exit 1
    fi

    # Build if build directory doesn't exist
    if [ ! -d "$BUILD_DIR" ]; then
        echo -e "${YELLOW}Building site...${NC}"
        npm run build
    fi

    echo -e "${YELLOW}Syncing to s3://${BUCKET}...${NC}"

    # Sync hashed assets with long cache headers
    aws s3 sync "$BUILD_DIR/static" "s3://${BUCKET}/static" \
        --region "$REGION" \
        --cache-control "public, max-age=31536000, immutable" \
        --delete

    # Sync everything else with shorter cache (HTML, manifest, etc.)
    aws s3 sync "$BUILD_DIR" "s3://${BUCKET}" \
        --region "$REGION" \
        --cache-control "public, max-age=300, s-maxage=86400" \
        --exclude "static/*" \
        --delete

    # Override specific files with no-cache for instant updates
    for file in index.html asset-manifest.json service-worker.js; do
        if [ -f "$BUILD_DIR/$file" ]; then
            aws s3 cp "$BUILD_DIR/$file" "s3://${BUCKET}/$file" \
                --region "$REGION" \
                --cache-control "public, max-age=0, must-revalidate"
        fi
    done

    echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)

    echo -e "${GREEN}Cache invalidation created: ${INVALIDATION_ID}${NC}"
    echo -e "${GREEN}Site deployed to https://${DOMAIN}${NC}"
}

show_status() {
    check_aws
    echo -e "${YELLOW}Stack status:${NC}"
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query "Stacks[0].{Status:StackStatus,Created:CreationTime,Updated:LastUpdatedTime}" \
        --output table 2>/dev/null || echo -e "${RED}Stack not found.${NC}"
}

show_outputs() {
    echo -e "${YELLOW}Stack outputs:${NC}"
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query "Stacks[0].Outputs[*].{Key:OutputKey,Value:OutputValue}" \
        --output table 2>/dev/null || echo -e "${RED}Stack not found.${NC}"
}

destroy() {
    echo -e "${RED}WARNING: This will delete all infrastructure including the S3 bucket and its contents.${NC}"
    read -rp "Type the stack name to confirm deletion [$STACK_NAME]: " confirm
    if [ "$confirm" != "$STACK_NAME" ]; then
        echo "Aborted."
        exit 1
    fi

    BUCKET=$(get_output "BucketName")
    if [ -n "$BUCKET" ]; then
        echo -e "${YELLOW}Emptying S3 bucket...${NC}"
        aws s3 rm "s3://${BUCKET}" --recursive --region "$REGION"
        # Also delete versioned objects
        aws s3api list-object-versions \
            --bucket "$BUCKET" \
            --region "$REGION" \
            --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}' \
            --output json | \
        aws s3api delete-objects --bucket "$BUCKET" --region "$REGION" --delete file:///dev/stdin 2>/dev/null || true
    fi

    echo -e "${YELLOW}Deleting CloudFormation stack...${NC}"
    aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
    aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION"
    echo -e "${GREEN}Stack deleted.${NC}"
}

deploy_lambda() {
    local FUNCTION_NAME="codeblackwell-og-tags"
    local LAMBDA_DIR="infrastructure/lambda/og-tags"

    check_aws

    ROLE_ARN=$(get_output "LambdaEdgeRoleArn")
    DISTRIBUTION_ID=$(get_output "DistributionId")

    if [ -z "$ROLE_ARN" ] || [ -z "$DISTRIBUTION_ID" ]; then
        echo -e "${RED}Error: Could not retrieve stack outputs. Run 'deploy-infra' first.${NC}"
        exit 1
    fi

    # Package Lambda code
    echo -e "${YELLOW}Packaging Lambda@Edge function...${NC}"
    TMPZIP="/tmp/og-tags-lambda.zip"
    rm -f "$TMPZIP"
    (cd "$LAMBDA_DIR" && zip "$TMPZIP" index.mjs)

    # Create or update the function
    if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" &>/dev/null; then
        echo -e "${YELLOW}Updating Lambda function...${NC}"
        aws lambda update-function-code \
            --function-name "$FUNCTION_NAME" \
            --region "$REGION" \
            --zip-file "fileb://${TMPZIP}" \
            --output text --query 'FunctionArn'

        aws lambda wait function-updated \
            --function-name "$FUNCTION_NAME" \
            --region "$REGION"
    else
        echo -e "${YELLOW}Creating Lambda function...${NC}"
        aws lambda create-function \
            --function-name "$FUNCTION_NAME" \
            --region "$REGION" \
            --runtime nodejs20.x \
            --handler index.handler \
            --role "$ROLE_ARN" \
            --zip-file "fileb://${TMPZIP}" \
            --timeout 5 \
            --memory-size 128 \
            --output text --query 'FunctionArn'

        aws lambda wait function-active \
            --function-name "$FUNCTION_NAME" \
            --region "$REGION"
    fi

    rm -f "$TMPZIP"

    # Publish a new version (Lambda@Edge requires a specific version, not $LATEST)
    echo -e "${YELLOW}Publishing new version...${NC}"
    VERSION_ARN=$(aws lambda publish-version \
        --function-name "$FUNCTION_NAME" \
        --region "$REGION" \
        --query 'FunctionArn' \
        --output text)
    echo -e "${GREEN}Published: ${VERSION_ARN}${NC}"

    # Update CloudFront to use the new Lambda version
    echo -e "${YELLOW}Attaching Lambda@Edge to CloudFront distribution...${NC}"
    ETAG=$(aws cloudfront get-distribution-config \
        --id "$DISTRIBUTION_ID" \
        --query 'ETag' \
        --output text)

    aws cloudfront get-distribution-config \
        --id "$DISTRIBUTION_ID" \
        --query 'DistributionConfig' \
        --output json \
    | jq --arg arn "$VERSION_ARN" \
        '.DefaultCacheBehavior.LambdaFunctionAssociations = {
            "Quantity": 1,
            "Items": [{
                "LambdaFunctionARN": $arn,
                "EventType": "viewer-request",
                "IncludeBody": false
            }]
        }' > /tmp/cf-dist-config.json

    aws cloudfront update-distribution \
        --id "$DISTRIBUTION_ID" \
        --distribution-config file:///tmp/cf-dist-config.json \
        --if-match "$ETAG" \
        --output text --query 'Distribution.Id'

    rm -f /tmp/cf-dist-config.json

    echo -e "${GREEN}Lambda@Edge attached to CloudFront distribution ${DISTRIBUTION_ID}${NC}"
    echo -e "${GREEN}OG tags function deployed. Social link previews are now active.${NC}"
}

# ─────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────
case "${1:-}" in
    deploy-infra)  deploy_infra ;;
    deploy-site)   deploy_site ;;
    deploy-lambda) deploy_lambda ;;
    deploy-all)    deploy_infra && deploy_site && deploy_lambda ;;
    status)        check_aws && show_status ;;
    outputs)       check_aws && show_outputs ;;
    destroy)       check_aws && destroy ;;
    *)             usage ;;
esac
