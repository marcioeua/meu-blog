// Configurações globais do site — edite aqui primeiro.
export const SITE = {
  title: 'Casa Smart',
  description: 'Guias, dicas e análises sobre móveis inteligentes para deixar sua casa mais prática, confortável e conectada.',
  author: 'Marcio Andrade',
  email: 'cimargv@gmail.com',
  lang: 'pt-BR',
  locale: 'pt_BR',
};

export const ADSENSE = {
  // Seu ID de publisher, ex: 'ca-pub-1234567890123456'. Deixe vazio para desativar os anúncios.
  client: '',
  // IDs dos blocos de anúncio criados no painel do AdSense (Anúncios > Por bloco de anúncios)
  slots: {
    header: '',
    inArticle: '',
    sidebar: '',
    footer: '',
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/blog/', label: 'Blog' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contato/', label: 'Contato' },
];
