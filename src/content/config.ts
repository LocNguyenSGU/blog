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
    showTOC: z.boolean().optional(), // Override auto TOC detection
  })
});

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverImage: z.string(),
    rating: z.number().min(1).max(5),
    startDate: z.date(),
    endDate: z.date(),
    category: z.enum(['tech', 'fiction', 'business', 'self-help', 'other']),
    review: z.string(),
    lang: z.enum(['en', 'vi']).default('vi'),
  })
});

export const collections = {
  blog: blogCollection,
  books: booksCollection
};
