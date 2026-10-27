import { getCollection } from 'astro:content';

// Posts visíveis no site: não são rascunho e a data de publicação já chegou.
// Posts com data futura ficam guardados e aparecem na primeira atualização do site a partir daquele dia
// (o GitHub Actions dispara uma atualização diária — veja .github/workflows/publicacao-diaria.yml).
export async function getPublishedPosts() {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= now);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
