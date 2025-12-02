# 📖 Guia Passo a Passo - Verificação de Secrets e CI/CD

Instruções detalhadas para executar o script de verificação e disparar o CI/CD.

---

## 🔐 PARTE 1: Executar o Script de Verificação

### O que é?
Um script Python que verifica se todos os 5 secrets obrigatórios foram adicionados corretamente ao GitHub.

### Pré-requisitos
1. ✅ Todos os 5 secrets já adicionados no GitHub
2. ✅ GitHub Personal Access Token (PAT) gerado
3. ✅ Terminal/Command Prompt aberto
4. ✅ Repositório clonado localmente

---

### 📋 Passo 1: Gerar GitHub Personal Access Token

Se você ainda não tem um token:

**1.1** Acesse: https://github.com/settings/tokens

**1.2** Clique em **"Generate new token"** → **"Generate new token (classic)"**

**1.3** Preencha os campos:
```
Note: FlowCargo Secrets Verification
Expiration: 7 days (ou sua preferência)
Scopes: ✅ repo (selecione apenas este)
```

**1.4** Clique em **"Generate token"**

**1.5** ⚠️ **COPIE O TOKEN** (aparece apenas uma vez!)
```
Exemplo: ghp_1234567890abcdefghijklmnopqrstuvwxyz
```

---

### 📋 Passo 2: Abrir Terminal/Command Prompt

#### No Windows:
1. Pressione `Win + R`
2. Digite `cmd` e pressione Enter
3. Ou abra PowerShell

#### No macOS:
1. Pressione `Cmd + Space`
2. Digite `terminal` e pressione Enter

#### No Linux:
1. Pressione `Ctrl + Alt + T`

---

### 📋 Passo 3: Navegar até o Repositório

No terminal, digite:

```bash
cd /caminho/para/flowcargo-landing
```

**Exemplo:**
```bash
# Windows
cd C:\Users\seu_usuario\Documents\flowcargo-landing

# macOS
cd ~/Documents/flowcargo-landing

# Linux
cd ~/flowcargo-landing
```

**Verificar se está no lugar certo:**
```bash
# Digite este comando
ls -la

# Você deve ver:
# .github/
# client/
# scripts/
# docs/
# README.md
# etc.
```

---

### 📋 Passo 4: Executar o Script de Verificação

#### Opção A: Usando Bash (Recomendado - Mais Simples)

```bash
./scripts/verify_secrets.sh ghp_1234567890abcdefghijklmnopqrstuvwxyz
```

**Substituir:** `ghp_1234567890abcdefghijklmnopqrstuvwxyz` pelo seu token real

**Exemplo completo:**
```bash
./scripts/verify_secrets.sh ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Opção B: Usando Variável de Ambiente (Mais Seguro)

```bash
# Passo 1: Definir a variável
export GITHUB_TOKEN=ghp_1234567890abcdefghijklmnopqrstuvwxyz

# Passo 2: Executar o script
./scripts/verify_secrets.sh
```

#### Opção C: Usando Python Direto

```bash
python3 scripts/verify_github_secrets.py --token ghp_1234567890abcdefghijklmnopqrstuvwxyz
```

---

### 📋 Passo 5: Interpretar a Saída

Após executar, você verá algo assim:

#### ✅ Se TODOS os secrets estão configurados:

```
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

**O que significa:**
- ✅ Todos os 5 secrets foram encontrados
- ✅ Você está pronto para deploy
- ✅ Um arquivo JSON foi salvo com o relatório

#### ❌ Se ALGUNS secrets estão faltando:

```
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

**O que significa:**
- ❌ Faltam 1 ou mais secrets
- ❌ Você precisa adicioná-los no GitHub
- ℹ️ O script mostra qual está faltando e um exemplo

---

### 📋 Passo 6: Verificar o Relatório Salvo

O script salva um arquivo JSON com os detalhes:

```bash
# Listar relatórios gerados
ls -la reports/

