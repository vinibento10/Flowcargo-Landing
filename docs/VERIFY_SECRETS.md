# 🔐 Verificar GitHub Secrets

Script automático para validar se todos os 5 secrets obrigatórios foram adicionados corretamente ao repositório.

## 📋 Requisitos

- Python 3.7+
- Biblioteca `requests` (instalada automaticamente)
- GitHub Personal Access Token com permissão de `repo`

## 🚀 Uso Rápido

### Opção 1: Com Bash (Recomendado)

```bash
# Com token como argumento
./scripts/verify_secrets.sh ghp_xxxxx

# Com variável de ambiente
export GITHUB_TOKEN=ghp_xxxxx
./scripts/verify_secrets.sh
```

### Opção 2: Com Python Direto

```bash
# Com token como argumento
python3 scripts/verify_github_secrets.py --token ghp_xxxxx

# Com variável de ambiente
export GITHUB_TOKEN=ghp_xxxxx
python3 scripts/verify_github_secrets.py
```

## 🔑 Obter GitHub Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Preencha:
   - **Note**: `FlowCargo Secrets Verification`
   - **Expiration**: 7 days (ou sua preferência)
   - **Scopes**: Selecione apenas `repo`
4. Clique em **"Generate token"**
5. **Copie o token** (aparece apenas uma vez)

## 📊 Saída do Script

O script gera um relatório completo com:

### ✅ Verificação de Secrets Obrigatórios

```
📋 Verificando Secrets Obrigatórios:
============================================================
✅ VITE_N8N_WEBHOOK_URL
   └─ Webhook URL do n8n para ROI reports
❌ VITE_PDFMONKEY_API_KEY
   └─ API Key do PDFMonkey
   └─ Exemplo: sk_live_xxxxx
✅ VERCEL_TOKEN
   └─ Token de autenticação do Vercel
✅ VERCEL_ORG_ID
   └─ ID da organização no Vercel
✅ VERCEL_PROJECT_ID
   └─ ID do projeto no Vercel
```

### 📊 Relatório Final

```
📊 RELATÓRIO FINAL
============================================================

✅ Status Geral: COMPLETO

📌 Secrets Obrigatórios: 5/5
   ✅ Todos os secrets obrigatórios foram configurados!

📌 Secrets Opcionais: 1/3
   ⚪ 1 de 3 configurados
```

### 💾 Arquivo de Relatório

Um arquivo JSON é salvo em `reports/secrets_verification_YYYYMMDD_HHMMSS.json`:

```json
{
  "timestamp": "2025-12-01T21:30:00",
  "repository": "vinibento10/Flowcargo-Landing",
  "summary": {
    "required": {
      "found": 5,
      "total": 5,
      "complete": true
    },
    "optional": {
      "found": 1,
      "total": 3
    }
  },
  "details": {
    "required": {
      "VITE_N8N_WEBHOOK_URL": "✅ Encontrado",
      "VITE_PDFMONKEY_API_KEY": "✅ Encontrado",
      "VERCEL_TOKEN": "✅ Encontrado",
      "VERCEL_ORG_ID": "✅ Encontrado",
      "VERCEL_PROJECT_ID": "✅ Encontrado"
    },
    "optional": {
      "SLACK_WEBHOOK_URL": "✅ Encontrado",
      "VITE_ANALYTICS_ENDPOINT": "⚪ Não configurado",
      "VITE_ANALYTICS_WEBSITE_ID": "⚪ Não configurado"
    },
    "errors": []
  }
}
```

## 🔍 Secrets Verificados

### Obrigatórios (5)

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `VITE_N8N_WEBHOOK_URL` | Webhook do n8n | `https://n8n.mindlinklab.com.br/webhook/roi-report` |
| `VITE_PDFMONKEY_API_KEY` | API Key do PDFMonkey | `sk_live_xxxxx` |
| `VERCEL_TOKEN` | Token Vercel | `vercel_xxxxx` |
| `VERCEL_ORG_ID` | ID Org Vercel | `team_xxxxx` |
| `VERCEL_PROJECT_ID` | ID Project Vercel | `prj_xxxxx` |

### Opcionais (3)

| Secret | Descrição |
|--------|-----------|
| `SLACK_WEBHOOK_URL` | Webhook do Slack |
| `VITE_ANALYTICS_ENDPOINT` | Endpoint de analytics |
| `VITE_ANALYTICS_WEBSITE_ID` | ID do website analytics |

