# 🎖️ Badge System

Welcome to the **Commit & Secure Badge System**! When you complete this workshop, you earn a personalized badge to display on your GitHub profile.

## What are badges?
Badges are dynamic SVG images that showcase your achievement. They prove you have successfully completed the OWASP Git workshop and know how to make secure open-source contributions.

## How it works
1. You submit a Pull Request with your `<github-username>.json` file.
2. Once your PR is merged, our automated GitHub Actions script reads your JSON file.
3. The script generates a personalized SVG badge with your name and chosen theme.
4. The badge is saved in the repository for you to link to!

## Badge Themes
You can choose a theme that matches your personality by setting the `"theme"` field in your JSON file:
- 🍦 **Cream**: Soft, minimalist, elegant.
- 💻 **Hacker**: Dark background, neon green text.
- 🏢 **Corporate**: Clean, professional, blue and gray.
- 🕹️ **Retro**: 8-bit aesthetic, pixel font.

## How to earn your badge
1. Complete all steps in the [WORKSHOP.md](WORKSHOP.md).
2. Create your contributor JSON file and ensure `"completed": true`.
3. Open a Pull Request.
4. Wait for a maintainer to approve and merge it!

## How to display your badge
Once your badge is generated, you can show it off on your GitHub Profile README (or any other markdown file).

### Example Embed Code
Copy and paste this into your README, replacing `YOUR_USERNAME` with your actual GitHub username:

```markdown
![My Commit & Secure Badge](https://raw.githubusercontent.com/YOUR_ORG/owasp-jisu-commit-and-secure-workshop-2026/main/badges/YOUR_USERNAME.svg)
```
*(Note: Replace `YOUR_ORG` with the actual organization or user hosting the main repository)*
