// Gera capas ilustradas provisórias (1600x900) para os posts.
// Uso: node scripts/gerar-capas.mjs  → salva em src/content/blog/imagens/capa-<slug>.jpg
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/content/blog/imagens';
mkdirSync(OUT, { recursive: true });

// Ícones em traço, desenhados numa área de 200x200
const S = 'fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  casa: `<path ${S} d="M30 95 100 35l70 60v70a8 8 0 0 1-8 8h-40v-50H78v50H38a8 8 0 0 1-8-8z"/><circle cx="100" cy="98" r="6" fill="#fff"/><path ${S} d="M80 72a28 28 0 0 1 40 0M88 82a16 16 0 0 1 24 0"/>`,
  cama: `<path ${S} d="M25 150V60M25 120h150v30M25 120V95h150v25M175 150v-30"/><rect ${S} x="40" y="78" width="40" height="17" rx="6"/>`,
  camaArticulada: `<path ${S} d="M20 155h160M35 155v-20M165 155v-20M30 135h70l40-25 35 25M30 135l20-45"/><rect ${S} x="38" y="88" width="34" height="14" rx="6" transform="rotate(-60 55 95)"/>`,
  camaRetratil: `<rect ${S} x="45" y="25" width="110" height="150" rx="6"/><path ${S} d="M45 120h110M60 120l-30 50M140 120l30 50M30 170h140"/><path ${S} d="M70 45h60M70 60h60"/>`,
  camaBau: `<path ${S} d="M25 160V95h150v65M25 125h150"/><path ${S} d="M25 95l25-45h125l-25 45"/><path ${S} d="M85 140h30"/>`,
  mesa: `<path ${S} d="M25 75h150M60 75v90M140 75v90M45 165h30M125 165h30"/><path ${S} d="M100 30v30M88 42l12-12 12 12"/><rect ${S} x="80" y="50" width="40" height="0"/>`,
  mesaJantar: `<path ${S} d="M20 85h160M40 85v80M160 85v80M75 85v-5M125 85v-5"/><path ${S} d="M85 70h30M60 45l-15 15M140 45l15 15M100 35v15" opacity=".9"/>`,
  sofa: `<path ${S} d="M35 95V70a12 12 0 0 1 12-12h106a12 12 0 0 1 12 12v25"/><path ${S} d="M25 150v-45a10 10 0 0 1 20 0v15h110v-15a10 10 0 0 1 20 0v45zM40 150v15M160 150v15"/>`,
  poltrona: `<path ${S} d="M55 110V55a15 15 0 0 1 15-15h60a15 15 0 0 1 15 15v55"/><path ${S} d="M40 160v-50a10 10 0 0 1 20 0v15h80v-15a10 10 0 0 1 20 0v50zM55 160v15M145 160v15"/><path ${S} d="M85 70h30M85 88h30"/>`,
  criado: `<rect ${S} x="50" y="80" width="100" height="85" rx="6"/><path ${S} d="M50 122h100M90 101h20M90 143h20"/><rect ${S} x="78" y="40" width="44" height="28" rx="6"/><path ${S} d="M93 30q7-8 14 0M88 22q12-14 24 0"/>`,
  guardaRoupa: `<rect ${S} x="45" y="25" width="110" height="150" rx="6"/><path ${S} d="M100 25v150M88 95v15M112 95v15M55 185v-10M145 185v-10"/><path ${S} d="M60 40l10 10M140 40l-10 10" opacity=".8"/>`,
  tomada: `<rect ${S} x="50" y="45" width="100" height="110" rx="20"/><circle cx="82" cy="95" r="7" fill="#fff"/><circle cx="118" cy="95" r="7" fill="#fff"/><path ${S} d="M100 125v-5"/><path ${S} d="M165 40q15 15 0 30M178 28q28 27 0 54"/>`,
  espelho: `<rect ${S} x="55" y="25" width="90" height="125" rx="45"/><path ${S} d="M75 70l25-25M78 95l40-40"/><path ${S} d="M100 150v20M75 175h50"/>`,
  estante: `<rect ${S} x="40" y="25" width="120" height="150" rx="4"/><path ${S} d="M40 75h120M40 125h120M100 25v150"/><path ${S} d="M55 75V50M65 75V55M118 125v-30h22v30M55 160h30"/>`,
  eletrica: `<path ${S} d="M110 25 60 110h40l-10 65 50-90h-40z"/>`,
  cozinha: `<rect ${S} x="25" y="30" width="150" height="45" rx="4"/><path ${S} d="M100 30v45M25 115h150v55H25zM75 115v55M125 115v55M55 140h5M95 140h10M140 140h5"/><path ${S} d="M40 100h40" opacity=".8"/>`,
  tv: `<rect ${S} x="30" y="30" width="140" height="85" rx="6"/><path ${S} d="M20 165h160M35 165v-25h130v25M85 150h30"/><path ${S} d="M100 115v25"/>`,
  infantil: `<path ${S} d="M35 160V70M165 160V70M35 95h130M35 160h130M35 130h130M60 95v35M85 95v35M110 95v35M135 95v35"/><circle ${S} cx="100" cy="45" r="15"/><path ${S} d="M115 45h15"/>`,
  ferramenta: `<path ${S} d="M135 35a30 30 0 0 0-38 38l-62 62a12 12 0 0 0 17 17l62-62a30 30 0 0 0 38-38l-18 18-15-4-4-15z"/>`,
  gamer: `<rect ${S} x="35" y="25" width="130" height="80" rx="6"/><path ${S} d="M85 105v20M65 125h70"/><path ${S} d="M60 150h80a15 15 0 0 1 0 30H60a15 15 0 0 1 0-30zM70 165h15M77 158v15"/><circle cx="125" cy="165" r="5" fill="#fff"/>`,
  banheiro: `<path ${S} d="M30 95h140v15a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12z"/><path ${S} d="M45 122v45h110v-45M100 122v45M88 145h-5M117 145h-5"/><path ${S} d="M100 95V60a15 15 0 0 1 30 0"/><rect ${S} x="60" y="25" width="80" height="0"/>`,
  varanda: `<path ${S} d="M20 175h160M30 120h140M40 120v55M70 120v55M100 120v55M130 120v55M160 120v55"/><path ${S} d="M60 95c0-30 15-55 40-65 25 10 40 35 40 65"/><path ${S} d="M100 30v90"/>`,
  planejados: `<rect ${S} x="30" y="40" width="140" height="120" rx="4"/><path ${S} d="M30 80h140M100 40v120M30 175h140"/><path ${S} d="M40 25h120" stroke-dasharray="6 10"/><path ${S} d="M180 40v120" stroke-dasharray="6 10"/>`,
  checklist: `<rect ${S} x="45" y="25" width="110" height="150" rx="8"/><path ${S} d="M65 65l8 8 15-15M100 68h35M65 105l8 8 15-15M100 108h35M70 140l16 16M86 140l-16 16M100 148h35"/>`,
  hall: `<rect ${S} x="45" y="20" width="75" height="155" rx="4"/><circle cx="105" cy="100" r="5" fill="#fff"/><path ${S} d="M140 50v40M140 50h20M150 50v15"/><path ${S} d="M130 175v-30h45v30M130 158h45"/>`,
  voz: `<rect ${S} x="70" y="40" width="60" height="120" rx="30"/><circle cx="100" cy="70" r="6" fill="#fff"/><path ${S} d="M45 75q-15 25 0 50M30 60q-25 40 0 80M155 75q15 25 0 50M170 60q25 40 0 80"/>`,
  led: `<path ${S} d="M30 150h140M45 150v-80h110v80"/><path ${S} d="M60 85h80" stroke-dasharray="4 14"/><path ${S} d="M70 120l-15 30M100 120v30M130 120l15 30" opacity=".8"/><path ${S} d="M45 110h110"/>`,
  apartamento: `<rect ${S} x="45" y="25" width="110" height="150" rx="4"/><path ${S} d="M70 55h20M110 55h20M70 85h20M110 85h20M70 115h20M110 115h20M90 175v-30h20v30"/>`,
  homeoffice: `<rect ${S} x="45" y="30" width="110" height="70" rx="6"/><path ${S} d="M100 100v20M80 120h40M20 135h160M40 135v40M160 135v40"/><path ${S} d="M155 60l20-20M175 40l-5 20M175 40l-20 5"/>`,
};

