// Configurações globais do site — edite aqui primeiro.
export const SITE = {
  title: 'Meu Blog',
  description: 'Dicas, guias e novidades sobre [seu nicho].',
  author: 'Seu Nome',
  email: 'contato@seudominio.com.br',
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