## 🔄 Workflow Completo

```bash
# 1. Gerar token no GitHub
# → https://github.com/settings/tokens

# 2. Adicionar secrets no repositório
# → https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions

# 3. Executar verificação
export GITHUB_TOKEN=ghp_xxxxx
./scripts/verify_secrets.sh

# 4. Se tudo OK, disparar CI/CD
git commit --allow-empty -m "test: trigger CI/CD"
git push origin main

# 5. Acompanhar workflows
# → https://github.com/vinibento10/Flowcargo-Landing/actions
```

## ⚙️ Opções Avançadas

### Verificar repositório diferente

```bash
python3 scripts/verify_github_secrets.py \
  --token ghp_xxxxx \
  --owner seu_usuario \
  --repo seu_repositorio
```

### Usar variáveis de ambiente

```bash
export GITHUB_TOKEN=ghp_xxxxx
export GITHUB_OWNER=vinibento10
export GITHUB_REPO=Flowcargo-Landing

python3 scripts/verify_github_secrets.py
```

## 🆘 Troubleshooting

### Erro: "Token inválido"

```
❌ Token inválido: 401
```

**Solução**: Regenerar token em https://github.com/settings/tokens

### Erro: "Repositório não encontrado"

```
❌ Erro ao obter secrets: 404
```

**Solução**: Verificar se o repositório existe e o token tem permissão

### Erro: "Permissão negada"

```
❌ Erro ao obter secrets: 403
```

**Solução**: Adicionar escopo `repo` ao token

### Erro: "Conexão recusada"

```
❌ Exceção ao obter secrets: Connection refused
```

**Solução**: Verificar conexão com internet

## 📝 Exemplos de Uso

### Exemplo 1: Verificação Simples

```bash
$ export GITHUB_TOKEN=ghp_xxxxx
$ ./scripts/verify_secrets.sh

🔍 Iniciando verificação de GitHub Secrets...
============================================================
✅ Token válido - Usuário: vinibento10

📋 Verificando Secrets Obrigatórios:
============================================================
✅ VITE_N8N_WEBHOOK_URL
   └─ Webhook URL do n8n para ROI reports
✅ VITE_PDFMONKEY_API_KEY
   └─ API Key do PDFMonkey
✅ VERCEL_TOKEN
   └─ Token de autenticação do Vercel
✅ VERCEL_ORG_ID
   └─ ID da organização no Vercel
✅ VERCEL_PROJECT_ID
   └─ ID do projeto no Vercel

📊 RELATÓRIO FINAL
============================================================

✅ Status Geral: COMPLETO

📌 Secrets Obrigatórios: 5/5
   ✅ Todos os secrets obrigatórios foram configurados!

💾 Relatório salvo em: reports/secrets_verification_20251201_213000.json

✅ Todos os secrets obrigatórios estão configurados!
```

### Exemplo 2: Secrets Faltando

```bash
$ ./scripts/verify_secrets.sh ghp_xxxxx

❌ VITE_PDFMONKEY_API_KEY
   └─ API Key do PDFMonkey
   └─ Exemplo: sk_live_xxxxx

📊 RELATÓRIO FINAL
============================================================

❌ Status Geral: INCOMPLETO

📌 Secrets Obrigatórios: 4/5
   ❌ Faltam 1 secret(s) obrigatório(s)

📖 PRÓXIMOS PASSOS
============================================================

1. Acesse: https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions
2. Clique em 'New repository secret'
3. Adicione os secrets faltantes:

   • VITE_PDFMONKEY_API_KEY
     Descrição: API Key do PDFMonkey
     Exemplo: sk_live_xxxxx
```

## 🔐 Segurança

- ✅ O script **nunca exibe** os valores dos secrets
- ✅ Token é usado apenas para consultar a API do GitHub
- ✅ Relatórios são salvos localmente (não enviados)
- ✅ Use um token com escopo mínimo (`repo`)

## 📚 Referências

- [GitHub Secrets API](https://docs.github.com/en/rest/actions/secrets)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📞 Suporte

Para problemas com o script:

1. Verificar logs: `cat reports/secrets_verification_*.json`
2. Testar token: `curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user`
3. Contatar: viniciusalves@mindlinklab.com.br
