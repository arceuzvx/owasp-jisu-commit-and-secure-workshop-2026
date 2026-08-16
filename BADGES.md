# 🎖️ Badge System

Welcome to the **Commit & Secure Badge System**! When you complete this workshop, you earn a personalized badge to display on your GitHub profile.

## What are badges?
Badges are dynamic SVG images that showcase your achievement. They prove you have successfully completed the OWASP Git workshop and know how to make secure open-source contributions.

## How it works
1. You submit a Pull Request with your `contributors/<github-username>.json` file.
2. Once your PR is merged, our automated GitHub Actions workflow runs.
3. The workflow generates a personalized SVG badge with your name and chosen theme.
4. The badge is saved to `badges/generated/<github-username>.svg` in the repository.

## Badge Themes
You can choose a theme that matches your personality by setting the `"theme"` field in your JSON file:
- 🍦 **Cream**: Soft, minimalist, elegant.
- 💻 **Hacker**: Dark background, neon green text.
- 🏢 **Corporate**: Clean, professional, blue and gray.
- 🕹️ **Retro**: 8-bit aesthetic, pixel font.

## How to earn your badge
1. Complete all steps in the [WORKSHOP.md](WORKSHOP.md).
2. Create your contributor JSON file and ensure `"completed": true`.
3. Open a Pull Request and get it merged.

---

## 📋 How to display your badge in your README

Once your PR is merged, you can add your badge to your personal GitHub Profile README or your repository README!

### 1. Standard Markdown (Full Width)
Copy and paste this markdown snippet into your `README.md` (replace `<YOUR_GITHUB_USERNAME>` with your username):

```markdown
[![Commit & Secure Badge](https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/<YOUR_GITHUB_USERNAME>.svg)](https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026)
```

---

### 2. Custom Sizing / Smaller Badge (Recommended)
If the default badge is too large, you can control the exact width using HTML (e.g. `250px`, `300px`, `350px`):

```html
<a href="https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026">
  <img src="https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/<YOUR_GITHUB_USERNAME>.svg" width="280" alt="Commit & Secure Contributor Badge" />
</a>
```

---

### 3. Centered with Custom Size (For Profile READMEs)
To center the badge with a clean compact size on your profile:

```html
<p align="center">
  <a href="https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026">
    <img src="https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/<YOUR_GITHUB_USERNAME>.svg" width="280" alt="Commit & Secure Contributor Badge" />
  </a>
</p>
```

---

### 🌟 Live Examples:
- **Ankit Dey (nonsense3):**
  ```html
  <a href="https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026">
    <img src="https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/nonsense3.svg" width="280" alt="nonsense3's Badge" />
  </a>
  ```
- **Tom Riddle (TomRiddle1943):**
  ```html
  <a href="https://github.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026">
    <img src="https://raw.githubusercontent.com/arceuzvx/owasp-jisu-commit-and-secure-workshop-2026/main/badges/generated/TomRiddle1943.svg" width="280" alt="TomRiddle1943's Badge" />
  </a>
  ```
