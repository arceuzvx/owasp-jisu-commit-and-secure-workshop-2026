# 🎤 Live Workshop Guide: Security Demo

> **For workshop facilitators.** This guide walks you through a live coding demonstration using the `security-demo/` folder. You'll make real Git changes that fix security issues, showing students how Git and GitHub should be used thoughtfully.

---

## 🎯 What You're Demonstrating

| OWASP ID | Vulnerability | What Students See |
|----------|--------------|------------------|
| **A02:2021** | Cryptographic Failures | Secrets hardcoded in source code, exposed via Git history |
| **A05:2021** | Security Misconfiguration | Missing `.gitignore` entries, debug mode on, default credentials |

---

## 🧰 Setup Before the Workshop

1. Make sure you have a local clone of the repository
2. Open a terminal in the repo root
3. Open the interactive demo in a browser: `security-demo/index.html`
4. Have your text editor ready (VS Code recommended — students can see your changes live)

---

## 📋 Demo Script (Step by Step)

### Act 1: "The Leak" — Showing the Problem

> 🗣️ *"Let's say you're building a web app and you need to connect to a database and a payment API..."*

**Step 1: Show the hardcoded secrets**

Open the interactive demo (Lab 1) in the browser. Click through the files:
- `config.js` → point out the database password in plain text
- `api-handler.js` → point out the Stripe API key
- `auth.js` → point out the JWT secret

> 🗣️ *"These are real-looking secrets hardcoded directly into source code. What happens when we push this to GitHub?"*

**Step 2: Show the attack timeline**

The demo animates this automatically when you click a secret file:
- 0:00 — Push to GitHub
- 0:03 — Automated bot scans public repos
- 0:07 — API key is harvested
- 0:15 — Unauthorized API calls begin

> 🗣️ *"Bots scan every public GitHub push within SECONDS. This isn't theoretical — it happens constantly."*

---

### Act 2: "The Fix" — Live Coding with Git

Now switch from the browser demo to your **terminal and editor**. Make real changes.

**Step 3: Create a `.env` file with the secrets**

```bash
cd security-demo
```

Create a new file called `.env`:

```bash
# In your text editor, create security-demo/.env with:
```

```
DB_HOST=db.example.com
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=SuperSecret_DB_Pass!2024
STRIPE_API_KEY=sk_live_a1b2c3d4e5f6g7h8i9j0
JWT_SECRET=my-ultra-secret-jwt-key-never-share
```

> 🗣️ *"We move the secrets into a separate `.env` file. But this alone doesn't protect us — we need to tell Git to ignore it."*

**Step 4: Show that Git WOULD track the `.env` file**

```bash
git status
```

> Point out that `.env` appears as an untracked file. *"Git sees it! If we `git add .` right now, this file with all our secrets goes to GitHub."*

**Step 5: Add `.env` to `.gitignore`**

The project's root `.gitignore` already has `.env` listed. Show students:

```bash
cat ../.gitignore | head -20
```

> 🗣️ *"See? `.env` is in our `.gitignore`. This tells Git: NEVER track this file, NEVER commit it, NEVER push it."*

**Step 6: Verify Git ignores it**

```bash
git status
```

> 🗣️ *"Notice `.env` is gone from the output. Git is now pretending it doesn't exist. That's exactly what we want."*

**Step 7: Show the secure code pattern**

Toggle the "Show Secure Version" switch in the browser demo, or open the files and show the difference:

```javascript
// ❌ BEFORE (hardcoded)
const API_KEY = 'sk_live_a1b2c3d4e5f6g7h8i9j0';

// ✅ AFTER (environment variable)
const API_KEY = process.env.STRIPE_API_KEY;
```

> 🗣️ *"The code reads from `process.env` — it pulls the value from the `.env` file at runtime, but the actual secret never enters your Git repository."*

---

### Act 3: "The History Trap" — Why Deleting Isn't Enough

This is the most impactful part of the demo.

**Step 8: Simulate accidentally committing a secret**

Create a temporary file with a "leaked" secret:

```bash
echo "ADMIN_PASSWORD=oops_i_leaked_this" > leaked-secret.txt
git add leaked-secret.txt
git commit -m "Add config file"
```

> 🗣️ *"Oops! I just committed a file with a password. Let me delete it..."*

**Step 9: Delete the file and commit**

```bash
rm leaked-secret.txt
git add -A
git commit -m "Remove secret file"
```

> 🗣️ *"The file is gone from my folder. It's gone from the latest version. We're safe now, right?"*

**Step 10: Reveal the secret is STILL in history**

```bash
git log --oneline
```

Show there are two commits. Then:

```bash
git show HEAD~1:leaked-secret.txt
```

> 🗣️ *"There it is. Git remembers EVERYTHING. Even though I deleted the file, anyone with access to this repo can look at the history and find the secret. This is why `.gitignore` matters — preventing the commit in the first place is the ONLY safe approach."*

**Step 11: Clean up the demo commits**

Reset back to before the demo commits so the repo stays clean:

```bash
git reset --hard HEAD~2
```

> 🗣️ *"In a real scenario, if you accidentally push a secret, the only safe response is to immediately ROTATE the key — change it to a new value. You cannot un-push from the internet."*

---

### Act 4: "Fix the Config" — Interactive Exercise

Switch to **Lab 2** in the browser demo.

> 🗣️ *"Security isn't just about secrets. Let's look at common misconfigurations."*

Walk through each card and have students call out which ones to fix:

| # | Issue | Teaching Point |
|---|-------|---------------|
| 1 | Debug mode ON | Always disable debug in production |
| 2 | `.env` committed | Use `.gitignore` before first commit |
| 3 | `.gitignore` incomplete | Cover `*.key`, `*.pem`, `secrets/` |
| 4 | Default credentials | Never ship with `admin/admin123` |
| 5 | Verbose errors | Don't leak stack traces to users |
| 6 | API keys in frontend | Backend proxy, never expose in client JS |

> Have students toggle each fix. Celebrate when they hit 100%.

---

## 🔑 Key Takeaways to Reinforce

End the demo by summarizing these points:

1. **Secrets in code = secrets on the internet.** Bots find them in seconds.
2. **`.gitignore` is your first line of defense.** Set it up BEFORE your first commit.
3. **`.env` files store secrets locally.** Share `.env.example` (with placeholder values) instead.
4. **Git history is permanent.** Deleting a file doesn't remove it from history.
5. **If you leak a secret, ROTATE it.** Change the key immediately. Don't just delete the file.
6. **Security is a checklist, not a one-time thing.** Debug mode, default passwords, error messages — each is a door left open.

---

## ⏱️ Suggested Timing

| Section | Duration |
|---------|----------|
| Act 1: Show the problem (browser demo) | 5 min |
| Act 2: Live fix with Git | 10 min |
| Act 3: History trap demo | 5 min |
| Act 4: Config fix exercise | 5 min |
| Discussion & takeaways | 5 min |
| **Total** | **~30 min** |

---

## 📁 Files in This Demo

| File | Purpose |
|------|---------|
| `index.html` | Interactive security demo (both labs) |
| `style.css` | Dark "security ops" theme styling |
| `script.js` | All interactivity (vanilla JS) |
| `.env.example` | Template showing required env vars (safe to commit) |
| `README.md` | Student-facing explanation of the demo |
| `LIVE_WORKSHOP_GUIDE.md` | This file — facilitator guide |
