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

# ─────────────────────────────────────────────────────────────
# Build & Deploy
# ─────────────────────────────────────────────────────────────

# Build production bundle
build:
    npm run build

# Deploy to GitHub Pages (builds, copies to docs/, pushes to master)
deploy: build
    rm -rf docs/
    cp -r build/ docs/
    git add docs/
    git commit -m "Build for deployment" --allow-empty
    git push origin master
    @echo "✅ Deployed to https://codeblackwell.github.io"

# Quick deploy - build and deploy in one command
ship: deploy

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

# Full release: commit source, build, copy to docs/, push to master
release message: (commit message) build
    rm -rf docs/
    cp -r build/ docs/
    git add docs/
    git commit -m "Build for deployment" --allow-empty
    git push origin master
    @echo "🚀 Released and deployed!"

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

# ─────────────────────────────────────────────────────────────
# Combined Workflows
# ─────────────────────────────────────────────────────────────

# Fresh start: clean, install, and start dev
fresh: clean install dev

# Full rebuild: clean and build
rebuild: clean build
