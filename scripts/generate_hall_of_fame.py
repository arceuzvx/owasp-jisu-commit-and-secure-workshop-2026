#!/usr/bin/env python3
"""
generate_hall_of_fame.py

This script reads all contributor JSON files, validates them, and generates
the data.json file for the static Hall of Fame page.
"""

import json
import glob
from pathlib import Path
import sys

def main():
    # Define paths
    # We assume the script is run from the root of the repository
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
                # Add the badge field
                github_username = data.get("github")
                if github_username:
                    data["badge"] = f"../badges/generated/{github_username}.svg"
                    hall_of_fame_data.append(data)
                
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
