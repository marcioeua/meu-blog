// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO: troque pela URL final do seu domínio (necessário para sitemap, canonical e RSS)
export default defineConfig({
  site: 'https://www.seudominio.com.br',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
