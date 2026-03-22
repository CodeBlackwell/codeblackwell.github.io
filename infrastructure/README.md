# Infrastructure

AWS CDN architecture for [codeblackwell.ai](https://codeblackwell.ai).

## Architecture

```
                          ┌─────────────────────────────────────────┐
                          │           CloudFront (CDN)              │
  User ──── HTTPS ──────► │  - Edge caching (200+ global PoPs)     │
                          │  - Brotli/Gzip compression             │
                          │  - HTTP/2 + HTTP/3                     │
                          │  - TLS 1.2+ (ACM certificate)          │
                          │  - Security headers (HSTS, CSP, etc.)  │
                          │                                        │
                          │  Lambda@Edge (viewer-request)           │
                          │  - Detects social crawlers by UA        │
                          │  - Returns custom OG/Twitter meta tags  │
                          │  - Per-route titles, descriptions,     │
                          │    and images for rich link previews    │
                          └────────────────┬───────────────────────┘
                                           │
                                           ▼
                          ┌─────────────────────────────────────────┐
                          │         S3 Bucket (private origin)      │
                          │  - Static site files                   │
                          │  - Origin Access Control (OAC)         │
                          │  - Versioning enabled                  │
                          └─────────────────────────────────────────┘

  DNS: Route 53 hosted zone for codeblackwell.ai
  SSL: ACM certificate (auto-renewing) for codeblackwell.ai + www
```

## Resources

All managed via CloudFormation stack `codeblackwell-cdn` in `us-east-1`:

| Resource                | Type                                 | Purpose                                |
| ----------------------- | ------------------------------------ | -------------------------------------- |
| S3 Bucket               | `codeblackwell.ai-site`              | Static site origin (private)           |
| CloudFront Distribution | `E1TR97BVTX25JU`                     | CDN with edge caching                  |
| Origin Access Control   | `codeblackwell-cdn-oac`              | Secure S3 access (no public bucket)    |
| Cache Policy            | `codeblackwell-cdn-cache-policy`     | Brotli/Gzip, no cookies/headers        |
| Response Headers Policy | `codeblackwell-cdn-response-headers` | HSTS, X-Frame-Options, etc.            |
| ACM Certificate         | `codeblackwell.ai` + `www`           | TLS certificate (auto-renewing)        |
| Route 53 Hosted Zone    | `codeblackwell.ai`                   | DNS (A/AAAA records to CloudFront)     |
| Lambda@Edge             | `codeblackwell-og-tags`              | Dynamic OG meta tags for link previews |
| IAM Role                | `codeblackwell-lambda-edge-role`     | Execution role for Lambda@Edge         |

## DNS

Nameservers (configured at Porkbun registrar):

```
ns-880.awsdns-46.net
ns-294.awsdns-36.com
ns-1956.awsdns-52.co.uk
ns-1335.awsdns-38.org
```

### DNS Records

| Record                   | Type     | Target                  |
| ------------------------ | -------- | ----------------------- |
| `codeblackwell.ai`       | A + AAAA | CloudFront distribution |
| `www.codeblackwell.ai`   | A        | CloudFront distribution |
| `spice.codeblackwell.ai` | CNAME    | `spice.letitcook.ing`   |

## Commands

```bash
just infra-deploy     # Create/update CloudFormation stack
just cdn-deploy       # Build site + sync to S3 + invalidate cache
just cdn-lambda       # Deploy/update Lambda@Edge OG tags function
just cdn-deploy-all   # All of the above
just cdn-status       # Show stack status
just cdn-outputs      # Show stack outputs (bucket, distribution ID, etc.)
just cdn-destroy      # Tear down all infrastructure (interactive)
just deploy-full      # Push to GitHub (Pages) + deploy to CDN
```

## Cache Strategy

| Content                             | Cache-Control                         | TTL                       |
| ----------------------------------- | ------------------------------------- | ------------------------- |
| `/static/*` (hashed by webpack)     | `public, max-age=31536000, immutable` | 1 year                    |
| Other assets                        | `public, max-age=300, s-maxage=86400` | 5 min browser / 1 day CDN |
| `index.html`, `asset-manifest.json` | `public, max-age=0, must-revalidate`  | Always revalidated        |

## Lambda@Edge: OG Tags

The Lambda@Edge function (`infrastructure/lambda/og-tags/index.mjs`) intercepts
viewer requests and checks the User-Agent header. If the request is from a social
media crawler (Slack, Discord, Twitter, LinkedIn, etc.), it returns a lightweight
HTML response with the correct Open Graph and Twitter Card meta tags for that route.
Normal browser requests pass through unchanged.

### Supported routes

- `/`, `/home`, `/projects`, `/experience`, `/education`, `/contact`, `/opensource`, `/beyond`
- `/projects/<id>` for project-specific previews (prove, crack, betterprompts, etc.)

### Adding a new project OG image

1. Create a 1200x630 PNG image
2. Save it to `public/og/<project-id>.png`
3. Add/update the entry in `infrastructure/lambda/og-tags/index.mjs` PROJECTS object
4. Run `just cdn-lambda` to deploy the updated function
5. Run `just cdn-deploy` to sync the new image to S3

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) runs on push to `master`:

1. Build React app
2. Deploy to GitHub Pages (fallback)
3. Sync to S3 with per-file-type cache headers (if AWS secrets are set)
4. Invalidate CloudFront cache

### Required GitHub Secrets

| Secret                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `AWS_ACCESS_KEY_ID`     | IAM user `codeblackwell-cdn-deployer` access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key                              |

## IAM

Deployer user: `codeblackwell-cdn-deployer`
Policy: `codeblackwell-cdn-policy` (scoped to this project's resources)

Permissions: CloudFormation (stack only), S3 (bucket only), CloudFront, ACM, Route 53, Lambda (function only), IAM (role only).

## Cost

~\$0.50/month (Route 53 hosted zone). CloudFront, S3, Lambda@Edge, and ACM are within free tier for portfolio-level traffic.

## Reproducing from Scratch

```bash
# 1. Configure AWS CLI
aws configure

# 2. Deploy infrastructure (creates S3, CloudFront, ACM, Route 53, IAM role)
just infra-deploy

# 3. Update domain registrar nameservers to Route 53 (see outputs)
just cdn-outputs

# 4. Wait for ACM certificate validation (DNS propagation)

# 5. Deploy site to S3
just cdn-deploy

# 6. Deploy Lambda@Edge for OG tags
just cdn-lambda

# 7. Set GitHub secrets for CI/CD
gh secret set AWS_ACCESS_KEY_ID --body "..."
gh secret set AWS_SECRET_ACCESS_KEY --body "..."
```