# Ver conteúdo do último relatório
cat reports/secrets_verification_*.json
```

**Exemplo de conteúdo:**
```json
{
  "timestamp": "2025-12-01T21:30:00",
  "repository": "vinibento10/Flowcargo-Landing",
  "summary": {
    "required": {
      "found": 5,
      "total": 5,
      "complete": true
    }
  },
  "details": {
    "required": {
      "VITE_N8N_WEBHOOK_URL": "✅ Encontrado",
      "VITE_PDFMONKEY_API_KEY": "✅ Encontrado",
      "VERCEL_TOKEN": "✅ Encontrado",
      "VERCEL_ORG_ID": "✅ Encontrado",
      "VERCEL_PROJECT_ID": "✅ Encontrado"
    }
  }
}
```

---

## 🚀 PARTE 2: Disparar o CI/CD com Push Vazio

### O que é?
Um commit vazio é um commit sem mudanças de código. Ele serve para disparar os workflows do GitHub Actions sem fazer alterações reais no código.

### Por que fazer?
- Testar se os workflows funcionam
- Validar que os secrets estão corretos
- Disparar o CI/CD manualmente

---

### 📋 Passo 1: Verificar Status do Repositório Local

No terminal, na pasta do repositório:

```bash
git status
```

**Você deve ver:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

**Se houver mudanças:**
```bash
# Fazer commit das mudanças primeiro
git add .
git commit -m "sua mensagem aqui"
git push origin main

# Depois continuar com o push vazio
```

---

### 📋 Passo 2: Criar um Commit Vazio

```bash
git commit --allow-empty -m "test: trigger CI/CD"
```

**Explicação:**
- `git commit` = criar um commit
- `--allow-empty` = permitir commit sem mudanças
- `-m "test: trigger CI/CD"` = mensagem do commit

**Resultado esperado:**
```
[main 1a2b3c4] test: trigger CI/CD
```

---

### 📋 Passo 3: Fazer Push para o GitHub

```bash
git push origin main
```

**Explicação:**
- `git push` = enviar commits para o repositório remoto
- `origin` = nome do repositório remoto (padrão)
- `main` = branch para onde enviar

**Resultado esperado:**
```
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 200 bytes | 200.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (0/0), completed with 0 local objects.
To https://github.com/vinibento10/Flowcargo-Landing.git
   a1b2c3d..e5f6g7h main -> main
```

---

### 📋 Passo 4: Acompanhar a Execução do Workflow

**4.1** Acesse: https://github.com/vinibento10/Flowcargo-Landing/actions

**4.2** Você verá um novo workflow em execução:

```
test: trigger CI/CD
↳ Verify Secrets
  ├─ verify_secrets (em execução...)
  ├─ pre_deploy_check
  └─ summary
```

**4.3** Clique no workflow para ver detalhes

**4.4** Acompanhe o progresso:

```
⏳ verify_secrets (em execução)
✅ Checkout code
✅ Setup Python
✅ Install dependencies
⏳ Verify GitHub Secrets (aguarde...)
```

---

### 📋 Passo 5: Interpretar os Resultados

#### ✅ Se tudo correu bem:

```
✅ verify_secrets
   ✅ All required secrets found
   ✅ Report generated

✅ ci.yml
   ✅ Build successful

✅ deploy_with_verification.yml
   ✅ Deploy successful
```

**O que significa:**
- ✅ Todos os workflows executaram com sucesso
- ✅ Secrets foram verificados
- ✅ Build foi bem-sucedido
- ✅ Deploy foi realizado

#### ❌ Se algo falhou:

```
❌ verify_secrets
   ❌ Secrets missing
   └─ VITE_PDFMONKEY_API_KEY not found

🚫 ci.yml
   ⏭️ Skipped (depends on verify_secrets)

🚫 deploy_with_verification.yml
   ⏭️ Skipped (depends on ci.yml)
```

**O que significa:**
- ❌ Faltam secrets
- ⏭️ Outros workflows foram pulados
- 🔧 Você precisa adicionar os secrets faltantes

---

### 📋 Passo 6: Ver Logs Detalhados

**6.1** Na página do workflow, clique em **verify_secrets** job

**6.2** Clique em **Verify GitHub Secrets** step

**6.3** Você verá os logs:

```
🔍 Iniciando verificação de GitHub Secrets...
✅ Token válido - Usuário: vinibento10
📋 Verificando Secrets Obrigatórios:
✅ VITE_N8N_WEBHOOK_URL
✅ VITE_PDFMONKEY_API_KEY
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID
✅ Status Geral: COMPLETO
```

---

### 📋 Passo 7: Verificar Comentário em PR (se aplicável)

Se você fizer push de uma branch com PR aberto:

**7.1** Vá para a aba **"Conversation"** do PR

**7.2** Você verá um comentário automático:

```
## 🔐 GitHub Secrets Verification

