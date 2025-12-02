# 🔐 GitHub Actions Workflow - Verify Secrets

Documentação completa do workflow automático que verifica secrets antes de cada deploy.

## 📋 Visão Geral

O workflow `.github/workflows/verify_secrets.yml` executa automaticamente:

1. **Verificação de Secrets** - Valida se todos os 5 secrets obrigatórios estão configurados
2. **Relatório** - Gera relatório JSON detalhado
3. **Comentário em PR** - Adiciona comentário automático em pull requests
4. **Bloqueio de Deploy** - Impede deploy se secrets estão faltando
5. **Notificações** - Envia alertas via Slack em caso de falha

## 🚀 Quando o Workflow Executa

O workflow é acionado em 4 situações:

### 1. **Push para main ou develop**
```bash
git push origin main
# → Workflow executa automaticamente
```

### 2. **Pull Request para main ou develop**
```bash
git push origin feature/nova-feature
# → Cria PR
# → Workflow executa
# → Adiciona comentário com resultado
```

### 3. **Agendado Diariamente**
```
Todos os dias às 08:00 UTC
# Valida que secrets continuam configurados
```

### 4. **Execução Manual**
```
GitHub Actions → Verify Secrets → Run workflow
# Permite testar manualmente
```

## 📊 Estrutura do Workflow

```
verify_secrets.yml
├── verify_secrets (Job Principal)
│   ├── Checkout code
│   ├── Setup Python
│   ├── Install dependencies
│   ├── Verify GitHub Secrets
│   ├── Upload report
│   ├── Check result
│   ├── Comment PR (se PR)
│   ├── Fail if incomplete (se main)
│   └── Slack notification (se falha)
│
├── pre_deploy_check (Job Pré-Deploy)
│   ├── Download report
│   ├── Verify secrets
│   └── Notify readiness
│
└── summary (Job Resumo)
    ├── Download report
    └── Generate summary
```

## 🔍 O que é Verificado

### ✅ Secrets Obrigatórios (5)

| Secret | Descrição | Bloqueador |
|--------|-----------|-----------|
| `VITE_N8N_WEBHOOK_URL` | Webhook n8n | ✅ Sim |
| `VITE_PDFMONKEY_API_KEY` | API PDFMonkey | ✅ Sim |
| `VERCEL_TOKEN` | Token Vercel | ✅ Sim |
| `VERCEL_ORG_ID` | Org ID Vercel | ✅ Sim |
| `VERCEL_PROJECT_ID` | Project ID Vercel | ✅ Sim |

### ⚪ Secrets Opcionais (3)

| Secret | Descrição |
|--------|-----------|
| `SLACK_WEBHOOK_URL` | Notificações Slack |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics ID |

## 📤 Saídas do Workflow

### 1. **Relatório JSON**

Arquivo: `reports/secrets_verification_YYYYMMDD_HHMMSS.json`

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

### 2. **Comentário em PR**

Adicionado automaticamente em pull requests:

```markdown
## 🔐 GitHub Secrets Verification

✅ **Status: COMPLETO**

### Required Secrets: 5/5
✅ Todos os secrets obrigatórios foram configurados!

### Optional Secrets: 1/3
```

### 3. **Notificação Slack** (se configurado)

Enviada quando há falha:

```
⚠️ GitHub Secrets Verification Failed

Alguns secrets obrigatórios estão faltando ou inválidos.

Repository: vinibento10/Flowcargo-Landing
Branch: main

[Configure Secrets] [View Workflow]
```

### 4. **Resumo no GitHub Actions**

Exibido na aba "Summary" do workflow:

```
📊 Secrets Verification Summary

### Required Secrets

Status: 5/5

✅ VITE_N8N_WEBHOOK_URL
✅ VITE_PDFMONKEY_API_KEY
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID

### Optional Secrets

Status: 1/3

✅ SLACK_WEBHOOK_URL
⚪ VITE_ANALYTICS_ENDPOINT
⚪ VITE_ANALYTICS_WEBSITE_ID
```

## 🚫 Bloqueadores de Deploy

O workflow **bloqueia o deploy** em `main` se:

1. ❌ Algum secret obrigatório está faltando
2. ❌ Relatório de verificação não foi gerado
3. ❌ Erro na execução do script

**Resultado:** Deploy é impedido até que todos os secrets sejam configurados.

## 📋 Jobs do Workflow

### Job 1: `verify_secrets` (Principal)

**Responsabilidades:**
- Executar script de verificação
- Gerar relatório
- Adicionar comentário em PR
- Bloquear deploy se necessário
- Enviar notificação Slack

**Tempo de execução:** ~30 segundos

### Job 2: `pre_deploy_check` (Pré-Deploy)

**Responsabilidades:**
- Verificar relatório antes do deploy
- Validar que todos os secrets estão presentes
- Notificar se sistema está pronto

**Tempo de execução:** ~10 segundos

**Dependência:** Requer sucesso do Job 1

