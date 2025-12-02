# 🛠️ Scripts de Automação - FlowCargo Landing

Utilitários para automação e verificação do projeto.

## 📋 Scripts Disponíveis

### 1. `verify_secrets.sh` ⭐ Recomendado

Script Bash para verificar se todos os 5 secrets obrigatórios foram adicionados ao GitHub.

**Uso:**
```bash
# Com token como argumento
./scripts/verify_secrets.sh ghp_xxxxx

# Com variável de ambiente
export GITHUB_TOKEN=ghp_xxxxx
./scripts/verify_secrets.sh
```

**Saída:**
- ✅ Relatório detalhado dos secrets
- 💾 Arquivo JSON com histórico
- 📖 Instruções para secrets faltantes

### 2. `verify_github_secrets.py`

Script Python avançado com mais opções.

**Uso:**
```bash
# Básico
python3 scripts/verify_github_secrets.py --token ghp_xxxxx

# Com variáveis de ambiente
export GITHUB_TOKEN=ghp_xxxxx
python3 scripts/verify_github_secrets.py

# Repositório customizado
python3 scripts/verify_github_secrets.py \
  --token ghp_xxxxx \
  --owner seu_usuario \
  --repo seu_repositorio
```

**Opções:**
- `--token`: GitHub Personal Access Token
- `--owner`: Proprietário do repositório (padrão: vinibento10)
- `--repo`: Nome do repositório (padrão: Flowcargo-Landing)

## 🔑 Obter GitHub Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   - **Note**: `FlowCargo Verification`
   - **Expiration**: 7 days
   - **Scopes**: `repo`
4. Copie o token

## 📊 Secrets Verificados

### Obrigatórios (5)
- ✅ `VITE_N8N_WEBHOOK_URL`
- ✅ `VITE_PDFMONKEY_API_KEY`
- ✅ `VERCEL_TOKEN`
- ✅ `VERCEL_ORG_ID`
- ✅ `VERCEL_PROJECT_ID`

### Opcionais (3)
- ⚪ `SLACK_WEBHOOK_URL`
- ⚪ `VITE_ANALYTICS_ENDPOINT`
- ⚪ `VITE_ANALYTICS_WEBSITE_ID`

## 🚀 Workflow Recomendado

```bash
# 1. Instalar dependências (primeira vez)
pip3 install -r scripts/requirements.txt

# 2. Adicionar secrets no GitHub
# → https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions

# 3. Verificar configuração
export GITHUB_TOKEN=ghp_xxxxx
./scripts/verify_secrets.sh

# 4. Se tudo OK, disparar CI/CD
git commit --allow-empty -m "test: trigger CI/CD"
git push origin main

# 5. Acompanhar workflows
# → https://github.com/vinibento10/Flowcargo-Landing/actions
```

## 📁 Estrutura

```
scripts/
├── README.md                      # Este arquivo
├── requirements.txt               # Dependências Python
├── verify_secrets.sh              # Script Bash (recomendado)
└── verify_github_secrets.py       # Script Python avançado
```

## 📚 Documentação Completa

Para mais detalhes, consulte: [docs/VERIFY_SECRETS.md](../docs/VERIFY_SECRETS.md)

## 🆘 Troubleshooting

### "Token inválido"
- Regenerar em: https://github.com/settings/tokens
- Verificar se tem escopo `repo`

### "Repositório não encontrado"
- Verificar URL do repositório
- Confirmar que o token tem permissão

### "Permissão negada"
- Adicionar escopo `repo` ao token
- Regenerar token

## 📞 Suporte

Dúvidas? Consulte:
- [docs/GITHUB_SECRETS.md](../docs/GITHUB_SECRETS.md)
- [docs/CI_CD.md](../docs/CI_CD.md)
- Email: viniciusalves@mindlinklab.com.br
