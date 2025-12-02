# GitHub Secrets Configuration

Este documento descreve todos os secrets necessários para configurar o CI/CD da FlowCargo Landing Page.

## 📋 Secrets Obrigatórios

### 1. **VITE_N8N_WEBHOOK_URL**
- **Descrição**: URL do webhook do n8n para receber dados da calculadora de ROI
- **Valor**: `https://n8n.mindlinklab.com.br/webhook/roi-report`
- **Tipo**: URL
- **Usado em**: Build, Deploy

### 2. **VITE_PDFMONKEY_API_KEY**
- **Descrição**: Chave de API do PDFMonkey para geração de PDFs
- **Obtenção**: 
  1. Acesse https://www.pdfmonkey.io
  2. Faça login ou crie uma conta
  3. Vá para Settings → API Keys
  4. Copie sua API Key
- **Tipo**: Chave secreta
- **Usado em**: Build, Deploy

### 3. **VERCEL_TOKEN**
- **Descrição**: Token de autenticação do Vercel para deploy automático
- **Obtenção**:
  1. Acesse https://vercel.com/account/tokens
  2. Clique em "Create Token"
  3. Nomeie como "GitHub Actions"
  4. Copie o token
- **Tipo**: Token de autenticação
- **Usado em**: Deploy

### 4. **VERCEL_ORG_ID**
- **Descrição**: ID da organização no Vercel
- **Obtenção**:
  1. Acesse https://vercel.com/account/settings
  2. Procure por "Team ID" ou "Org ID"
  3. Copie o valor
- **Tipo**: ID
- **Usado em**: Deploy

### 5. **VERCEL_PROJECT_ID**
- **Descrição**: ID do projeto no Vercel
- **Obtenção**:
  1. Acesse seu projeto no Vercel
  2. Vá para Settings → General
  3. Procure por "Project ID"
  4. Copie o valor
- **Tipo**: ID
- **Usado em**: Deploy

## 📋 Secrets Opcionais

### 6. **VITE_ANALYTICS_ENDPOINT**
- **Descrição**: Endpoint de analytics (ex: Plausible, Posthog)
- **Tipo**: URL
- **Padrão**: Deixar vazio se não usar

### 7. **VITE_ANALYTICS_WEBSITE_ID**
- **Descrição**: ID do website no serviço de analytics
- **Tipo**: String
- **Padrão**: Deixar vazio se não usar

### 8. **SLACK_WEBHOOK_URL**
- **Descrição**: Webhook do Slack para notificações de deploy
- **Obtenção**:
  1. Acesse https://api.slack.com/apps
  2. Crie um novo app ou selecione existente
  3. Vá para "Incoming Webhooks"
  4. Clique em "Add New Webhook to Workspace"
  5. Selecione o canal desejado
  6. Copie a URL
- **Tipo**: URL
- **Padrão**: Deixar vazio se não usar notificações

## 🔧 Como Adicionar Secrets no GitHub

### Via Interface Web

1. Acesse seu repositório no GitHub
2. Vá para **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Preencha:
   - **Name**: Nome exato do secret (ex: `VITE_N8N_WEBHOOK_URL`)
   - **Secret**: Valor do secret
5. Clique em **Add secret**

### Via GitHub CLI

```bash
# Instalar GitHub CLI (se não tiver)
# https://cli.github.com

# Fazer login
gh auth login

# Adicionar secret
gh secret set VITE_N8N_WEBHOOK_URL --body "https://n8n.mindlinklab.com.br/webhook/roi-report"
gh secret set VITE_PDFMONKEY_API_KEY --body "sua_chave_aqui"
gh secret set VERCEL_TOKEN --body "seu_token_aqui"
gh secret set VERCEL_ORG_ID --body "seu_org_id_aqui"
gh secret set VERCEL_PROJECT_ID --body "seu_project_id_aqui"
```

## 🔒 Segurança

- ✅ Secrets são criptografados e não aparecem em logs
- ✅ Secrets não são expostos em pull requests
- ✅ Cada secret pode ser rotacionado independentemente
- ✅ Use secrets diferentes para dev, staging e production

## 📊 Workflows que Usam Secrets

| Workflow | Secrets Usados |
|----------|----------------|
| **CI** | VITE_N8N_WEBHOOK_URL, VITE_PDFMONKEY_API_KEY |
| **Deploy** | VITE_N8N_WEBHOOK_URL, VITE_PDFMONKEY_API_KEY, VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, SLACK_WEBHOOK_URL |
| **Lighthouse** | VITE_N8N_WEBHOOK_URL, VITE_PDFMONKEY_API_KEY |

## ✅ Checklist de Configuração

- [ ] Criar conta no Vercel e projeto
- [ ] Gerar Vercel Token
- [ ] Obter Vercel Org ID
- [ ] Obter Vercel Project ID
- [ ] Criar conta no PDFMonkey
- [ ] Obter PDFMonkey API Key
- [ ] Adicionar todos os secrets no GitHub
- [ ] Testar CI/CD com um push
- [ ] Verificar deploy no Vercel
- [ ] (Opcional) Configurar notificações do Slack

## 🧪 Testando a Configuração

```bash
# Fazer um commit vazio para disparar workflows
git commit --allow-empty -m "test: trigger workflows"
git push origin main

# Acompanhar na aba "Actions" do repositório
```

## 🆘 Troubleshooting

### Erro: "Secret not found"
- Verifique se o nome do secret está correto (case-sensitive)
- Confirme que o secret foi adicionado na branch correta

### Erro: "Invalid token"
- Regenere o token no serviço correspondente
- Atualize o secret no GitHub

### Deploy falha silenciosamente
- Verifique os logs no GitHub Actions
- Confirme que todos os secrets obrigatórios estão configurados
- Teste localmente: `pnpm run build`

## 📚 Referências

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [PDFMonkey API Documentation](https://www.pdfmonkey.io/docs)
- [n8n Webhooks](https://docs.n8n.io/workflows/triggers/webhook/)
