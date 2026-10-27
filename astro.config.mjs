// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// URL final do site (usada no sitemap, canonical e RSS). Troque ao configurar um domínio próprio.
export default defineConfig({
  site: 'https://meu-blog.vercel.app',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
