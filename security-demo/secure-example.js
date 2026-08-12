// ✅ SECURE example
// This file demonstrates the correct way to handle secrets
// Following OWASP best practices

// ✅ GOOD PRACTICE: Read secrets from environment variables
// The actual values are stored in a .env file that is NOT tracked by Git

const API_KEY = process.env.API_KEY;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// This function uses the environment variable
function fetchData() {
    // Check that the API key is set before using it
    if (!API_KEY) {
        console.error("❌ API_KEY is not set! Copy .env.example to .env and fill in your values.");
        process.exit(1);
    }
    
    console.log("Fetching data securely...");
    // The API key is used but never printed or logged
    // In a real app, this would make an API call using the key
}

// Why is this secure?
// 1. The actual secret values are in .env, which is listed in .gitignore
// 2. Git never tracks .env, so secrets never enter the repository history
// 3. Each developer/environment has its own .env with its own values
// 4. The .env.example file shows what variables are needed WITHOUT revealing values

fetchData();
