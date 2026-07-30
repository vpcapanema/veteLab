# VeteLab — Sistema Web

Sistema web do **Vetelab Laboratório Veterinário**, em Sinop-MT.

Site publicado: <https://vpcapanema.github.io/veteLab/>

## O que já está pronto (Fases 0 → 2)

**Fase 0 — Fundação**

- Next.js 15 (App Router) + TypeScript + Tailwind + ESLint + Prettier
- Identidade visual do VeteLab aplicada a partir do material oficial fornecido
- Layout base (header responsivo, footer, botão de WhatsApp flutuante)
- SEO técnico: `sitemap.xml`, `robots.txt`, Open Graph, JSON-LD (VeterinaryCare)

**Fase 1 — Site institucional**

- `/` Home com hero, destaque para o banco de sangue, prévia de serviços e CTA de contato
- `/sobre`
- `/servicos` (catálogo por categoria) + `/servicos/[slug]` (detalhe de cada exame)
- `/contato` com formulário funcional
- `/politica-de-privacidade` e `/termos-de-uso` (LGPD)

**Fase 2 — Landing do Banco de Sangue**

- `/banco-de-sangue` (landing principal)
- `/banco-de-sangue/como-funciona` (passo a passo + FAQ)
- `/banco-de-sangue/quero-doar` (formulário público de doador)
- `/banco-de-sangue/preciso-receber` (formulário público de receptor)

**APIs**

- `POST /api/contato` — envio de mensagens
- `POST /api/banco-de-sangue/doador` — cadastro público de doador + confirmação por e-mail
- `POST /api/banco-de-sangue/receptor` — solicitação pública de bolsa + confirmação por e-mail

Todas as APIs têm rate-limit e validação com Zod. Se `RESEND_API_KEY` não estiver definida, o envio é simulado (log no console) — útil para desenvolver sem gastar créditos.

No GitHub Pages, que não executa APIs Node.js, os formulários abrem o WhatsApp do VeteLab com os dados preenchidos. Em uma hospedagem Next.js com servidor, eles continuam usando as APIs acima.

## Como rodar localmente

```powershell
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
copy .env.example .env.local
# (edite .env.local se quiser testar envio real de e-mail)

# 3. Rodar em modo dev
npm run dev
# abre em http://localhost:3000
```

## Scripts

```powershell
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm start          # rodar build de produção
npm run typecheck  # validar tipos
npm run lint       # ESLint
npm run format     # Prettier
```

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` gera a exportação estática e publica automaticamente a cada push na branch `main`. A publicação também pode ser iniciada manualmente pela aba **Actions** do GitHub.

## Estrutura

```
src/
├── app/                      # rotas (App Router)
│   ├── layout.tsx            # layout raiz
│   ├── page.tsx              # home
│   ├── sobre/
│   ├── servicos/[slug]/
│   ├── contato/
│   ├── banco-de-sangue/
│   ├── entrar/               # placeholder — Fase 3
│   ├── api/                  # rotas de API
│   ├── sitemap.ts | robots.ts
│   └── globals.css           # tema (variáveis CSS)
├── components/
│   ├── brand/                # logo
│   ├── layout/               # header, footer, whatsapp flutuante, nav
│   ├── forms/                # contato, doador, receptor (client)
│   ├── seo/                  # JSON-LD
│   └── ui/                   # button, card, input, badge, etc.
└── lib/
    ├── data/                 # site, services, blood-bank
    ├── validators/forms.ts   # Zod schemas
    ├── email.ts              # cliente Resend
    ├── rate-limit.ts         # rate limit in-memory
    └── utils.ts              # helpers (cn, whatsapp link, phone format)
```

## O que precisa da sua irmã para virar "definitivo"

**Bloqueadores da parte visual** (o código roda sem, mas o site fica com placeholder):

1. Logo em vetor (SVG) — substituir `public/logo.svg` e `public/logo-mark.svg`
2. Paleta de cores exata da marca — ajustar as variáveis em `src/app/globals.css`
3. Tipografia oficial — trocar o Inter em `src/app/layout.tsx`
4. Fotos reais do laboratório, equipe e pets doadores
5. Textos institucionais próprios (missão, história do banco de sangue)

**Bloqueadores operacionais**: 6. Endereço completo, telefone e horário — atualizar em `src/lib/data/site.ts` 7. CNPJ e razão social — atualizar em `src/lib/data/site.ts` 8. Lista real de exames com preços — atualizar `src/lib/data/services.ts` 9. Nome e CRMV do responsável técnico 10. Domínio definitivo — atualizar `NEXT_PUBLIC_SITE_URL` 11. Conta no [Resend](https://resend.com) e domínio validado para envio de e-mails 12. Conta na [Vercel](https://vercel.com) para hospedagem (tier gratuito atende com folga no início)

## Próximas fases (planejadas)

- **Fase 3** — Autenticação (Supabase) + área do tutor
- **Fase 4** — Admin: catálogo, pedidos de exames, upload de laudos
- **Fase 5** — Admin: gestão do Banco de Sangue (doadores, coletas, estoque, direcionamentos)
- **Fase 6** — Notificações + polimento + acessibilidade WCAG AA
- **Fase 6.5** — Integrações com Meta (Instagram embed, Graph API, Messaging)
- **Fase 7** — Deploy final, backup, treinamento

Ver plano completo em `/memories/session/plan.md`.
