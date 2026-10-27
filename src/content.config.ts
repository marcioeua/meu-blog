import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('Geral'),
    tags: z.array(z.string()).default([]),
    // Foto de capa: caminho relativo ao post, ex: './imagens/minha-foto.jpg'
    heroImage: image().optional(),
    heroAlt: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
