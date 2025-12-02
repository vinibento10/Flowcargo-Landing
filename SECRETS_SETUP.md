# ⚡ Quick Setup - GitHub Secrets

Guia rápido para configurar todos os secrets necessários no GitHub.

## 🚀 Passo 1: Acessar GitHub Secrets

1. Vá para: https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions
2. Clique em **"New repository secret"**

## 📝 Secrets a Adicionar

### 1️⃣ VITE_N8N_WEBHOOK_URL
```
Nome: VITE_N8N_WEBHOOK_URL
Valor: https://n8n.mindlinklab.com.br/webhook/roi-report
```

### 2️⃣ VITE_PDFMONKEY_API_KEY
```
Nome: VITE_PDFMONKEY_API_KEY
Valor: [Obter em https://www.pdfmonkey.io/settings/api_keys]
```

### 3️⃣ VERCEL_TOKEN
```
Nome: VERCEL_TOKEN
Valor: [Obter em https://vercel.com/account/tokens]
```

### 4️⃣ VERCEL_ORG_ID
```
Nome: VERCEL_ORG_ID
Valor: [Obter em https://vercel.com/account/settings]
```

### 5️⃣ VERCEL_PROJECT_ID
```
Nome: VERCEL_PROJECT_ID
Valor: [Obter no painel do projeto Vercel]
```

### 6️⃣ SLACK_WEBHOOK_URL (Opcional)
```
Nome: SLACK_WEBHOOK_URL
Valor: [Obter em https://api.slack.com/apps]
```

## ✅ Checklist

- [ ] VITE_N8N_WEBHOOK_URL adicionado
- [ ] VITE_PDFMONKEY_API_KEY adicionado
- [ ] VERCEL_TOKEN adicionado
- [ ] VERCEL_ORG_ID adicionado
- [ ] VERCEL_PROJECT_ID adicionado
- [ ] SLACK_WEBHOOK_URL adicionado (opcional)

## 🧪 Testar Configuração

Após adicionar todos os secrets:

```bash
# Fazer um commit vazio para disparar CI
git commit --allow-empty -m "test: trigger CI/CD"
git push origin main

# Acompanhar em: https://github.com/vinibento10/Flowcargo-Landing/actions
```

## 📖 Documentação Completa

Para mais detalhes, consulte: [docs/GITHUB_SECRETS.md](./docs/GITHUB_SECRETS.md)
