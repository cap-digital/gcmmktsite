// Conteúdo central do site da GCM Marketing.
// Marca, telefone, plataformas e toda a copy vivem aqui.
//
// REGRA DE VERACIDADE: o único número de desempenho publicado neste site é a
// verba acumulada em mídia paga (R$ 15.000.000+). Não existe média de ROAS,
// tempo de carregamento medido, contagem de páginas, distribuição de verba,
// série histórica, nota de desempenho, prazo de entrega nem tempo de resposta.
// Não invente nenhum desses números: se o cliente não forneceu, não entra.

type ServiceDef = {
  index: string;
  title: string;
  /** Palavra do título que recebe o bloco de acento na varredura de hover. */
  accentWord: string | null;
  description: string;
  bullets: readonly [string, string, string];
  whatsappMessage: string;
  block: "platforms" | "pixel" | "ab" | null;
};

type StatDef = {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  featured: boolean;
  label: string;
};

export const site = {
  name: "GCM Marketing",
  shortName: "GCMMKT",
  tagline: "Mídia paga e páginas, medidas no mesmo painel.",
  phoneE164: "+5571981728484",
  phoneDisplay: "+55 71 98172-8484",
  whatsappNumber: "5571981728484",
  whatsappDefaultMessage:
    "Olá, GCM Marketing. Vim pelo site. Quero falar sobre mídia paga e páginas.",
  contactMessage:
    "Olá, GCM Marketing. Vim pelo site. Eu vendo: ___ . Hoje invisto cerca de R$ ___ por mês em anúncios.",
  diagnosisMessage:
    "Olá, GCM Marketing. Vim pelo site. Quero marcar o diagnóstico.",
  hours: "Segunda a sexta, 9h às 18h, horário de Brasília. Salvador, BA.",
  location: "Salvador, BA",
  footerYear: "2026",
  footerLine: "MÍDIA PAGA E PÁGINAS · SALVADOR, BA",
  skipLink: "Pular para o conteúdo",

  nav: [
    { label: "Serviços", href: "#servicos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ],

  // Trilho de seções do celular (a nav não tem menu sanfonado).
  sectionRail: [
    { index: "01", label: "INÍCIO", href: "#inicio", id: "inicio" },
    { index: "02", label: "SERVIÇOS", href: "#servicos", id: "servicos" },
    { index: "03", label: "CONTATO", href: "#contato", id: "contato" },
  ],

  hero: {
    eyebrow: "01 / GCM MARKETING · MÍDIA PAGA E PÁGINAS · SALVADOR, BA",
    titleLines: ["Anunciamos em", "qualquer plataforma.", "Medimos em uma."],
    titleLabel: "Anunciamos em qualquer plataforma. Medimos em uma.",
    accentWord: "uma",
    lead: "Meta, Google, TikTok, LinkedIn, Spotify, DV360, Globo e UOL são exemplos do que operamos. Entra qualquer plataforma que venda mídia e onde o seu público esteja. O investimento de todas cai num painel só.",
    ctaPrimary: "Falar no WhatsApp",
    ctaPrimaryShort: "FALAR NO WHATSAPP",
    ctaSecondary: "Ver o que fazemos",
    microcopyBefore: "Atendemos de segunda a sexta, das 9h às 18h.",
  },

  // Prova numérica da página. Existe uma linha só, e ela é a verba acumulada
  // em mídia paga: o único número de desempenho que o cliente forneceu.
  stats: [
    {
      prefix: "R$ ",
      value: 15,
      suffix: " mi+",
      decimals: 0,
      featured: true,
      label: "investidos em mídia paga",
    },
  ] as const satisfies readonly StatDef[],
  statsNote:
    "Mais de R$ 15 milhões investidos em mídia paga, somando todas as plataformas em que já operamos. É o único número de operação que publicamos aqui: o resto varia por oferta e por nicho, e aparece no gerenciador da sua própria conta.",

  // Painel de operação do hero. Só entra aqui o que é verificável: a verba
  // acumulada, as plataformas que operamos e a stack que usamos. Sem série
  // histórica, sem percentual, sem nota, sem carimbo de data ou hora.
  panel: {
    srTitle: "Painel de operação",
    label: "PAINEL DE OPERAÇÃO",
    status: "EM OPERAÇÃO",

    figureLabel: "VERBA SOB GESTÃO",
    figureValue: 15000000,
    figurePrefix: "R$ ",
    figureSuffix: "+",
    figureNote: "ACUMULADO EM MÍDIA PAGA",

    platformsLabel: "PLATAFORMAS",
    platformsUnit: "EXEMPLOS",
    platforms: [
      "META ADS",
      "GOOGLE ADS",
      "TIKTOK ADS",
      "LINKEDIN ADS",
      "SPOTIFY ADS",
      "GOOGLE DV360",
      "GLOBO ADS",
      "UOL ADS",
    ],
    platformsOpen: "E QUALQUER OUTRA QUE VENDA MÍDIA",

    stackLabel: "STACK",
    stackUnit: "PÁGINA E DADOS",
    stack: [
      "NEXT.JS",
      "VERCEL",
      "SUPABASE",
      "HOSTINGER",
      "GA4",
      "GOOGLE TAG MANAGER",
      "API DE CONVERSÕES",
      "LOOKER STUDIO",
    ],

    footnote:
      "Verba acumulada em mídia paga. Auditável no gerenciador de cada conta.",
  },

  // Tarja de marquee no topo da dobra clara.
  marquee: {
    label: "OPERAMOS COM",
    segments: [
      {
        label: "MÍDIA",
        items: [
          "META ADS",
          "GOOGLE ADS",
          "TIKTOK ADS",
          "LINKEDIN ADS",
          "SPOTIFY ADS",
          "GOOGLE DV360",
          "GLOBO ADS",
          "UOL ADS",
          "E QUALQUER OUTRA",
        ],
      },
      {
        label: "STACK",
        items: [
          "NEXT.JS",
          "VERCEL",
          "SUPABASE",
          "HOSTINGER",
          "GA4",
          "GOOGLE TAG MANAGER",
          "API DE CONVERSÕES",
          "LOOKER STUDIO",
        ],
      },
    ],
  },

  // Grade estática, legível, dentro do serviço 02. São exemplos, não a lista
  // fechada do que operamos.
  platformGrid: [
    "META ADS",
    "GOOGLE ADS",
    "TIKTOK ADS",
    "LINKEDIN ADS",
    "SPOTIFY ADS",
    "GOOGLE DV360",
    "GLOBO ADS",
    "UOL ADS",
  ],
  platformGridNote:
    "São exemplos, não a lista completa. Entra qualquer plataforma que venda mídia e onde o seu público esteja.",

  servicesSection: {
    number: "02 / SERVIÇOS",
    titleLines: ["O que está escrito", "no contrato."],
    titleLabel: "O que está escrito no contrato.",
    marginNote:
      "Quatro frentes, um time só. Quem escreve a página é quem sobe a campanha e quem confere o evento. Não existe repasse entre fornecedores no meio do caminho.",
  },

  services: [
    {
      index: "01",
      title: "Landing pages e sites",
      accentWord: null,
      description:
        "A página é feita em Next.js, publicada na Vercel ou na Hostinger, com os leads gravados no Supabase e avisados no WhatsApp. Escrevemos o texto, montamos a estrutura e entregamos com o rastreamento já instalado e testado.",
      bullets: [
        "Next.js na Vercel, domínio, SSL e redirecionamentos prontos",
        "Leads gravados no Supabase e enviados para o WhatsApp na hora",
        "Página leve, feita para abrir rápido no 4G e conferida em celular de verdade antes de publicar",
      ],
      whatsappMessage:
        "Olá, GCM Marketing. Vim pelo site. Quero falar sobre uma landing page nova.",
      block: null,
    },
    {
      index: "02",
      title: "Mídia paga em todas as plataformas",
      accentWord: "todas",
      description:
        "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Spotify Ads, Google DV360, Globo Ads e UOL Ads são exemplos do que operamos, todos pela mesma equipe e somados no mesmo relatório. A lista não é fechada: entra qualquer plataforma que venda mídia e onde o seu público esteja.",
      bullets: [
        "Estrutura por etapa: descoberta, consideração e fechamento",
        "Criativo novo toda semana, com o vencedor registrado e o perdedor também",
        "CPA, CPL e ROAS por plataforma, no seu e-mail toda segunda-feira",
      ],
      whatsappMessage:
        "Olá, GCM Marketing. Vim pelo site. Quero falar sobre mídia paga e sobre em quais plataformas vale investir.",
      block: "platforms",
    },
    {
      index: "03",
      title: "Medição, tags e dados",
      accentWord: null,
      description:
        "Instalamos GA4, Google Tag Manager e API de Conversões e conferimos evento por evento antes de qualquer campanha subir. O número que sai no Looker Studio é o mesmo que sai no gerenciador, e quando os dois discordam a gente para e descobre por quê.",
      bullets: [
        "GA4 e GTM com camada de dados documentada e entregue para você",
        "API de Conversões do Meta e do TikTok, com deduplicação conferida",
        "Painel no Looker Studio, com acesso para o seu time e para o seu contador",
      ],
      whatsappMessage:
        "Olá, GCM Marketing. Vim pelo site. Quero falar sobre rastreamento, GA4, GTM e relatórios.",
      block: "pixel",
    },
    {
      index: "04",
      title: "CRO e testes A/B",
      accentWord: null,
      description:
        "A hipótese sai da gravação de sessão e do funil real da página, não do que a gente acha bonito. Roda uma variante por vez, com critério de parada definido antes de começar, até o número mexer ou o teste morrer.",
      bullets: [
        "Uma hipótese por ciclo, com critério de parada escrito antes",
        "Teste de oferta, de título e de formulário, nessa ordem",
        "Resultado registrado inclusive quando o teste dá negativo",
      ],
      whatsappMessage:
        "Olá, GCM Marketing. Vim pelo site. Quero falar sobre CRO e testes A/B na minha página.",
      block: "ab",
    },
  ] as const satisfies readonly ServiceDef[],
  serviceCta: "Falar sobre isso",

  // Tabela de conferência estática do serviço 03. Nomes de evento e destino,
  // nenhum valor.
  trackingTable: {
    rows: [
      { event: "LEAD", to: "GA4 · META CAPI" },
      { event: "PURCHASE", to: "GOOGLE ADS · CAPI" },
      { event: "PAGEVIEW", to: "GTM" },
      { event: "VIEWCONTENT", to: "TIKTOK EVENTS API" },
    ],
    ok: "OK",
    pending: "·",
    note: "Exemplo de conferência.",
  },

  // Ilustração do serviço 04: mostra o formato de um teste A/B, sem número
  // nenhum. As proporções das barras são decoração, não resultado.
  abTest: {
    a: { label: "A", scale: 0.72 },
    b: { label: "B", scale: 1 },
    note: "Ilustração do formato do teste. Sem dados de cliente.",
  },

  howItWorks: {
    label: "COMO FUNCIONA",
    cta: "Marcar o diagnóstico",
  },
  steps: [
    {
      index: "01",
      title: "Diagnóstico",
      text: "Uma conversa no WhatsApp ou no Meet. Você mostra o que vende e os números de hoje. A gente diz o que dá para fazer e por onde começar. Se a conta não fecha, falamos na hora: preferimos perder o orçamento a montar campanha que não vai pagar.",
    },
    {
      index: "02",
      title: "Montagem",
      text: "Página, tags e campanhas montadas na sequência, a partir da aprovação do texto. O prazo sai combinado por escrito no começo e você acompanha cada entrega por um link.",
    },
    {
      index: "03",
      title: "Operação",
      text: "Ajuste diário no gerenciador, relatório toda segunda e uma reunião por mês para decidir onde entra mais verba.",
    },
  ],

  contact: {
    number: "03 / CONTATO",
    marker: "03",
    titleLines: ["Diga o que", "você vende e", "quanto investe", "por mês."],
    titleLabel: "Diga o que você vende e quanto investe por mês.",
    lead: "Com essas duas informações a gente já responde se faz sentido começar agora e por onde. A leitura inicial sai na mesma conversa, sem custo e sem apresentação de slides. Quem responde aqui é quem vai operar a conta.",
    cta: "Falar no WhatsApp agora",
    ctaNote: "Atendimento de segunda a sexta, das 9h às 18h.",
    phoneLabel: "OU LIGUE / SALVE O CONTATO",
    form: {
      title: "Prefere escrever?",
      subtitle:
        "Preencha e abrimos o WhatsApp com a mensagem já montada. Nada fica salvo nesta página.",
      nameLabel: "SEU NOME",
      namePlaceholder: "Ana Souza",
      companyLabel: "EMPRESA OU SITE (OPCIONAL)",
      companyPlaceholder: "loja.com.br",
      objectiveLabel: "OBJETIVO",
      submit: "Abrir o WhatsApp",
      sending: "Abrindo o WhatsApp...",
      fallback: "Se não abriu, toque aqui para abrir o WhatsApp",
      note: "Nada é salvo aqui. A mensagem abre direto no seu WhatsApp.",
      nameError: "Escreva seu nome para continuar.",
    },
  },
  guarantees: [
    { key: "DIAGNÓSTICO", value: "gratuito" },
    { key: "SETUP", value: "sem taxa escondida" },
    { key: "CONTRATO", value: "mensal, sem fidelidade" },
    { key: "RELATÓRIO", value: "toda segunda-feira" },
  ],
  objectives: [
    "Começar mídia paga do zero",
    "Melhorar campanhas que já rodam",
    "Criar uma landing page",
    "Refazer o site",
    "Arrumar rastreamento e relatórios",
    "Aumentar a conversão da página atual",
    "Outro",
  ],

  meta: {
    title: "GCM Marketing: mídia paga e landing pages em Salvador, BA",
    description:
      "Agência de performance em Salvador. Mais de R$ 15 milhões investidos em mídia paga, em plataformas como Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, Spotify Ads, Google DV360, Globo Ads e UOL Ads, com páginas em Next.js e medição em GA4, GTM e API de Conversões.",
  },
} as const;

export type Service = (typeof site.services)[number];
export type Stat = (typeof site.stats)[number];
export type Step = (typeof site.steps)[number];

export function waLink(message: string = site.whatsappDefaultMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phoneE164}`;

export function buildFormMessage(fields: {
  nome: string;
  empresa: string;
  objetivo: string;
}): string {
  const nome = fields.nome.trim();
  const empresa = fields.empresa.trim();
  return `Olá, ${site.name}. Aqui é ${nome}${empresa ? `, da ${empresa}` : ""}. Objetivo: ${fields.objetivo}. Vim pelo site.`;
}
