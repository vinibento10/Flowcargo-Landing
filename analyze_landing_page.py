import os
import requests
import json

# Ler o conteúdo do arquivo Home.tsx
file_path = '/home/ubuntu/flowcargo-landing/client/src/pages/Home.tsx'
try:
    with open(file_path, 'r') as f:
        code_content = f.read()
except FileNotFoundError:
    print(f"Erro: Arquivo não encontrado em {file_path}")
    exit(1)

# Configurar a requisição para o OpenRouter
api_key = os.environ.get('OPENROUTER_API_KEY')
if not api_key:
    print("Erro: Variável de ambiente OPENROUTER_API_KEY não definida.")
    exit(1)

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://manus.im", # Required by OpenRouter
    "X-Title": "Manus AI" # Optional
}

system_prompt = """
Você é um especialista sênior em UX/UI e Copywriting para produtos SaaS B2B. 
Sua tarefa é analisar o código de uma landing page e sugerir melhorias específicas para aumentar a conversão e a percepção de valor. 
Foque em: 
1. Clareza e impacto do Copy (títulos, benefícios, CTAs). 
2. Refinamento visual e de UX (espaçamento, hierarquia, micro-interações). 
3. Gatilhos mentais (prova social, autoridade, escassez). 
Seja direto e forneça exemplos de código ou texto melhorado.
"""

user_prompt = f"""
Analise o seguinte código React (Home.tsx) da landing page da FlowCargo (SaaS de logística). 
O objetivo é transmitir modernidade, eficiência e autoridade. 
O design atual é Dark Mode com cores roxo (#7b61ff) e ciano (#18d4d4). 

Sugira 3 melhorias de alto impacto para o Copy e 3 para o Design/UX.

Código:
{code_content}
"""

data = {
    "model": "anthropic/claude-3.5-sonnet",
    "messages": [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
}

try:
    response = requests.post(url, headers=headers, data=json.dumps(data))
    response.raise_for_status()
    result = response.json()
    print(result['choices'][0]['message']['content'])
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição API: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"Detalhes do erro: {e.response.text}")
