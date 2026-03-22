# Portfolio Deployment Justfile
# Run `just` to see available commands

# Default recipe - show help
default:
    @just --list

# ─────────────────────────────────────────────────────────────
# Development
# ─────────────────────────────────────────────────────────────

# Start development server
dev:
    BROWSER=none npm start

# Start dev server and open in browser
dev-open:
    npm start

# Start dev server via Docker
dev-docker:
    docker compose --profile dev up dev

# ─────────────────────────────────────────────────────────────
# Build & Deploy
# ─────────────────────────────────────────────────────────────

# Build production bundle (local verification)
build:
    npm run build

# Preview production build locally via Docker (nginx on port 8080)
preview:
    docker compose up --build portfolio

# Deploy: push to master triggers GitHub Actions CI/CD
deploy:
    git push origin master
    @echo "Pushed to master. GitHub Actions will build and deploy to https://codeblackwell.ai"
    @echo "Monitor: https://github.com/CodeBlackwell/codeblackwell.github.io/actions"

# Commit and deploy in one command
ship message:
    git add -A
    git commit -m "{{message}}"
    git push origin master
    @echo "Shipped! GitHub Actions will deploy to https://codeblackwell.ai"

# ─────────────────────────────────────────────────────────────
# Git Operations
# ─────────────────────────────────────────────────────────────

# Show git status
status:
    git status

# Commit all changes with a message
commit message:
    git add -A
    git commit -m "{{message}}"

# Commit and push to master
push message: (commit message)
    git push origin master

# ─────────────────────────────────────────────────────────────
# Utilities
# ─────────────────────────────────────────────────────────────

# Install dependencies
install:
    npm install

# Clean build artifacts
clean:
    rm -rf build/
    rm -rf node_modules/.cache/

# Fetch GitHub data (PRs, issues, orgs, pinned repos)
fetch-github:
    node git_data_fetcher.mjs

# Run tests
test:
    npm test

# Check for dependency vulnerabilities
audit:
    npm audit

# Fix dependency vulnerabilities (safe fixes only)
audit-fix:
    npm audit fix

# Check CI status for latest run
ci-status:
    gh run list --limit 5

# ─────────────────────────────────────────────────────────────
# Combined Workflows
# ─────────────────────────────────────────────────────────────

# Fresh start: clean, install, and start dev
fresh: clean install dev

# Full rebuild: clean and build
rebuild: clean build
