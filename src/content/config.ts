import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    email: z.string().email().optional(), // Cambiado a optional para evitar fallos si falta en algún MD
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    layout: z.string().optional(), // Corregido: ya no exige formato URL
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Soporta tanto 'date' como 'pubDate' sin romper entradas antiguas
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(reference('tags')).optional().default([]),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
    description: z.string().optional(), // Añadido soporte para 'description'
    images: z.union([z.string(), z.array(z.string())]).optional(),
    authors: z.array(reference('authors')).optional().default([]),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    related: z.array(reference('blog')).optional().default([]),
  }).transform((data) => ({
    ...data,
    // Garantiza que siempre exista 'date' usando pubDate o la fecha actual como fallback
    date: data.date || data.pubDate || new Date(),
    summary: data.summary || data.description || '',
  })),
});

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, authors, tags };
