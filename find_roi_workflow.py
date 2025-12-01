import requests
import os
import json

api_key = os.environ.get('N8N_API_KEY')
base_url = "https://n8n.mindlinklab.com.br/api/v1"
headers = {"X-N8N-API-KEY": api_key}

def find_workflow():
    try:
        # Listar todos os workflows
        response = requests.get(f"{base_url}/workflows", headers=headers)
        if response.status_code != 200:
            print(f"Error listing workflows: {response.text}")
            return

        workflows = response.json().get('data', [])
        target_workflow = None

        print(f"Scanning {len(workflows)} workflows...")

        for w in workflows:
            # Obter detalhes completos do workflow para ver os nodes
            w_response = requests.get(f"{base_url}/workflows/{w['id']}", headers=headers)
            if w_response.status_code == 200:
                w_data = w_response.json()
                nodes = w_data.get('nodes', [])
                
                # Procurar por node webhook com path 'roi-report'
                for node in nodes:
                    if node.get('type') == 'n8n-nodes-base.webhook':
                        path = node.get('parameters', {}).get('path', '')
                        if path == 'roi-report':
                            target_workflow = w_data
                            print(f"FOUND WORKFLOW: {w['name']} (ID: {w['id']})")
                            break
            
            if target_workflow:
                break
        
        if target_workflow:
            # Salvar o workflow atual para backup
            with open('/home/ubuntu/flowcargo-landing/current_roi_workflow.json', 'w') as f:
                json.dump(target_workflow, f, indent=2)
            print("Workflow saved to current_roi_workflow.json")
        else:
            print("Workflow with webhook path 'roi-report' NOT FOUND.")

    except Exception as e:
        print(f"Exception: {str(e)}")

find_workflow()
