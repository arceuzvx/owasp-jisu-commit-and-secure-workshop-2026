#!/usr/bin/env python3
"""
validate_contributor.py

This script validates all contributor JSON files to ensure they meet the workshop requirements.
It checks for required fields, valid themes, and correct data types.
"""

import json
import glob
import sys
import io
import re
from pathlib import Path

# Ensure UTF-8 output on all platforms (including Windows)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def clean_github_username(raw: str) -> str:
    """Extract clean username even if participant enters URL or @ prefix."""
    if not isinstance(raw, str):
        return ""
    u = raw.strip()
    for prefix in ["https://github.com/", "http://github.com/", "https://www.github.com/", "http://www.github.com/", "github.com/"]:
        if u.lower().startswith(prefix):
            u = u[len(prefix):]
    u = u.lstrip("@").rstrip("/").strip()
    return u

def validate_file(file_path: Path) -> bool:
    """Validates a single contributor JSON file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        required_fields = ["name", "github", "website", "theme", "completed"]
        
        # Check required fields
        for field in required_fields:
            if field not in data:
                print(f"[FAIL] Invalid contributor file: {file_path.name}")
                print(f"   Missing required field: {field}")
                return False
                
        # Validate name
        if not isinstance(data["name"], str) or not data["name"].strip():
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'name' must be a non-empty string.")
            return False
            
        # Validate github
        cleaned_github = clean_github_username(data["github"])
        if not cleaned_github:
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'github' must contain a valid username or GitHub profile link.")
            return False
            
        # Validate website
        website = str(data["website"]).strip()
        if not (website.startswith("http://") or website.startswith("https://")):
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'website' must start with 'http://' or 'https://'.")
            return False
            
        # Validate theme (case-insensitive and trimmed)
        valid_themes = ["cream", "hacker", "corporate", "retro"]
        theme = str(data["theme"]).strip().lower()
        if theme not in valid_themes:
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'theme' must be one of: {', '.join(valid_themes)}")
            return False
            
        # Validate completed
        if not isinstance(data["completed"], bool):
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'completed' must be a boolean (true or false).")
            return False
            
        return True
        
    except json.JSONDecodeError:
        print(f"[FAIL] Invalid contributor file: {file_path.name}")
        print("   File is not valid JSON.")
        return False
    except Exception as e:
        print(f"[FAIL] Invalid contributor file: {file_path.name}")
        print(f"   Unexpected error: {e}")
        return False

def main():
    repo_root = Path(__file__).resolve().parent.parent
    contributors_dir = repo_root / "contributors"
    
    json_files = glob.glob(str(contributors_dir / "*.json"))
    
    all_valid = True
    files_checked = 0
    
    for file_path_str in json_files:
        file_path = Path(file_path_str)
        
        # Skip example.json
        if file_path.name == "example.json":
            continue
            
        files_checked += 1
        
        if not validate_file(file_path):
            all_valid = False
            
    if all_valid:
        print(f"[PASS] All contributor files are valid! ({files_checked} files checked)")
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
