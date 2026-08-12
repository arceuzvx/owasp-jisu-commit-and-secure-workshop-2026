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
from pathlib import Path

# Ensure UTF-8 output on all platforms (including Windows)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

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
                
        # Validate name and github
        if not isinstance(data["name"], str) or not data["name"].strip():
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'name' must be a non-empty string.")
            return False
            
        if not isinstance(data["github"], str) or not data["github"].strip():
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'github' must be a non-empty string.")
            return False
            
        # Validate website
        website = data["website"]
        if not isinstance(website, str) or not (website.startswith("http://") or website.startswith("https://")):
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'website' must start with 'http://' or 'https://'.")
            return False
            
        # Validate theme
        valid_themes = ["cream", "hacker", "corporate", "retro"]
        if data["theme"] not in valid_themes:
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'theme' must be one of: {', '.join(valid_themes)}")
            return False
            
        # Validate completed
        if not isinstance(data["completed"], bool):
            print(f"[FAIL] Invalid contributor file: {file_path.name}")
            print(f"   Field 'completed' must be a boolean.")
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
