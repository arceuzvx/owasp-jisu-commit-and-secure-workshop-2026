# 🛠️ Workshop Guide: Commit & Secure

Welcome to the hands-on lab! By the end of this workshop, you will have:
- ✅ Your own customized portfolio website live on GitHub Pages
- ✅ Made a real open-source contribution
- ✅ Earned a personalized badge
- ✅ Learned secure Git practices

## 📋 Prerequisites

Before we start, make sure you have:

1. A **GitHub account** → [Sign up here](https://github.com/join)
2. **Git installed** → [Download Git](https://git-scm.com/downloads)
3. A **text editor** → [VS Code](https://code.visualstudio.com/) (recommended), Sublime Text, or Notepad++

Verify Git is installed:
```bash
git --version
```

Set up your identity (one-time setup):
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Part 1: Fork & Clone

### 1.1 Fork the Repository

1. Go to the original **Commit & Secure** workshop repository on GitHub
2. Click the **"Fork"** button in the top-right corner
3. GitHub creates YOUR copy: `github.com/<your-username>/owasp-jisu-commit-and-secure-workshop-2026`

> 💡 **What is a fork?** It's your personal copy of the project on GitHub. You can change anything in your fork without affecting the original.

### 1.2 Clone Your Fork

Open your terminal and download your fork to your computer:

```bash
git clone https://github.com/<your-username>/owasp-jisu-commit-and-secure-workshop-2026.git
cd owasp-jisu-commit-and-secure-workshop-2026
```

> Replace `<your-username>` with your actual GitHub username!

### 1.3 Check What You Have

Look around:

```bash
git status          # Shows the current state
git branch          # Shows which branch you're on (should say "main")
ls templates/       # See the available themes
```

---

## Part 2: Create Your Website Branch

**⚠️ CRITICAL: Do NOT build your website on `main`!**

Your `main` branch must stay clean (untouched). Create a separate branch for your website:

```bash
git switch -c my-website
```

Verify you're on the new branch:

```bash
git branch
```

Output:
```
  main
* my-website     ← the star means you are HERE
```

> 💡 **Why a separate branch?** If you change `main`, those changes would be sent to the original repo when you make a Pull Request later. We don't want that! Your website is personal — it stays in its own branch.

---

## Part 3: Choose a Theme & Customize

### 3.1 Pick a Theme

Look inside the `templates/` folder. There are 4 options:

| Theme | Folder | Style |
|-------|--------|-------|
| 🍦 Cream | `templates/cream/` | Elegant, warm, minimal |
| 💻 Hacker | `templates/hacker/` | Dark terminal, neon green |
| 🏢 Corporate | `templates/corporate/` | Professional, LinkedIn-style |
| 🕹️ Retro | `templates/retro/` | 90s computer, CRT aesthetic |

### 3.2 Copy Your Theme to the Root

Copy your chosen theme's files to the root of the project:

```bash
# Example: choosing the hacker theme
cp templates/hacker/index.html ./index.html
cp templates/hacker/style.css ./style.css
```

On Windows (Command Prompt):
```cmd
copy templates\hacker\index.html index.html
copy templates\hacker\style.css style.css
```

### 3.3 Edit Your Website

Open `index.html` in your text editor. Look for comments like:

```html
<!-- CUSTOMIZE: Your Name Here -->
```

Change these to your own:
- **Name**
- **Bio / about section**
- **GitHub profile URL**
- **LinkedIn / social links**
- **Skills and interests**

### 3.4 Preview Locally

Open `index.html` directly in your web browser to see how it looks!

---

## Part 4: Git Fundamentals

Now let's save your work using Git. This is the core skill you're learning today.

### 4.1 Check What Changed

```bash
git status
```

You'll see your new/modified files listed in red — Git is telling you "I see changes, but you haven't saved them yet."

### 4.2 Stage Your Changes

Tell Git which files you want to save:

```bash
git add index.html style.css
```

Run `git status` again — the files are now in green. They're "staged" (ready to be saved).

> 💡 **What is staging?** It's like putting items on a conveyor belt before checkout. You choose what to include in your next save point.

### 4.3 Commit (Save a Snapshot)

```bash
git commit -m "Customize my portfolio with hacker theme"
```

> 💡 **What is a commit?** It's a permanent snapshot of your files at this moment. You can always go back to any commit. The `-m` flag adds a message describing what you changed.

### 4.4 View Your History

```bash
git log
```

You'll see your commit with its unique ID, author, date, and message. Press `q` to exit.

---

## Part 5: Push & Deploy

### 5.1 Push Your Website Branch to GitHub

```bash
git push origin my-website
```

> 💡 **push** = upload your local commits to GitHub. **origin** = your fork on GitHub. **my-website** = the branch you're pushing.

### 5.2 Enable GitHub Pages

1. Go to YOUR fork on GitHub
2. Click **Settings** (tab at the top)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: select **`my-website`** ← ⚠️ NOT main!
   - Folder: **/ (root)**
5. Click **Save**

### 5.3 See Your Live Website! 🎉

Wait 2–3 minutes, then visit:

```
https://<your-username>.github.io/owasp-jisu-commit-and-secure-workshop-2026
```

**📋 Copy this URL!** You'll need it when contributing.

---

## Part 6: Secure Git Practices

Before contributing to open-source, learn to keep secrets safe.

> 📖 Read more in [SECURITY.md](SECURITY.md) and explore the [security-demo/](security-demo/) folder.

### OWASP A02: Cryptographic Failures

**NEVER** put secrets in your code:

```javascript
// ❌ BAD — anyone who sees your repo can see this!
const API_KEY = "sk-secret-key-12345";

// ✅ GOOD — read from environment variable
const API_KEY = process.env.API_KEY;
```

### OWASP A05: Security Misconfiguration

Use `.gitignore` to prevent Git from tracking sensitive files:

```
# This project already has a .gitignore — check it out!
.env
*.key
*.pem
secrets/
```

> ⚠️ **Once a secret enters Git history, deleting the file does NOT remove it.** Git remembers everything. The only safe fix is to rotate (change) the compromised key.

---

## Part 7: Contributing Back to the Original Repo

Now comes the fun part — adding yourself to the Hall of Fame!

### 7.1 Switch Back to Main

```bash
git switch main
```

> 💡 Your `main` branch is still clean — exactly as it was when you forked. That's what we want!

### 7.2 Create a Contribution Branch

```bash
git switch -c add-my-profile
```

This creates a new branch from `main` — it has NO website changes, just a clean slate.

### 7.3 Create Your Contributor File

Create a new file in the `contributors/` folder named **exactly** `<your-github-username>.json`:

```json
{
  "name": "Your Full Name",
  "github": "your-github-username",
  "website": "https://your-github-username.github.io/owasp-jisu-commit-and-secure-workshop-2026",
  "theme": "hacker",
  "completed": true
}
```

**Rules:**
- `github`: your **exact** GitHub username (case-sensitive)
- `website`: your GitHub Pages URL from Part 5
- `theme`: must be one of `cream`, `hacker`, `corporate`, `retro` (lowercase!)
- `completed`: must be `true` (boolean, no quotes)

### 7.4 Commit and Push

```bash
git add contributors/<your-github-username>.json
git commit -m "Add my contributor profile"
git push origin add-my-profile
```

### 7.5 Open a Pull Request

1. Go to the **original** Commit & Secure repository on GitHub (not your fork)
2. You'll see a yellow banner: **"add-my-profile had recent pushes"**
3. Click **"Compare & pull request"**
4. Fill out the template (name, username, URL, theme)
5. Check all the boxes ✅
6. Click **"Create pull request"**

> 🎉 **Congratulations!** You just made a real open-source contribution!

---

## Part 8: Getting Your Badge

Once a maintainer reviews and merges your Pull Request:

1. A GitHub Action automatically runs
2. It validates your contributor JSON
3. It generates a personalized SVG badge in your chosen theme
4. Your name appears on the [Hall of Fame](hall-of-fame/index.html)

See [BADGES.md](BADGES.md) for how to display your badge on your own profile.

---

## 🔍 Understanding the Branch Structure

Here's a visual summary of what you did and why:

```
YOUR FORK
│
├── main ← UNTOUCHED (matches original repo)
│    │
│    ├── my-website ← Your portfolio lives here
│    │     • index.html (customized)
│    │     • style.css (your theme)
│    │     • Deployed on GitHub Pages
│    │
│    └── add-my-profile ← Your contribution lives here
│          • contributors/<username>.json
│          • This becomes your Pull Request
│
```

| Branch | What It's For | Do I Push It? | Does It Become a PR? |
|--------|--------------|---------------|---------------------|
| `main` | Stays clean | No | No |
| `my-website` | Your portfolio | Yes (to your fork) | No |
| `add-my-profile` | Your contribution | Yes (to your fork) | Yes → to original repo |

---

## 🛑 Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for solutions to common problems.

Quick fixes:
- **"Who are you?" error**: Run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`
- **"Updates were rejected"**: Run `git pull origin main` before pushing
- **Wrong branch?**: Run `git branch` to check, then `git switch <branch-name>` to move

## 📚 Glossary

| Term | What It Means |
|------|--------------|
| **Repository (Repo)** | A folder tracked by Git — it remembers every change |
| **Fork** | Your personal copy of someone else's repo on GitHub |
| **Clone** | Downloading a repo from GitHub to your computer |
| **Branch** | A separate workspace within your repo |
| **Commit** | A saved snapshot of your files at a point in time |
| **Push** | Uploading your local commits to GitHub |
| **Pull Request (PR)** | A request to merge your changes into someone else's project |
| **Merge** | Combining changes from one branch into another |
| **GitHub Pages** | Free website hosting from a GitHub repository |
