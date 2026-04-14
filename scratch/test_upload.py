import requests

url = "http://localhost:8000/upload-csv"
file_path = "test_random_data.csv"

try:
    with open(file_path, "rb") as f:
        files = {"file": f}
        print(f"Uploading {file_path} to {url}...")
        response = requests.post(url, files=files)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
