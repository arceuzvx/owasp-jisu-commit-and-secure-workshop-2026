# 🔧 Troubleshooting Guide
Common issues and solutions for workshop participants

### 1. Git is Not Installed
Symptom: Running `git --version` gives error
Solution: Download from https://git-scm.com/downloads
Instructions for Windows, macOS, Linux
Verify: `git --version`

### 2. "Permission denied" When Pushing
Symptom: `git push` fails with permission error
Solutions:
- Check you're pushing to YOUR repository, not the original
- Set up SSH key or use HTTPS with personal access token
- Verify remote: `git remote -v`

### 3. GitHub Pages Not Appearing
Symptom: Website shows 404 or doesn't load
Solutions:
- Go to Settings → Pages → Deploy from branch → select main and /root
- Wait 2-5 minutes for deployment
- Check the Actions tab for deployment status
- Make sure index.html is in the root of the selected folder
- Try hard refresh (Ctrl+Shift+R)

### 4. Pull Request Rejected
Possible causes with solutions for each:
- Invalid JSON format → use a JSON validator (jsonlint.com)
- Wrong filename → must be `contributors/<your-github-username>.json`
- Missing required fields → include all 5: name, github, website, theme, completed
- Invalid theme → must be one of: cream, hacker, corporate, retro
- Modified other files → only add YOUR contributor file

### 5. Badge Not Generated
Symptom: PR merged but no badge
Solutions:
- Check the Actions tab in the repository
- Ensure `completed` is set to `true` (not `"true"` as a string)
- Ensure your theme is valid
- GitHub Actions may take a minute to run

### 6. Merge Conflicts
Explanation: What they are and why this workshop avoids them
- Each contributor creates their OWN JSON file
- You should never edit another contributor's file
- If you get a conflict, you likely edited a shared file

### 7. "fatal: not a git repository"
Symptom: Git commands fail with this error
Solution: Make sure you're in the right directory. Use `cd` to navigate to your project folder.

### 8. Changes Not Showing on GitHub
Symptom: You committed but GitHub doesn't show changes
Solution: You need to PUSH after committing:
```
git push origin main
```
Commit = save locally, Push = upload to GitHub

### Still Stuck?
Links to: create an issue using the workshop help template, ask your workshop facilitator
