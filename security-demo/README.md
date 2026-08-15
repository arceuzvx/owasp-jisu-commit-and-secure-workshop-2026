# 🔐 Security Demo: Interactive OWASP Workshop

A hands-on interactive demo for the **Commit & Secure** OWASP Workshop covering two critical vulnerabilities from the OWASP Top 10.

## 🚀 How to Use

Open `index.html` in your browser — no server or build tools needed!

---

## Lab 1: "The Leak" — OWASP A02:2021 (Cryptographic Failures)

**What it shows:** What happens when you hardcode secrets (API keys, passwords, tokens) directly in your source code and push to GitHub.

**How to use:**
1. Click through the files in the left panel — explore the project
2. Find the files with exposed secrets (they glow red!)
3. Watch the **attack timeline** — see how fast bots find your secrets
4. Toggle **"Show Secure Version"** to see the correct approach using environment variables
5. Notice how `.env` is blocked by `.gitignore` in the secure version

**Key takeaway:** Bots scan every public GitHub push within seconds. Once a secret is in Git history, deleting the file does NOT remove it.

---

## Lab 2: "Fix the Config" — OWASP A05:2021 (Security Misconfiguration)

**What it shows:** 6 common security misconfigurations that leave applications vulnerable.

**How to use:**
1. Read through each misconfiguration card
2. Click **"View Impact"** to see what an attacker would exploit
3. Click **"Fix It"** to apply the fix and increase your security score
4. Reach **100%** to secure the deployment!

**The 6 issues:**
| # | Issue | Points |
|---|-------|--------|
| 1 | Debug mode is ON | +15 |
| 2 | .env file is committed to Git | +20 |
| 3 | .gitignore is missing entries | +15 |
| 4 | Default admin credentials active | +20 |
| 5 | Verbose error messages in production | +15 |
| 6 | API keys in frontend JavaScript | +15 |

---

## 🎤 For Workshop Facilitators

See **[LIVE_WORKSHOP_GUIDE.md](LIVE_WORKSHOP_GUIDE.md)** for a complete live demo script with:
- Speaking notes and timing
- Terminal commands to run live
- A "History Trap" demo showing why `git log` remembers everything
- Step-by-step walkthrough for fixing issues with real Git commands

---

## 📁 Files in This Demo

| File | Purpose |
|------|---------|
| `index.html` | Interactive demo (open this in your browser) |
| `style.css` | Dark "security ops" theme |
| `script.js` | All interactivity (vanilla JS, well-commented) |
| `.env.example` | Template showing required environment variables |
| `README.md` | This file |
| `LIVE_WORKSHOP_GUIDE.md` | Facilitator guide for live workshops |
