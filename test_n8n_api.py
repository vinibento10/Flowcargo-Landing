import requests
import os
import json

# Tentar usar a chave injetada, se existir
api_key = os.environ.get('N8N_API_KEY')
base_url = "https://n8n.mindlinklab.com.br/api/v1"

print(f"Testing connection to {base_url}...")
print(f"API Key present: {'Yes' if api_key else 'No'}")

if not api_key:
    print("ERROR: N8N_API_KEY not found in environment.")
    exit(1)

headers = {
    "X-N8N-API-KEY": api_key
}

try:
    response = requests.get(f"{base_url}/workflows", headers=headers)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        workflows = response.json().get('data', [])
        print(f"SUCCESS: Connected! Found {len(workflows)} workflows.")
        for w in workflows[:3]:
            print(f"- {w['name']} (ID: {w['id']})")
    else:
        print(f"FAILED: {response.text}")

except Exception as e:
    print(f"EXCEPTION: {str(e)}")
