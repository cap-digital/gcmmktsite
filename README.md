# GCM Marketing

Site de página única da GCM Marketing, agência de performance em Salvador, BA.
São três dobras — início, serviços e contato — e todo botão de ação abre uma
conversa no WhatsApp com a mensagem em pt-BR já montada. Não há backend: o
formulário de contato apenas monta o texto e entrega para o WhatsApp.

## Stack

- Next.js 14.2, App Router
- React 18 e TypeScript em modo estrito
- Tailwind CSS 3.4 (tokens de cor no `tailwind.config.ts`)
- Framer Motion via `LazyMotion` + `domAnimation`, usando o componente `m`
- `lucide-react` para os poucos ícones

Sem imagens, sem requisições externas, sem fontes locais e sem dependências
novas. As fontes vêm do `next/font/google`.

## Como rodar

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # build de produção
npm run start   # sobe o build de produção
npm run lint    # ESLint (next/core-web-vitals + next/typescript)
```

## Onde editar

### Marca, telefone e copy — `lib/site.ts`

Arquivo único. Toda a copy visível, os números e as mensagens do WhatsApp
estão nele.

- **Telefone:** `phoneE164`, `phoneDisplay` e `whatsappNumber` precisam mudar
  juntos. `phoneE164` alimenta o link `tel:`, `whatsappNumber` alimenta o
  `wa.me` e `phoneDisplay` é o que aparece na tela.
- **Mensagens do WhatsApp:** `whatsappDefaultMessage`, `contactMessage`,
  `diagnosisMessage` e o `whatsappMessage` de cada serviço. A função
  `waLink(mensagem)` monta a URL já codificada; `telLink` é o link de ligação.
- **Plataformas:** `marquee.segments`, `platformGrid` e `panel.platforms`. As
  três listas são exemplos do que a agência opera, nunca uma lista fechada —
  mudar uma pede mudar as outras, e cada uma precisa manter a ressalva de que
  entra qualquer plataforma que venda mídia.
- **Painel do hero:** o objeto `panel` (verba sob gestão, roster de
  plataformas e roster da stack). Não existe distribuição, série histórica,
  leitura de desempenho nem medidor: o painel mostra só o que é verificável.
- **Título e descrição da página:** o objeto `meta`.

### Cores e tokens

- `tailwind.config.ts`, bloco `colors`. A paleta é preta com verdes militares:
  base `ink` #0E110F, superfície `ink-2` #1F2421, texto `bone` #EEE9DE e
  `bone-dim` #C9C3B1, estrutura em `sage` #6C7356 (o `olive` #3F4A1E segue
  na paleta como reserva), acento
  `accent` #9AA75F. A dobra clara de Serviços usa o papel cáqui `paper`
  #C9C3B1 com o acento próprio `accent-ink` #3F4A1E.
- Os poucos hexes literais restantes estão em `app/globals.css` (corpo,
  `::selection` e anel de foco) e em `app/icon.svg`.
- Regra da dobra clara: uma única família de tinta por fundo. Texto sobre o
  acento escuro é `bone`; texto sobre o acento claro é `on-accent`.

### Fontes — `app/layout.tsx`

Archivo (eixo de largura `wdth`, exposta como `--font-sans`) e IBM Plex Mono
(`--font-mono`), carregadas pelo `next/font/google`. **Não trocar esse bloco.**
As utilitárias de largura `.wdth-78` até `.wdth-125` são um plugin no
`tailwind.config.ts`.

### Tipografia e componentes

- Escala tipográfica (`.t-display`, `.t-h2`, `.t-figure`, `.t-cond` e
  companhia): `app/globals.css`, dentro de `@layer components`.
- Painel de operação do hero: `components/PanelOperacao.tsx`, alimentado por
  `site.panel`.
- Tarja de plataformas: `components/Marquee.tsx` (tem dois ramos, um animado e
  um estático para movimento reduzido).
- Botões: `components/Button.tsx`, com os tons `dark` e `light`.

## Regra de veracidade

O único número de desempenho publicado no site é a verba acumulada em mídia
paga: **R$ 15.000.000+** (`stats[0]` e `panel.figureValue`). Não existe média
de ROAS, tempo de carregamento medido, contagem de landing pages, distribuição
percentual de verba, série histórica de investimento, nota de desempenho,
prazo de entrega nem tempo de resposta prometido. Os demais números que podem
aparecer na tela são apenas o telefone, os índices de seção (01/02/03), o
horário de atendimento e o ano do rodapé. Se o cliente não forneceu o dado,
ele não entra — nem como exemplo, nem como ilustração com rótulo numérico.

## Regras do projeto

- Mobile primeiro: funciona a 360px sem nenhuma rolagem horizontal. O teto do
  `clamp` de `.t-figure` é a trava de largura do número do painel; mexer nele
  pede refazer a conta.
- Alvos de toque de no mínimo 44px.
- `prefers-reduced-motion` respeitado em toda animação, inclusive no único
  laço contínuo que restou (a tarja), que simplesmente não começa.
- Só `transform` e `opacity` animam. Nada de animar `width`, `left` ou cor.
- Nada de `Math.random`, `Date` ou `window` durante o render.
- Um único `h1`, marcos semânticos, `lang="pt-BR"` e toda a copy visível em
  português.

## Publicação

Build padrão do App Router, sem variáveis de ambiente e sem serviço externo.
`npm run build` seguido de `npm run start`, ou o deploy direto em qualquer
host que rode Next.js 14.
