# 🤝 Contributing Guide

We're so excited you're ready to make an open-source contribution! This guide is designed for beginners. 

## Steps to Contribute

### Step 1: Create your repository
Use the **"Use this template"** button on this repository to create your own copy.

### Step 2: Customize your website
Pick a theme (Cream, Hacker, Corporate, or Retro) and edit your name, bio, and links in the HTML.

### Step 3: Enable GitHub Pages
Go to your repo Settings -> Pages and deploy your site so it has a live URL.

### Step 4: Clone the ORIGINAL repository
To contribute back to the main project, you need to clone the original repository to your computer:
```bash
git clone <URL_OF_THIS_MAIN_REPO>
cd owasp-jisu-commit-and-secure-workshop-2026
```

### Step 5: Create a new branch
Always create a branch for your changes:
```bash
git switch -c add-my-profile
```

### Step 6: Create your contributor file
In the `contributors/` directory, create a new file named exactly as your GitHub username: `your-username.json`.

**Format it exactly like this example:**
```json
{
  "name": "Jane Doe",
  "github": "janedoe",
  "website": "https://janedoe.github.io/my-site/",
  "theme": "Retro",
  "completed": true
}
```

### Step 7: Stage and Commit
Save your changes:
```bash
git add contributors/your-username.json
git commit -m "Add my contributor profile"
```

### Step 8: Push your branch
Upload your branch to GitHub:
```bash
git push origin add-my-profile
```

### Step 9: Open a Pull Request
Go to the original repository on GitHub. You should see a prompt to **"Compare & pull request"**. Click it, fill out the provided template, and submit!

---

## ⚠️ Important Rules
1. **ONLY modify your own file**. Do not edit `README.md`, other people's JSON files, or core code.
2. **DO NOT commit secrets**. Never include passwords, API keys, or tokens in your commits.
3. **Valid JSON only**. Ensure your JSON file has correct syntax (quotes around keys and values, commas in the right places).
