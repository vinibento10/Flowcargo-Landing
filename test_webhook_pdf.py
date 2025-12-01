import requests
import json
import os

webhook_url = "https://n8n.mindlinklab.com.br/webhook/roi-report"

payload = {
    "email": "teste@flowcargo.com.br",
    "source": "roi_calculator_test",
    "data": {
        "trucksPerDay": 100,
        "waitTime": 60,
        "hourlyCost": 150,
        "savings": {
            "monthly": 120000,
            "yearly": 1440000,
            "time": 800
        }
    },
    "timestamp": "2025-12-01T12:00:00Z"
}

try:
    print(f"Sending test payload to {webhook_url}...")
    response = requests.post(webhook_url, json=payload, headers={"Content-Type": "application/json"})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code >= 200 and response.status_code < 300:
        print("SUCCESS: Webhook received the payload.")
    else:
        print("ERROR: Webhook failed to process the request.")
        
except Exception as e:
    print(f"EXCEPTION: {str(e)}")
