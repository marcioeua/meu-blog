# Blog Astro + Google AdSense

Estrutura básica de blog estático com Astro, otimizado para SEO e pronto para monetizar com AdSense.

## Comandos

| Comando           | Ação                                   |
| ----------------- | -------------------------------------- |
| `npm install`     | Instala as dependências                |
| `npm run dev`     | Servidor local em `localhost:4321`     |
| `npm run build`   | Gera o site estático em `./dist/`      |
| `npm run preview` | Visualiza o build localmente           |

## Primeiros passos

1. **`astro.config.mjs`** → troque `site` pelo seu domínio.
2. **`src/config.ts`** → nome do site, autor, e-mail e IDs do AdSense.
3. Revise **Sobre**, **Contato**, **Política de Privacidade** e **Termos de Uso** em `src/pages/`.
4. Escreva posts em `src/content/blog/` (`.md` ou `.mdx`).

## AdSense

- Preencha `ADSENSE.client` (`ca-pub-...`) em `src/config.ts`. Isso ativa automaticamente:
  - o script do AdSense e a meta `google-adsense-account` (verificação do site)
  - o arquivo `/ads.txt`
- Crie blocos de anúncio no painel e preencha `ADSENSE.slots`.
- Use `<AdUnit position="inArticle" />` em posts `.mdx` para anúncios no meio do texto.
- Em `npm run dev`, blocos não configurados aparecem como placeholders tracejados.
- Se preferir **anúncios automáticos**, basta preencher o `client` e ativar no painel — os slots são opcionais.

## Estrutura

```
src/
├── config.ts              # configurações do site e AdSense
├── content.config.ts      # schema dos posts
├── content/blog/          # posts em Markdown/MDX
├── components/            # Header, Footer, AdUnit, BaseHead (SEO), CookieBanner...
├── layouts/               # BaseLayout, PostLayout, PageLayout
├── pages/                 # rotas (home, blog, páginas institucionais, rss, robots, ads.txt)
└── styles/global.css      # variáveis de cor e estilos base (tema claro/escuro)
```

## Checklist para aprovação no AdSense

- [ ] Domínio próprio configurado
- [ ] 15–30 artigos originais e úteis
- [ ] Páginas Sobre, Contato e Política de Privacidade preenchidas
- [ ] Site indexado no Google Search Console (envie o `sitemap-index.xml`)
- [ ] Navegação clara e funcionando no celular

## Deploy na Vercel

O projeto já vem com `vercel.json` (URLs com barra final e cache longo para `/_astro/*`).

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. O framework Astro é detectado automaticamente; não precisa mudar nada.
3. Depois do primeiro deploy, adicione seu domínio em **Settings → Domains** e atualize `site` em `astro.config.mjs`.
4. A cada `git push` na branch `main`, a Vercel publica uma nova versão; outras branches geram URLs de preview.

## Fotos nos posts

Coloque as fotos em `src/content/blog/imagens/` (JPG ou PNG, de preferência com 1600px de largura ou mais).
O Astro converte para WebP e gera vários tamanhos automaticamente.

- **Capa do post** (frontmatter):
  ```yaml
  heroImage: './imagens/criado-mudo-quarto.jpg'
  heroAlt: 'Criado-mudo de madeira com celular carregando sem fio'
  ```
- **Foto no meio do texto** (Markdown/MDX):
  ```md
  ![Descrição da foto](./imagens/minha-foto.jpg)
  ```

Use nomes de arquivo descritivos e sempre preencha o texto alternativo (`heroAlt` / descrição) — isso ajuda no SEO e na acessibilidade.
