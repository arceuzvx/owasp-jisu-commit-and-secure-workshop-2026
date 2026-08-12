"""
Generate Contributor Badges

This script automates the creation of personalized SVG badges for workshop contributors.
It reads JSON data for each contributor, checks if they've completed the workshop,
and generates a badge using their chosen theme template.
"""

import os
import json
import glob
from pathlib import Path

def main():
    # Define paths using pathlib for cross-platform compatibility
    # Assuming script is run from the workspace root or scripts/ directory
    base_dir = Path(__file__).resolve().parent.parent
    contributors_dir = base_dir / 'contributors'
    templates_dir = base_dir / 'badges' / 'templates'
    generated_dir = base_dir / 'badges' / 'generated'

    # Ensure generated directory exists
    generated_dir.mkdir(parents=True, exist_ok=True)

    print("Starting badge generation...")
    
    # Track statistics
    generated_count = 0
    skipped_count = 0
    error_count = 0

    # 1. Read all JSON files from contributors/ directory
    # glob helps us find all matching files
    json_pattern = str(contributors_dir / '*.json')
    json_files = glob.glob(json_pattern)

    for json_file in json_files:
        file_path = Path(json_file)
        
        # Skip the example.json file
        if file_path.name == 'example.json':
            continue
            
        try:
            # Read and parse the JSON file
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Extract required fields
            # Using .get() provides a safe way to access keys without KeyError
            name = data.get('name', 'Unknown')
            github = data.get('github', 'unknown')
            theme = data.get('theme', 'corporate').lower()
            completed = data.get('completed', False)

            # 2. Check if the contributor has completed the workshop
            if not completed:
                print(f"Skipping {github}: Workshop not marked as completed.")
                skipped_count += 1
                continue

            # 2a. Load the corresponding SVG template
            template_path = templates_dir / f"{theme}.svg"
            
            # Fallback to corporate if requested template doesn't exist
            if not template_path.exists():
                print(f"Warning: Theme '{theme}' not found for {github}, falling back to corporate.")
                template_path = templates_dir / "corporate.svg"
                
                # If fallback doesn't exist either, report error
                if not template_path.exists():
                    print(f"Error: Missing corporate fallback template!")
                    error_count += 1
                    continue

            with open(template_path, 'r', encoding='utf-8') as t:
                svg_content = t.read()

            # 2b & 2c. Replace placeholders with contributor info
            # The templates contain {name} and {github} markers
            svg_content = svg_content.replace('{name}', name)
            svg_content = svg_content.replace('{github}', github)

            # 2d. Save generated badge to badges/generated/<github>.svg
            output_path = generated_dir / f"{github}.svg"
            with open(output_path, 'w', encoding='utf-8') as out:
                out.write(svg_content)
                
            print(f"Successfully generated badge for {github} (Theme: {theme})")
            generated_count += 1

        except json.JSONDecodeError:
            print(f"Error parsing JSON in {file_path.name}")
            error_count += 1
        except Exception as e:
            print(f"Unexpected error processing {file_path.name}: {e}")
            error_count += 1

    # 3. Print summary of badges generated
    print("\n--- Badge Generation Summary ---")
    print(f"Successfully generated: {generated_count}")
    print(f"Skipped (not completed): {skipped_count}")
    print(f"Errors encountered: {error_count}")
    print("--------------------------------")

# 7. Include a main guard
if __name__ == '__main__':
    main()
