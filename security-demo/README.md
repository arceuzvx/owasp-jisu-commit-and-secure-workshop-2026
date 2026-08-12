# 🔐 Security Demo: Why Secrets Should Never Be Committed
A practical demonstration for the Commit & Secure OWASP Workshop

### What This Demo Shows
Two OWASP Top 10 vulnerabilities and how they relate to Git:
- **A02:2021 – Cryptographic Failures**: Exposing secrets in code
- **A05:2021 – Security Misconfiguration**: Improper configuration leading to exposure

### The Problem (insecure-example.js)
Explain: This file shows what NOT to do — hardcoding secrets directly in source code.
Why it's dangerous: Anyone who can see your repo can see your keys. Even if you delete the file later, the secret remains in Git history forever.

### The Solution (secure-example.js)
Explain: This file shows the correct approach — using environment variables.
The actual secret values are stored in a `.env` file that is listed in `.gitignore` so Git never tracks it.

### The .env.example File
Explain: This is a TEMPLATE showing what environment variables are needed, but without actual secret values. This is safe to commit.

### Key Takeaways
1. NEVER hardcode API keys, passwords, or tokens in your code
2. Use .env files for secrets and add .env to .gitignore
3. Provide a .env.example file so others know what variables to set
4. If you accidentally commit a secret, rotating (changing) the key is the ONLY safe fix
5. Deleting a file doesn't remove it from Git history — `git log` remembers everything

### Try It Yourself
Steps to demonstrate:
1. Look at insecure-example.js — see the hardcoded key
2. Look at secure-example.js — see how it reads from environment
3. Copy .env.example to .env and fill in a test value
4. Notice that .env is in .gitignore — Git won't track it
5. Try `git status` — .env should NOT appear