// slug → [ícone, rótulo curto, texto alternativo]
const POSTS = {
  'o-que-sao-moveis-inteligentes': ['casa', 'Móveis inteligentes', 'Ilustração de uma casa conectada'],
  'moveis-inteligentes-para-apartamentos-pequenos': ['apartamento', 'Apartamentos pequenos', 'Ilustração de um prédio de apartamentos'],
  'como-escolher-mesa-com-regulagem-de-altura': ['mesa', 'Standing desk', 'Ilustração de mesa com regulagem de altura'],
  'cama-inteligente-vale-a-pena': ['camaArticulada', 'Cama inteligente', 'Ilustração de cama com base articulada'],
  'criado-mudo-com-carregador-sem-fio': ['criado', 'Carregador sem fio', 'Ilustração de criado-mudo com celular carregando'],
  'como-integrar-moveis-com-alexa-e-google': ['voz', 'Controle por voz', 'Ilustração de assistente de voz'],
  'sofa-reclinavel-eletrico-guia-de-compra': ['sofa', 'Sofá reclinável', 'Ilustração de sofá'],
  'moveis-inteligentes-para-home-office': ['homeoffice', 'Home office', 'Ilustração de mesa de trabalho com monitor'],
  'iluminacao-led-embutida-em-moveis': ['led', 'Iluminação LED', 'Ilustração de móvel com iluminação embutida'],
  'cama-retratil-guia-completo': ['camaRetratil', 'Cama retrátil', 'Ilustração de cama retrátil saindo do armário'],
  'mesa-de-jantar-extensivel-como-escolher': ['mesaJantar', 'Mesa extensível', 'Ilustração de mesa de jantar extensível'],
  'painel-de-tv-inteligente': ['tv', 'Painel de TV', 'Ilustração de painel com TV'],
  'moveis-inteligentes-para-cozinha': ['cozinha', 'Cozinha inteligente', 'Ilustração de armários de cozinha'],
  'moveis-inteligentes-quarto-infantil': ['infantil', 'Quarto infantil', 'Ilustração de berço'],
  'manutencao-de-moveis-inteligentes': ['ferramenta', 'Manutenção', 'Ilustração de chave de ferramenta'],
  'guarda-roupa-inteligente': ['guardaRoupa', 'Guarda-roupa', 'Ilustração de guarda-roupa'],
  'tomada-inteligente-para-moveis': ['tomada', 'Tomada inteligente', 'Ilustração de tomada conectada'],
  'espelho-inteligente-vale-a-pena': ['espelho', 'Espelho inteligente', 'Ilustração de espelho'],
  'moveis-inteligentes-para-idosos': ['poltrona', 'Conforto e segurança', 'Ilustração de poltrona'],
  'estante-modular-como-montar': ['estante', 'Estante modular', 'Ilustração de estante com nichos'],
  'planejar-eletrica-para-moveis-inteligentes': ['eletrica', 'Instalação elétrica', 'Ilustração de raio representando energia'],
  'poltrona-de-massagem-como-escolher': ['poltrona', 'Poltrona de massagem', 'Ilustração de poltrona'],
  'moveis-para-setup-gamer': ['gamer', 'Setup gamer', 'Ilustração de monitor e controle de videogame'],
  'moveis-inteligentes-para-banheiro': ['banheiro', 'Banheiro', 'Ilustração de gabinete de banheiro'],
  'cama-box-bau-como-escolher': ['camaBau', 'Cama box baú', 'Ilustração de cama baú aberta'],
  'varanda-gourmet-moveis-multifuncionais': ['varanda', 'Varanda gourmet', 'Ilustração de varanda com planta'],
  'moveis-planejados-ou-prontos': ['planejados', 'Planejados ou prontos', 'Ilustração de armário com medidas'],
  'erros-ao-comprar-moveis-inteligentes': ['checklist', 'Checklist de compra', 'Ilustração de checklist'],
  'hall-de-entrada-inteligente': ['hall', 'Hall de entrada', 'Ilustração de porta e sapateira'],
};

