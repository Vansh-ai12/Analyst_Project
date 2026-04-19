#!/usr/bin/env python3
import requests
import sys
from pathlib import Path

# Test file path
test_file = r"C:\Users\Dell\Downloads\OnlineRetail (1).csv"

# Check if file exists
if not Path(test_file).exists():
    print(f"ERROR: File not found: {test_file}")
    sys.exit(1)

print(f"Testing upload with: {test_file}")
print(f"File size: {Path(test_file).stat().st_size} bytes")

# Upload to backend
backend_url = "http://localhost:8000/upload-csv"

try:
    with open(test_file, 'rb') as f:
        files = {'file': f}
        print(f"\nSending POST request to {backend_url}...")
        response = requests.post(backend_url, files=files, timeout=120)
        
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        print("\n✓ SUCCESS! Analysis completed.")
        import json
        data = response.json()
        print("\nAnalysis Results:")
        print(json.dumps(data, indent=2)[:2000])  # Print first 2000 chars
        print("\n... (data truncated)")
    else:
        print(f"\n✗ ERROR: {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"\n✗ ERROR: {type(e).__name__}: {str(e)}")
    import traceback
    traceback.print_exc()
