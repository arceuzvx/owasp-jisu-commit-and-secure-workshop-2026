# 🔒 Security Policy

This workshop aligns with the **OWASP Top 10** to teach secure coding and Git practices from day one.

## Section 1: OWASP A02 — Cryptographic Failures
When using Git, it is critical that **API keys, access tokens, passwords, and other credentials are never exposed** in your code.

### ❌ BAD Example:
Hardcoding secrets directly in your code (e.g., `config.js`):
```javascript
const API_KEY = "secret123_do_not_share";
```

### ✅ GOOD Example:
Using environment variables. Keep a `.env` file that is NEVER tracked by Git, and use it in your code:
```javascript
const API_KEY = process.env.API_KEY;
```

> **IMPORTANT:** Git tracks history forever! If you commit a secret, and then delete the file in a later commit, the secret is *still in your Git history*. Attackers scrape GitHub for these exposed secrets. If this happens, you must revoke the secret immediately. Consider using tools like `git-secrets` to prevent accidental commits.

## Section 2: OWASP A05 — Security Misconfiguration
Security misconfiguration often happens when sensitive configuration files or unsafe defaults are pushed to public repositories.

### Using `.gitignore`
To prevent committing sensitive or unnecessary files, always use a `.gitignore` file. Here are common examples of what you should ignore:
```text
# Environment variables
.env
.env.local

# Keys and certificates
*.key
*.pem

# Folders containing secrets or local config
secrets/

# Dependencies (often huge and contain local builds)
node_modules/

# OS generated files
.DS_Store
Thumbs.db
```

## Section 3: Reporting Vulnerabilities
If you find a security vulnerability in this workshop repository, **please do not open a public issue**. Instead, please email the maintainers directly or use GitHub's private vulnerability reporting feature.

## Section 4: Best Practices Checklist
- [ ] Are all API keys and secrets in a `.env` file?
- [ ] Is `.env` listed in `.gitignore`?
- [ ] Did I review my `git status` before running `git add` to ensure I'm not including sensitive files?
- [ ] Am I using safe, default configurations for my deployment?