✅ Status: COMPLETO

### Required Secrets: 5/5
✅ Todos os secrets obrigatórios foram configurados!

### Optional Secrets: 1/3
```

---

## 🔄 Fluxo Completo (Resumido)

```
1. Gerar GitHub Token
   └─ https://github.com/settings/tokens

2. Adicionar 5 Secrets
   └─ https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions

3. Abrir Terminal
   └─ cd ~/flowcargo-landing

4. Executar Script de Verificação
   └─ ./scripts/verify_secrets.sh ghp_xxxxx
   └─ Resultado: ✅ Todos os secrets encontrados

5. Fazer Commit Vazio
   └─ git commit --allow-empty -m "test: trigger CI/CD"

6. Fazer Push
   └─ git push origin main

7. Acompanhar Workflow
   └─ https://github.com/vinibento10/Flowcargo-Landing/actions
   └─ Resultado: ✅ Deploy bem-sucedido
```

---

## 🆘 Troubleshooting

### Erro: "Token inválido"

```
❌ Token inválido: 401
```

**Solução:**
1. Verificar se o token foi copiado corretamente
2. Regenerar token em: https://github.com/settings/tokens
3. Tentar novamente

### Erro: "Comando não encontrado"

```
bash: ./scripts/verify_secrets.sh: command not found
```

**Solução:**
1. Verificar se está na pasta correta: `pwd`
2. Verificar se o arquivo existe: `ls -la scripts/verify_secrets.sh`
3. Tentar com Python: `python3 scripts/verify_github_secrets.py --token ghp_xxxxx`

### Erro: "Repositório não encontrado"

```
❌ Erro ao obter secrets: 404
```

**Solução:**
1. Verificar se o repositório existe
2. Verificar se o token tem permissão `repo`
3. Verificar se está usando a URL correta

### Erro: "git push falhou"

```
fatal: could not read Username for 'https://github.com': No such file or directory
```

**Solução:**
1. Configurar credenciais do Git:
   ```bash
   git config --global user.email "seu_email@example.com"
   git config --global user.name "Seu Nome"
   ```
2. Tentar push novamente

### Workflow não dispara

**Solução:**
1. Verificar se está na branch `main`
2. Verificar se o workflow está habilitado em: **Settings → Actions → General**
3. Tentar executar manualmente: **Actions → Verify Secrets → Run workflow**

---

## 📝 Comandos Rápidos

```bash
# Verificar se está no repositório correto
pwd

# Ver status do repositório
git status

# Ver últimos commits
git log --oneline -5

# Executar script de verificação (Bash)
./scripts/verify_secrets.sh ghp_xxxxx

# Executar script de verificação (Python)
python3 scripts/verify_github_secrets.py --token ghp_xxxxx

# Criar commit vazio
git commit --allow-empty -m "test: trigger CI/CD"

# Fazer push
git push origin main

# Ver workflows em execução
# Acesse: https://github.com/vinibento10/Flowcargo-Landing/actions
```

---

## ✅ Checklist Final

- [ ] GitHub Token gerado
- [ ] 5 Secrets adicionados no GitHub
- [ ] Terminal aberto na pasta do repositório
- [ ] Script de verificação executado com sucesso
- [ ] Commit vazio criado
- [ ] Push realizado
- [ ] Workflows em execução no GitHub Actions
- [ ] Deploy bem-sucedido
- [ ] Site ao vivo em: https://flowcargo-landing.vercel.app

---

**Pronto! 🎉 Seu CI/CD está funcionando!**

Para dúvidas, consulte:
- `docs/VERIFY_SECRETS.md` - Detalhes do script
- `docs/CI_CD.md` - Arquitetura do CI/CD
- `docs/CICD_FLOW_DIAGRAM.md` - Diagramas visuais