// Variações de verde para as capas não ficarem iguais
const PALETTES = [
  ['#14532d', '#16a34a'], ['#166534', '#22c55e'], ['#064e3b', '#059669'],
  ['#15803d', '#4ade80'], ['#065f46', '#10b981'], ['#1a4d2e', '#4f9d69'],
];

// Quebra rótulos longos em duas linhas para não encostar no ícone
const wrap = (s) => {
  if (s.length <= 13) return [s];
  const mid = s.lastIndexOf(' ', Math.ceil(s.length / 2) + 2);
  return mid > 0 ? [s.slice(0, mid), s.slice(mid + 1)] : [s];
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function svg(icon, label, category, i) {
  const [c1, c2] = PALETTES[i % PALETTES.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#fff" opacity=".08"/></pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <rect width="1600" height="900" fill="url(#dots)"/>
  <circle cx="1130" cy="450" r="330" fill="#fff" opacity=".08"/>
  <circle cx="1130" cy="450" r="250" fill="#fff" opacity=".07"/>
  <g transform="translate(910 230) scale(2.2)">${ICONS[icon]}</g>
  <rect x="120" y="300" width="${category.length * 19 + 56}" height="54" rx="27" fill="#fff" opacity=".18"/>
  <text x="148" y="337" font-family="Inter" font-size="28" font-weight="700" fill="#fff" letter-spacing="2">${esc(category.toUpperCase())}</text>
  <text x="120" y="460" font-family="Inter" font-size="84" font-weight="800" fill="#fff" letter-spacing="-2">${wrap(label).map((l, n) => `<tspan x="120" dy="${n ? 96 : 0}">${esc(l)}</tspan>`).join('')}</text>
  <g transform="translate(120 690)">
    <rect width="56" height="56" rx="14" fill="#fff"/>
    <path d="M14 29 28 17l14 12v13a2 2 0 0 1-2 2h-8v-9h-8v9h-8a2 2 0 0 1-2-2z" fill="${c1}"/>
    <text x="76" y="39" font-family="Inter" font-size="32" font-weight="700" fill="#fff">Casa Smart</text>
  </g>
</svg>`;
}

import { readFileSync } from 'node:fs';
let i = 0;
for (const [slug, [icon, label, alt]] of Object.entries(POSTS)) {
  const md = readFileSync(`src/content/blog/${slug}.mdx`, 'utf8');
  const category = md.match(/^category: '(.+)'$/m)?.[1] ?? 'Casa Smart';
  await sharp(Buffer.from(svg(icon, label, category, i++)))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/capa-${slug}.jpg`);
  console.log(JSON.stringify({ slug, alt }));
}