### Job 3: `summary` (Resumo)

**Responsabilidades:**
- Gerar resumo visual
- Exibir na aba "Summary"
- Documentar resultado

**Tempo de execução:** ~5 segundos

## 🔄 Fluxo de Execução

```
┌─ Push para main/develop
│  └─ Workflow iniciado
│     ├─ verify_secrets
│     │  ├─ Checkout
│     │  ├─ Setup Python
│     │  ├─ Verify Secrets ✅/❌
│     │  ├─ Upload Report
│     │  ├─ Comment PR (se PR)
│     │  ├─ Fail if incomplete (se main)
│     │  └─ Slack notification
│     │
│     ├─ pre_deploy_check (após verify_secrets)
│     │  ├─ Download Report
│     │  └─ Verify for Deploy
│     │
│     └─ summary (paralelo)
│        └─ Generate Summary
│
└─ Resultado
   ├─ ✅ Sucesso → Deploy pode prosseguir
   └─ ❌ Falha → Deploy bloqueado
```

## 🔐 Segurança

### Proteções Implementadas

- ✅ Script **nunca exibe** valores dos secrets
- ✅ Token do GitHub é **mascarado** nos logs
- ✅ Relatórios são **armazenados** apenas 30 dias
- ✅ Notificações **não incluem** valores sensíveis
- ✅ Deploy é **bloqueado** se secrets faltam

### Variáveis Disponíveis

```yaml
${{ secrets.GITHUB_TOKEN }}           # Token automático do GitHub
${{ github.repository_owner }}        # Proprietário do repo
${{ github.event.repository.name }}   # Nome do repositório
${{ github.ref }}                     # Branch atual
${{ github.event_name }}              # Tipo de evento
```

## 📝 Logs e Debugging

### Acessar Logs

1. Vá para: **Actions** → **Verify Secrets**
2. Selecione o run desejado
3. Clique em **verify_secrets** job
4. Veja os logs de cada step

### Logs Importantes

```bash
# Verificação de secrets
"✅ Token válido - Usuário: vinibento10"
"✅ VITE_N8N_WEBHOOK_URL"
"❌ VITE_PDFMONKEY_API_KEY"

# Resultado
"📊 RELATÓRIO FINAL"
"✅ Status Geral: COMPLETO"
```

### Troubleshooting

**Erro: "Token inválido"**
```
Solução: Verificar se GITHUB_TOKEN está disponível
GitHub Actions fornece automaticamente
```

**Erro: "Repositório não encontrado"**
```
Solução: Verificar nome do repositório
Use: github.event.repository.name
```

**Erro: "Permissão negada"**
```
Solução: Verificar permissões do workflow
Settings → Actions → General → Workflow permissions
```

## 🧪 Testar Workflow Manualmente

### Opção 1: Via GitHub UI

1. Vá para: **Actions** → **Verify Secrets**
2. Clique em **Run workflow**
3. Selecione branch: **main**
4. Clique em **Run workflow**

### Opção 2: Via CLI

```bash
# Requer GitHub CLI
gh workflow run verify_secrets.yml --ref main
```

### Opção 3: Forçar Execução

```bash
# Fazer commit vazio
git commit --allow-empty -m "test: trigger verify secrets"
git push origin main
```

## 📊 Métricas e Monitoramento

### Dashboard

Visualizar histórico em: **Actions** → **Verify Secrets**

Métricas disponíveis:
- ✅ Runs bem-sucedidos
- ❌ Runs falhados
- ⏱️ Tempo de execução
- 📊 Taxa de sucesso

### Alertas

Configurar notificações em: **Settings** → **Notifications**

## 🔄 Integração com Outros Workflows

O workflow `verify_secrets.yml` é executado **antes** de:

- ✅ `ci.yml` (Build & Test)
- ✅ `deploy.yml` (Deploy Vercel)
- ✅ `lighthouse.yml` (Performance)

**Ordem de Execução:**
```
verify_secrets.yml
    ↓
ci.yml (se secrets OK)
    ↓
deploy.yml (se CI OK)
```

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets API](https://docs.github.com/en/rest/actions/secrets)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## 📞 Suporte

Para dúvidas:

1. Consultar logs: **Actions** → **Verify Secrets**
2. Ler documentação: `docs/VERIFY_SECRETS.md`
3. Contatar: viniciusalves@mindlinklab.com.br

## 🎯 Checklist de Configuração

- [ ] Workflow criado em `.github/workflows/verify_secrets.yml`
- [ ] Todos os 5 secrets adicionados no GitHub
- [ ] Script `verify_github_secrets.py` presente em `scripts/`
- [ ] Dependências instaladas: `pip install -r scripts/requirements.txt`
- [ ] Slack webhook configurado (opcional)
- [ ] Primeiro run executado com sucesso
- [ ] Comentário em PR aparecendo corretamente
- [ ] Deploy bloqueado se secrets faltam

---

**Última atualização:** Dezembro 2025
