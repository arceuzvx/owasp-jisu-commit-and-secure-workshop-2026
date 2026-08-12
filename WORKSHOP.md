# 🛠️ Workshop Guide: Commit & Secure

Welcome to the hands-on lab! By the end of this guide, you will have your own customized website deployed on GitHub Pages and you will have made an open-source contribution to this project.

## 📋 Prerequisites
Before we start, ensure you have:
1. A **GitHub account**.
2. **Git installed** on your computer ([Download Git](https://git-scm.com/downloads)).
3. A **text editor** (e.g., VS Code, Sublime Text, or Notepad++).

---

## Part 1: Setting Up
1. Go to the original workshop repository.
2. Click the green **"Use this template"** button -> **"Create a new repository"**.
3. Name it (e.g., `my-portfolio`) and make it **Public**.
4. Open your terminal or command prompt and clone your new repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

## Part 2: Customizing Your Website
1. Open the folder in your text editor.
2. Find `index.html` and the `css` folder.
3. **Choose a Theme**: We offer 4 themes (Cream, Hacker, Corporate, Retro). Follow the instructions in the code to apply your favorite.
4. **Edit the HTML**: Change the name, bio, and links to your own.

## Part 3: Git Fundamentals
Now let's save your changes using Git!

> **Tip:** Git is like a time machine for your code. It tracks every change you make.

- Check what files changed:
  ```bash
  git status
  ```
- Stage your changes (tell Git you want to save them):
  ```bash
  git add index.html
  ```
- Commit your changes (take a snapshot):
  ```bash
  git commit -m "Update website with my details and Hacker theme"
  ```
- View your history:
  ```bash
  git log
  ```

## Part 4: Pushing to GitHub
Your changes are saved locally. Let's send them to GitHub.
```bash
git push origin main
```

## Part 5: Deploying with GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (on the left).
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select your `main` branch and `/root` folder, then click **Save**.
5. Wait a few minutes and refresh. You'll see a link to your live website at the top!

## Part 6: Secure Git Practices
Before you start contributing to other projects, you need to know how to keep secrets safe.
> **Note:** Learn more in our [SECURITY.md](SECURITY.md) file.

- **Use `.gitignore`**: Create a file named `.gitignore` to tell Git which files to ignore (like passwords, API keys, or large folders).
- **OWASP A02 (Cryptographic Failures)**: Never hardcode passwords or keys in your code.
- **OWASP A05 (Security Misconfiguration)**: Don't commit environment (`.env`) or config files that contain sensitive info.

## Part 7: Contributing Back
Now, let's add your name to the main project's Hall of Fame!

1. Clone the **ORIGINAL** workshop repository (not your template copy):
   ```bash
   git clone https://github.com/ORIGINAL_ORG/owasp-jisu-commit-and-secure-workshop-2026.git
   cd owasp-jisu-commit-and-secure-workshop-2026
   ```
2. Create a new branch for your work:
   ```bash
   git switch -c add-my-profile
   ```
3. Create a new file in the `contributors/` folder named `<your-github-username>.json`. Fill it out:
   ```json
   {
     "name": "Your Name",
     "github": "your-username",
     "website": "https://your-username.github.io/your-repo-name/",
     "theme": "Hacker",
     "completed": true
   }
   ```
4. Stage and commit:
   ```bash
   git add contributors/your-username.json
   git commit -m "Add my contributor profile"
   ```
5. Push your branch:
   ```bash
   git push origin add-my-profile
   ```
6. Go to the original repository on GitHub and click **Compare & pull request**.
7. Fill out the PR template and submit!

## Part 8: Getting Your Badge
Once your PR is merged, our system will generate a custom badge for you! Check [BADGES.md](BADGES.md) for details on how to show it off on your profile.

---

## 🛑 Troubleshooting
- **Git says "Who are you?"**: Run these commands to identify yourself:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
- **"Updates were rejected because the remote contains work that you do not have locally"**: Run `git pull origin main` before pushing.

## 📚 Glossary
- **Repository (Repo)**: A folder tracked by Git.
- **Commit**: A saved snapshot of your files.
- **Branch**: A parallel version of your repository.
- **Remote**: A version of your repository hosted on the internet (e.g., GitHub).
- **Pull Request (PR)**: A request to merge your branch's changes into the main project.
