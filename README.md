# FlowCargo Landing Page

🚀 Landing page profissional para **FlowCargo** - Sistema de gestão e automação de fretes logísticos.

![FlowCargo](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Visão Geral

A FlowCargo Landing Page é uma aplicação web moderna construída com **React 19 + Vite**, apresentando design **dark mode com glassmorphism**, animações fluidas com **Framer Motion**, e integração completa com **n8n** para automação de leads e geração de relatórios de ROI em PDF.

### Características Principais

✨ **Design Profissional**
- Dark mode com glassmorphism e gradientes roxo/ciano
- Animações avançadas em todas as seções (Hero, Features, How It Works, Testimonials)
- Responsivo e otimizado para mobile

🤖 **Chat com Agente IA (Harry)**
- Integração com n8n para atendimento inteligente
- Avatar personalizado e interface traduzida para português
- Suporte em tempo real para dúvidas sobre o sistema

📊 **Calculadora de ROI Interativa**
- Simulação dinâmica de economia (mensal/anual)
- Captura de leads com modal de email
- Geração automática de PDF com relatório personalizado
- Prova social dinâmica baseada na faixa de economia

💬 **Links Flutuantes**
- WhatsApp: Contato direto (5519982026914)
- Email: viniciusalves@mindlinklab.com.br
- Instagram: @mindlink.lab
- CTA flutuante mobile ("Agendar Demo")

🔗 **Integrações**
- **n8n**: Webhook para automação de leads, chat e geração de PDF
- **PDFMonkey**: Geração de relatórios em PDF com design profissional
- **Formulário de Contato**: Integrado com CRM via n8n

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 19 | Framework UI |
| Vite | 7 | Build tool e dev server |
| TypeScript | Latest | Type safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | Latest | Animações |
| Wouter | Latest | Roteamento client-side |
| shadcn/ui | Latest | Componentes UI |
| ApexCharts | Latest | Gráficos de dados |

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm 8+

### Setup Local

```bash
# Clonar repositório
git clone https://github.com/vinibento10/Flowcargo-Landing.git
cd Flowcargo-Landing

# Instalar dependências
pnpm install

# Iniciar dev server
pnpm run dev

# Build para produção
pnpm run build

# Preview do build
pnpm run preview
```

O servidor estará disponível em `http://localhost:5173`

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# n8n Webhook
VITE_N8N_WEBHOOK_URL=https://n8n.mindlinklab.com.br/webhook/roi-report

# PDFMonkey (opcional)
VITE_PDFMONKEY_API_KEY=your_api_key_here

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

### Configuração do n8n

O workflow do n8n está configurado para:

1. **Receber dados da Calculadora de ROI** via webhook
2. **Gerar HTML personalizado** com dados do lead
3. **Converter para PDF** via PDFMonkey API
4. **Enviar por email** com relatório anexado

**Webhook URL**: `https://n8n.mindlinklab.com.br/webhook/roi-report`

## 📁 Estrutura do Projeto

```
flowcargo-landing/
├── client/
│   ├── public/
│   │   ├── images/          # Imagens otimizadas (WebP)
│   │   └── ...
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── ROICalculator.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Terms.tsx
│   │   │   ├── Privacy.tsx
│   │   │   └── Cookies.tsx
│   │   ├── lib/             # Utilitários
│   │   ├── App.tsx          # Roteamento principal
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   └── index.html
├── server/                  # Placeholder para compatibilidade
├── shared/                  # Placeholder para compatibilidade
├── n8n_workflow_roi_pdf.json # Workflow do n8n
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 Design System

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Roxo Primário | `#8B5CF6` | Títulos, CTAs principais |
| Ciano | `#06B6D4` | Destaques, accent color |
| Roxo Escuro | `#7b61ff` | Gradientes, backgrounds |
| Fundo | `#0f0f1e` | Background principal |
| Texto | `#ffffff` | Texto principal |

### Tipografia

- **Headlines**: Space Grotesk (Bold)
- **Body**: Inter (Regular, Medium)
- **Monospace**: Fira Code

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Opção 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Opção 3: GitHub Pages

```bash
pnpm run build
# Fazer push da pasta 'dist' para branch 'gh-pages'
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Green
- **Imagens**: Otimizadas em WebP com lazy loading
- **Fontes**: Preload otimizado com `font-display: swap`
- **Bundle Size**: ~150KB (gzipped)

## 🔐 Segurança

- HTTPS obrigatório
- CSP headers configurados
- Proteção contra XSS via React
- Validação de formulários no cliente e servidor
- Dados sensíveis não armazenados localmente

## 📞 Contato & Suporte

- **WhatsApp**: [5519982026914](https://wa.me/5519982026914)
- **Email**: viniciusalves@mindlinklab.com.br
- **Instagram**: [@mindlink.lab](https://instagram.com/mindlink.lab)
- **Chat n8n**: Disponível na landing page

## 📄 Documentação Adicional

- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Integração n8n](./docs/N8N_INTEGRATION.md)
- [Calculadora de ROI](./docs/ROI_CALCULATOR.md)
- [Termos de Uso](./client/src/pages/Terms.tsx)
- [Política de Privacidade](./client/src/pages/Privacy.tsx)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Design inspirado em padrões modernos de SaaS
- Ícones de [Lucide React](https://lucide.dev)
- Componentes de [shadcn/ui](https://ui.shadcn.com)
- Animações com [Framer Motion](https://www.framer.com/motion)

---

**Desenvolvido com ❤️ por [Vinicius Alves](https://github.com/vinibento10)**

Última atualização: Dezembro 2025
