import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    author: z.string().default('Anonymous'),
    category: z.enum(['programming', 'lifestyle', 'personal']),
    tags: z.array(z.string()).optional(),
    coverImage: z.string(),
    coverAlt: z.string().default('Cover image'),
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'vi']).default('vi'),
    translationKey: z.string().optional(), // Link EN/VI versions
  })
});

export const collections = {
  blog: blogCollection
};
