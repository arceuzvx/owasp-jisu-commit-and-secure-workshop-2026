# 🤝 Contributing Guide

Welcome! This guide walks you through the **complete workshop workflow** step by step.

Don't worry if you've never used Git before — we'll explain everything.

---

## 🗺️ The Big Picture

Here's what you'll do in this workshop (read this first, then follow the steps below):

```
ORIGINAL REPO (maintainer's)
        │
        ▼
   You FORK it ──────────────────────────────────┐
        │                                         │
        ▼                                         │
   YOUR FORK (your copy on GitHub)                │
        │                                         │
        ├── main branch ← stays UNTOUCHED         │
        │       │                                  │
        │       ├── my-website branch              │
        │       │     ↳ build your portfolio here  │
        │       │     ↳ deploy THIS branch on Pages│
        │       │                                  │
        │       └── add-my-profile branch          │
        │             ↳ add your contributor JSON   │
        │             ↳ open PR back ──────────────┘
        │
```

**Why this structure?**
- Your `main` branch stays clean and matches the original repo
- Your website changes live in their own branch (`my-website`) — they don't leak into the original
- Your contribution (JSON file) lives in a separate clean branch (`add-my-profile`) — the PR only contains your contributor file, nothing else

---

## 📝 Step-by-Step Instructions

### Step 1: Fork the Repository

1. Go to the original **Commit & Secure** repository on GitHub
2. Click the **"Fork"** button (top right)
3. This creates YOUR copy at `github.com/<your-username>/owasp-jisu-commit-and-secure-workshop-2026`

> 💡 **What is a fork?** A fork is your personal copy of someone else's repository. You can make changes freely without affecting the original.

---

### Step 2: Clone YOUR Fork

Open your terminal and clone your fork (not the original):

```bash
git clone https://github.com/<your-username>/owasp-jisu-commit-and-secure-workshop-2026.git
cd owasp-jisu-commit-and-secure-workshop-2026
```

> Replace `<your-username>` with your actual GitHub username.

---

### Step 3: Create a Branch for Your Website

**⚠️ IMPORTANT: Do NOT make website changes on `main`!**

Create a new branch called `my-website`:

```bash
git switch -c my-website
```

> 💡 **What does this do?** `git switch -c my-website` creates a new branch AND moves you to it. Think of a branch as a separate workspace where you can make changes without affecting `main`.

You can verify you're on the right branch:

```bash
git branch
```

You should see:

```
  main
* my-website     ← you are here
```

---

### Step 4: Choose a Theme and Customize Your Website

1. Look inside the `templates/` folder — pick one:
   - 🍦 `cream/` — Elegant and minimal
   - 💻 `hacker/` — Dark terminal cybersecurity aesthetic
   - 🏢 `corporate/` — Professional LinkedIn-style
   - 🕹️ `retro/` — Fun 90s retro computer vibe

2. Copy your chosen theme's files (`index.html` and `style.css`) to the **root** of your repository:

   ```bash
   # Example: if you chose the hacker theme
   cp templates/hacker/index.html ./index.html
   cp templates/hacker/style.css ./style.css
   ```

   On Windows (Command Prompt):
   ```cmd
   copy templates\hacker\index.html index.html
   copy templates\hacker\style.css style.css
   ```

3. Open `index.html` in your text editor
4. Find the `<!-- CUSTOMIZE -->` comments and update:
   - Your **name**
   - Your **bio / about section**
   - Your **GitHub URL**
   - Your **LinkedIn / social links**
   - Your **skills / interests**

5. Preview by opening `index.html` in your browser

---

### Step 5: Commit and Push Your Website

Save your website changes:

```bash
git add index.html style.css
git commit -m "Customize my portfolio website with hacker theme"
```

Push this branch to YOUR fork on GitHub:

```bash
git push origin my-website
```

---

### Step 6: Deploy Your Website with GitHub Pages

1. Go to YOUR fork on GitHub: `github.com/<your-username>/owasp-jisu-commit-and-secure-workshop-2026`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`my-website`** ← ⚠️ Select your website branch, NOT main!
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes, then visit: `https://<your-username>.github.io/owasp-jisu-commit-and-secure-workshop-2026`

> 🎉 **Your website is live!** Copy this URL — you'll need it in the next step.

---

### Step 7: Switch Back to Main

Now you need to go back to `main` to create your contribution:

```bash
git switch main
```

> 💡 **Why switch back?** Your `main` branch is still clean — it matches the original repo. Your contributor file needs to be based on this clean state so the Pull Request only contains YOUR file.

---

### Step 8: Create a Branch for Your Contribution

```bash
git switch -c add-my-profile
```

This creates a fresh branch from `main` — no website changes here, just your contributor file.

---

### Step 9: Create Your Contributor File

In the `contributors/` folder, create a file named **exactly** `<your-github-username>.json`:

```bash
# Example for username "aditi123"
# Create the file with your text editor
```

Paste this content and fill in YOUR details:

```json
{
  "name": "Your Full Name",
  "github": "your-github-username",
  "website": "https://your-github-username.github.io/owasp-jisu-commit-and-secure-workshop-2026",
  "theme": "hacker",
  "completed": true
}
```

**Important:**
- `github` must be your **exact** GitHub username
- `website` is the GitHub Pages URL from Step 6
- `theme` must be one of: `cream`, `hacker`, `corporate`, `retro` (lowercase)
- `completed` must be `true` (not `"true"` — no quotes!)

---

### Step 10: Commit and Push Your Contribution

```bash
git add contributors/<your-github-username>.json
git commit -m "Add my contributor profile"
git push origin add-my-profile
```

---

### Step 11: Open a Pull Request

1. Go to the **original** Commit & Secure repository on GitHub
2. You should see a yellow banner: **"add-my-profile had recent pushes — Compare & pull request"**
3. Click **Compare & pull request**
4. Fill out the PR template:
   - Your name
   - Your GitHub username
   - Your live website URL
   - Your chosen badge theme
   - Check all the boxes ✅
5. Click **Create pull request**

> 🎉 **You just made an open-source contribution!**

---

## ⚠️ Important Rules

1. **ONLY add your own contributor file.** Do not edit other people's files, README, or any other files.
2. **DO NOT commit secrets.** Never include passwords, API keys, or tokens.
3. **Valid JSON only.** Use [jsonlint.com](https://jsonlint.com) to check your syntax.
4. **Keep `main` clean.** Website changes go on `my-website` branch. Contributions go on `add-my-profile` branch.

---

## 🔍 Why Two Branches?

| Branch | Purpose | What goes here | Deployed? |
|--------|---------|---------------|-----------|
| `main` | Stays clean, matches original repo | Nothing — don't touch it! | No |
| `my-website` | Your portfolio website | index.html, style.css | Yes → GitHub Pages |
| `add-my-profile` | Your contribution to the original | contributors/\<username\>.json | No → becomes a PR |

This teaches you a real-world Git skill: **keeping different concerns in separate branches**. In professional teams, you never commit directly to `main` either!
