import requests
import os
import json

api_key = os.environ.get('N8N_API_KEY')
base_url = "https://n8n.mindlinklab.com.br/api/v1"
headers = {"X-N8N-API-KEY": api_key}

# Carregar o workflow atual
with open('/home/ubuntu/flowcargo-landing/current_roi_workflow.json', 'r') as f:
    workflow_data = json.load(f)

workflow_id = workflow_data['id']
print(f"Updating workflow ID: {workflow_id} ({workflow_data['name']})")

# Definir os novos nodes para adicionar (HTML + PDF + Email)
# Mantendo o Webhook original e conectando a ele
new_nodes = [
    {
      "parameters": {
        "html": "<html>\n<head>\n<style>\n  body { font-family: 'Arial', sans-serif; color: #333; background-color: #f4f4f9; margin: 0; padding: 0; }\n  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }\n  .header { background: #0b0b0f; color: white; padding: 30px; text-align: center; }\n  .header h1 { margin: 0; font-size: 24px; color: #18d4d4; }\n  .content { padding: 40px; }\n  .highlight { color: #7b61ff; font-weight: bold; }\n  .savings-box { background: #f0f0f5; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center; border: 1px solid #e0e0e0; }\n  .savings-value { font-size: 28px; color: #7b61ff; font-weight: bold; margin: 10px 0; }\n  .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; }\n  .btn { display: inline-block; background: #7b61ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }\n</style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1>Relatório de Economia FlowCargo</h1>\n    </div>\n    <div class=\"content\">\n      <h2>Olá,</h2>\n      <p>Obrigado por usar nossa calculadora de ROI. Com base nos dados da sua operação, aqui está o potencial de economia que a FlowCargo pode gerar para sua empresa:</p>\n      \n      <div class=\"savings-box\">\n        <p>Economia Mensal Estimada</p>\n        <div class=\"savings-value\">R$ {{json.body.data.savings.monthly}}</div>\n        <p>Economia Anual Estimada</p>\n        <div class=\"savings-value\" style=\"color: #18d4d4;\">R$ {{json.body.data.savings.yearly}}</div>\n        <hr style=\"border: 0; border-top: 1px solid #ddd; margin: 15px 0;\">\n        <p><strong>{{json.body.data.savings.time}} horas</strong> ganhas por mês na operação</p>\n      </div>\n\n      <h3>Parâmetros da Simulação:</h3>\n      <ul>\n        <li><strong>Caminhões/dia:</strong> {{json.body.data.trucksPerDay}}</li>\n        <li><strong>Tempo de espera atual:</strong> {{json.body.data.waitTime}} min</li>\n        <li><strong>Custo hora parada:</strong> R$ {{json.body.data.hourlyCost}}</li>\n      </ul>\n\n      <div style=\"text-align: center;\">\n        <a href=\"https://flowcargo.com.br#contact\" class=\"btn\">Agendar Demonstração</a>\n      </div>\n    </div>\n    <div class=\"footer\">\n      <p>© 2025 FlowCargo. Todos os direitos reservados.</p>\n    </div>\n  </div>\n</body>\n</html>"
      },
      "name": "Generate HTML",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        480,
        300
      ]
    },
    {
      "parameters": {
        "operation": "pdf",
        "html": "={{json.html}}",
        "options": {}
      },
      "name": "HTML to PDF",
      "type": "n8n-nodes-base.htmlToPdf",
      "typeVersion": 1,
      "position": [
        700,
        300
      ]
    },
    {
      "parameters": {
        "fromEmail": "noreply@flowcargo.com.br",
        "toEmail": "={{$('Webhook').item.json.body.email}}",
        "subject": "Seu Relatório de ROI FlowCargo",
        "text": "Olá, segue em anexo o seu relatório de economia projetada.",
        "attachments": "data"
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 1,
      "position": [
        920,
        300
      ]
    }
]

# Preservar o node Webhook original
webhook_node = None
for node in workflow_data['nodes']:
    if node.get('type') == 'n8n-nodes-base.webhook' and node.get('parameters', {}).get('path') == 'roi-report':
        webhook_node = node
        break

if not webhook_node:
    print("ERROR: Original Webhook node not found in local JSON.")
    exit(1)

# Reconstruir a lista de nodes
updated_nodes = [webhook_node] + new_nodes

# Reconstruir as conexões
updated_connections = {
    "Webhook": {
        "main": [
            [
                {
                    "node": "Generate HTML",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    },
    "Generate HTML": {
        "main": [
            [
                {
                    "node": "HTML to PDF",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    },
    "HTML to PDF": {
        "main": [
            [
                {
                    "node": "Send Email",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    }
}

# Atualizar o objeto do workflow
workflow_data['nodes'] = updated_nodes
workflow_data['connections'] = updated_connections

# Enviar atualização para a API
try:
    response = requests.put(f"{base_url}/workflows/{workflow_id}", headers=headers, json=workflow_data)
    
    if response.status_code == 200:
        print("SUCCESS: Workflow updated successfully!")
        print(f"New revision ID: {response.json().get('id')}")
    else:
        print(f"FAILED to update workflow: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"EXCEPTION: {str(e)}")
