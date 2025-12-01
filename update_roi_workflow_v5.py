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

# Template HTML adaptado do usuário para o contexto da FlowCargo
# Substituindo variáveis do template original ($docPayload) pelas variáveis do n8n ({{json.body.data...}})
# Adaptando gráficos e textos para o contexto de ROI logístico
html_template = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #f4f4f9; }
    .bl-red { border-left: 4px solid #FF5382; }
    .bl-cyan { border-left: 4px solid #00C3C1; }
    .bl-purple { border-left: 4px solid #7b61ff; }
  </style>
</head>
<body class="p-8">
  <div class="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
    <div class="flex justify-between items-center mb-8 border-b pb-6">
      <div>
        <h1 class="font-bold text-4xl text-gray-900">Relatório de ROI</h1>
        <p class="text-gray-500 mt-2">Análise de eficiência logística FlowCargo</p>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold text-[#7b61ff]">FlowCargo</div>
        <p class="text-sm text-gray-400">{{$now.toFormat('dd/MM/yyyy')}}</p>
      </div>
    </div>

    <div class="flex mb-8 mx-auto w-full gap-4">
      <div class="w-1/3">
        <div class="bg-gray-50 p-4 shadow-sm rounded border border-gray-100">
          <p class="text-sm text-gray-500 uppercase font-semibold">Economia Mensal</p>
          <div class="items-center flex justify-between mt-2">
            <div class="bl-cyan ml-2 pl-3 text-2xl font-bold text-gray-800">R$ {{json.body.data.savings.monthly}}</div>
          </div>
          <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#00C3C1]" style="width: 75%"></div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="bg-gray-50 p-4 shadow-sm rounded border border-gray-100">
          <p class="text-sm text-gray-500 uppercase font-semibold">Economia Anual</p>
          <div class="items-center flex justify-between mt-2">
            <div class="bl-purple ml-2 pl-3 text-2xl font-bold text-gray-800">R$ {{json.body.data.savings.yearly}}</div>
          </div>
          <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#7b61ff]" style="width: 90%"></div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="bg-gray-50 p-4 shadow-sm rounded border border-gray-100">
          <p class="text-sm text-gray-500 uppercase font-semibold">Horas Ganhas/Mês</p>
          <div class="items-center flex justify-between mt-2">
            <div class="bl-red ml-2 pl-3 text-2xl font-bold text-gray-800">{{json.body.data.savings.time}}h</div>
          </div>
          <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#FF5382]" style="width: 60%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mb-8 mx-auto w-full gap-6">
      <div class="w-3/5">
        <div class="bg-white p-4 shadow-md rounded border border-gray-100">
          <p class="mb-4 font-semibold text-gray-700">Projeção de Economia Acumulada (6 Meses)</p>
          <div id="accumulatedSavings"></div>
        </div>
      </div>

      <div class="w-2/5">
        <div class="bg-white p-4 shadow-md rounded border border-gray-100 h-full">
          <p class="mb-4 font-semibold text-gray-700">Distribuição de Custos</p>
          <div id="costDistribution" class="flex justify-center"></div>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 text-white p-6 rounded-lg mt-8 text-center">
      <h3 class="text-xl font-bold mb-2">Pronto para realizar essa economia?</h3>
      <p class="mb-4 text-gray-300">Agende uma demonstração personalizada com nossos especialistas.</p>
      <a href="https://flowcargo.com.br" class="inline-block bg-[#00C3C1] text-gray-900 font-bold py-3 px-8 rounded hover:bg-[#00a09e] transition-colors">Agendar Demo</a>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script>
    // Dados dinâmicos injetados pelo n8n (simulados aqui para o template)
    const monthlySavings = parseFloat("{{json.body.data.savings.monthly}}".replace('.', '').replace(',', '.'));
    
    // Gráfico de Barras - Economia Acumulada
    new ApexCharts(document.querySelector("#accumulatedSavings"), {
      chart: { type: 'bar', height: 250, toolbar: { show: false } },
      colors: ['#7b61ff'],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
      dataLabels: { enabled: false },
      series: [{ name: 'Economia Acumulada', data: [monthlySavings, monthlySavings*2, monthlySavings*3, monthlySavings*4, monthlySavings*5, monthlySavings*6] }],
      xaxis: { categories: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'] },
      yaxis: { labels: { formatter: (val) => 'R$ ' + (val/1000).toFixed(0) + 'k' } }
    }).render();

    // Gráfico de Pizza - Distribuição (Simulado)
    new ApexCharts(document.querySelector("#costDistribution"), {
      chart: { type: 'donut', width: 300 },
      colors: ['#FF5382', '#00C3C1', '#7b61ff'],
      series: [45, 30, 25],
      labels: ['Tempo Parado', 'Combustível', 'Manutenção'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: false }
    }).render();
  </script>
</body>
</html>
"""

# Definir os novos nodes para adicionar (HTML + HTTP Request para PDF + Email)
new_nodes = [
    {
      "parameters": {
        "html": html_template
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
        "url": "https://api.pdfmonkey.io/api/v1/documents",
        "method": "POST",
        "authentication": "headerAuth",
        "headerAuth": "pdfmonkey_api_key",
        "jsonParameters": True,
        "options": {},
        "bodyParametersJson": "{\n  \"document\": {\n    \"document_template_id\": \"YOUR_TEMPLATE_ID\",\n    \"payload\": {\n      \"html\": \"{{json.html}}\"\n    },\n    \"status\": \"pending\"\n  }\n}"
      },
      "name": "Generate PDF (API)",
      "type": "n8n-nodes-base.httpRequest",
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
                    "node": "Generate PDF (API)",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    },
    "Generate PDF (API)": {
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

# Preparar payload limpo para update (remover campos read-only)
update_payload = {
    "name": workflow_data['name'],
    "nodes": updated_nodes,
    "connections": updated_connections,
    "settings": workflow_data.get('settings', {}),
    "staticData": workflow_data.get('staticData', None)
    # "tags" removido
}

# Enviar atualização para a API
try:
    response = requests.put(f"{base_url}/workflows/{workflow_id}", headers=headers, json=update_payload)
    
    if response.status_code == 200:
        print("SUCCESS: Workflow updated successfully!")
        print(f"New revision ID: {response.json().get('id')}")
    else:
        print(f"FAILED to update workflow: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"EXCEPTION: {str(e)}")
