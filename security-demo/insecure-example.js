// ⚠️ WARNING: This is an INSECURE example!
// DO NOT do this in real projects.
// This file demonstrates OWASP A02:2021 - Cryptographic Failures

// ❌ BAD PRACTICE: Hardcoding secrets directly in source code
// If this file is pushed to GitHub, ANYONE can see these secrets!

const API_KEY = "sk-demo-secret-key-12345";
const DATABASE_PASSWORD = "super_secret_password_123";
const JWT_SECRET = "my-jwt-secret-do-not-share";

// This function uses the hardcoded API key
function fetchData() {
    console.log("Fetching data with API key:", API_KEY);
    // In a real app, this would make an API call
    // Anyone reading this code can steal your API key!
}

// Why is this dangerous?
// 1. Anyone who can view this repository can see your secrets
// 2. Even if you delete this file later, the secret remains in Git history
// 3. Bots scan GitHub for exposed API keys and can exploit them within minutes
// 4. You could be charged money if someone uses your cloud API key

fetchData();
