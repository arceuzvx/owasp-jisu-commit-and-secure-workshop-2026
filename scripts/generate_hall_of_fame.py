#!/usr/bin/env python3
"""
generate_hall_of_fame.py

This script reads all contributor JSON files, validates them, and generates
the data.json file for the static Hall of Fame page.
"""

import json
import glob
import re
from pathlib import Path
import sys

def clean_github_username(raw: str) -> str:
    """Extract clean username even if participant enters URL or @ prefix."""
    if not isinstance(raw, str):
        return "unknown"
    u = raw.strip()
    for prefix in ["https://github.com/", "http://github.com/", "https://www.github.com/", "http://www.github.com/", "github.com/"]:
        if u.lower().startswith(prefix):
            u = u[len(prefix):]
    u = u.lstrip("@").rstrip("/").strip()
    u = re.sub(r'[^\w.-]', '_', u)
    return u or "unknown"

def main():
    repo_root = Path(__file__).resolve().parent.parent
    contributors_dir = repo_root / "contributors"
    hall_of_fame_dir = repo_root / "hall-of-fame"
    output_file = hall_of_fame_dir / "data.json"

    # Create hall-of-fame directory if it doesn't exist
    hall_of_fame_dir.mkdir(parents=True, exist_ok=True)

    hall_of_fame_data = []
    
    # Find all JSON files in the contributors directory
    json_files = glob.glob(str(contributors_dir / "*.json"))
    
    for file_path_str in json_files:
        file_path = Path(file_path_str)
        
        # Skip the example.json file
        if file_path.name == "example.json":
            continue
            
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            # Check if the contributor has completed the workshop
            if data.get("completed") is True:
                github_username = clean_github_username(data.get("github"))
                theme = str(data.get("theme", "corporate")).strip().lower()
                name = str(data.get("name", "Unknown")).strip()
                website = str(data.get("website", "")).strip()

                if github_username and github_username != "unknown":
                    entry = {
                        "name": name,
                        "github": github_username,
                        "website": website,
                        "theme": theme,
                        "completed": True,
                        "badge": f"../badges/generated/{github_username}.svg"
                    }
                    hall_of_fame_data.append(entry)
                
        except Exception as e:
            print(f"Error reading {file_path.name}: {e}", file=sys.stderr)
            
    # Write the compiled data to data.json
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(hall_of_fame_data, f, indent=2)
            
        print(f"Successfully generated Hall of Fame data with {len(hall_of_fame_data)} contributors.")
    except Exception as e:
        print(f"Error writing to {output_file}: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
