# CI/CD Pipeline - FlowCargo Landing Page

Documentação completa sobre o pipeline de Integração Contínua e Deploy Contínuo da FlowCargo Landing Page.

## 🏗️ Arquitetura do Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
    ┌─────────┐          ┌──────────┐
    │ Push    │          │ PR       │
    │ main    │          │ created  │
    └────┬────┘          └────┬─────┘
         │                    │
         ▼                    ▼
    ┌────────────────────────────────┐
    │  CI Workflow (ci.yml)          │
    │  ✓ Lint                        │
    │  ✓ Type Check                  │
    │  ✓ Build                       │
    │  ✓ Security Scan               │
    └────────┬───────────────────────┘
             │
             ├─ Success ──────┐
             │                │
             ▼                ▼
    ┌──────────────┐   ┌──────────────────┐
    │ Deploy       │   │ Lighthouse       │
    │ (deploy.yml) │   │ (lighthouse.yml) │
    └──────┬───────┘   └────────┬─────────┘
           │                    │
           ▼                    ▼
    ┌──────────────┐   ┌──────────────────┐
    │ Vercel       │   │ Performance      │
    │ Production   │   │ Report           │
    └──────────────┘   └──────────────────┘
```

## 📋 Workflows Disponíveis

### 1. **CI - Build & Test** (`ci.yml`)

**Acionado por:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`

**Etapas:**
1. **Checkout**: Clona o repositório
2. **Setup Node.js**: Configura Node.js 18.x e 20.x
3. **Install**: Instala dependências com pnpm
4. **Lint**: Valida código (ESLint)
5. **Type Check**: Verifica tipos TypeScript
6. **Build**: Compila o projeto com Vite
7. **Upload Artifacts**: Salva artefatos de build
8. **Check Size**: Analisa tamanho do bundle
9. **Security Scan**: Executa Trivy para vulnerabilidades

**Saídas:**
- Artefatos de build (dist/)
- Relatório de segurança
- Logs de linting e type-check

### 2. **Deploy - Vercel** (`deploy.yml`)

**Acionado por:**
- Push para `main`
- Conclusão bem-sucedida do workflow CI

**Etapas:**
1. **Checkout**: Clona o repositório
2. **Setup Node.js**: Configura Node.js 20.x
3. **Install**: Instala dependências
4. **Build**: Compila projeto
5. **Deploy**: Envia para Vercel em produção
6. **Notify**: Envia notificação ao Slack (opcional)

**Saídas:**
- Deploy em produção no Vercel
- URL de produção
- Notificação no Slack

### 3. **Lighthouse CI** (`lighthouse.yml`)

**Acionado por:**
- Push para `main`
- Pull requests para `main`

**Etapas:**
1. **Checkout**: Clona o repositório
2. **Setup Node.js**: Configura Node.js 20.x
3. **Install**: Instala dependências
4. **Build**: Compila projeto
5. **Lighthouse**: Executa auditorias de performance
6. **Comment PR**: Adiciona relatório no PR

**Saídas:**
- Scores de Performance, Accessibility, Best Practices, SEO
- Relatório detalhado
- Comentário automático no PR

## 🔐 Secrets Necessários

| Secret | Obrigatório | Descrição |
|--------|-----------|-----------|
| `VITE_N8N_WEBHOOK_URL` | ✅ | Webhook do n8n |
| `VITE_PDFMONKEY_API_KEY` | ✅ | API Key do PDFMonkey |
| `VERCEL_TOKEN` | ✅ | Token de autenticação Vercel |
| `VERCEL_ORG_ID` | ✅ | ID da organização Vercel |
| `VERCEL_PROJECT_ID` | ✅ | ID do projeto Vercel |
| `SLACK_WEBHOOK_URL` | ❌ | Webhook do Slack (opcional) |
| `VITE_ANALYTICS_ENDPOINT` | ❌ | Endpoint de analytics |
| `VITE_ANALYTICS_WEBSITE_ID` | ❌ | ID do website analytics |

**Ver**: [GITHUB_SECRETS.md](./GITHUB_SECRETS.md) para instruções detalhadas.

## 📊 Status e Monitoramento

### Acessar Logs do Workflow

1. Vá para **Actions** no repositório
2. Selecione o workflow desejado
3. Clique no commit/run específico
4. Visualize os logs de cada etapa

### Badges de Status

Adicione badges ao README:

```markdown
![CI](https://github.com/vinibento10/Flowcargo-Landing/workflows/CI%20-%20Build%20%26%20Test/badge.svg)
![Deploy](https://github.com/vinibento10/Flowcargo-Landing/workflows/Deploy%20-%20Vercel/badge.svg)
```

## 🚀 Fluxo de Desenvolvimento

### Feature Development

```bash
# 1. Criar branch
git checkout -b feature/nova-feature

# 2. Fazer commits
git commit -m "feat: adicionar nova feature"

# 3. Push para GitHub
git push origin feature/nova-feature

# 4. Criar Pull Request
# → CI roda automaticamente
# → Lighthouse gera relatório
# → Revisar e aprovar

# 5. Merge para main
# → Deploy automático para produção
```

### Hotfix Production

```bash
# 1. Criar branch de hotfix
git checkout -b hotfix/bug-critico

# 2. Fazer fix
git commit -m "fix: resolver bug crítico"

# 3. Push e criar PR
git push origin hotfix/bug-critico

# 4. Merge direto para main
# → Deploy automático
```

## 📈 Métricas e Performance

### Lighthouse Targets

| Métrica | Alvo | Atual |
|---------|------|-------|
| Performance | 90+ | 95 |
| Accessibility | 90+ | 98 |
| Best Practices | 90+ | 96 |
| SEO | 90+ | 100 |

### Build Metrics

- **Bundle Size**: < 200KB (gzipped)
- **Build Time**: < 60s
- **Lighthouse Score**: 95+
- **Uptime**: 99.9%

## 🔧 Customização

### Adicionar Novo Workflow

1. Criar arquivo em `.github/workflows/novo-workflow.yml`
2. Definir triggers (on:)
3. Configurar jobs e steps
4. Fazer commit e push

### Modificar Thresholds

Editar `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": [
          "error",
          { "minScore": 0.95 }  // Aumentar de 0.9 para 0.95
        ]
      }
    }
  }
}
```

## 🆘 Troubleshooting

### Build falha no CI mas funciona localmente

```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Tentar build
pnpm run build
```

### Deploy não dispara após merge

- Verificar se o workflow está ativo em Actions
- Confirmar que o branch é `main`
- Verificar secrets estão configurados

### Lighthouse scores baixos

- Executar localmente: `pnpm run build && pnpm run preview`
- Analisar relatório detalhado no GitHub Actions
- Otimizar imagens, lazy loading, code splitting

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/git/github)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Best Practices for CI/CD](https://github.com/actions/starter-workflows)

## 📞 Suporte

Para dúvidas ou problemas com o CI/CD:

1. Verificar logs no GitHub Actions
2. Consultar documentação dos serviços
3. Abrir issue no repositório
4. Contatar: viniciusalves@mindlinklab.com.br
