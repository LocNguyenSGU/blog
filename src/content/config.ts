import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    author: z.string().default('Anonymous'),
    category: z.enum(['programming', 'lifestyle', 'personal']),
    tags: z.array(z.string()).optional(),
    coverImage: image(),
    coverAlt: z.string().default('Cover image'),
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'vi']).default('vi'),
    translationKey: z.string().optional(), // Link EN/VI versions
    showTOC: z.boolean().optional(), // Override auto TOC detection
  })
});

const booksCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string(),
    coverImage: image(),
    rating: z.number().min(1).max(5),
    startDate: z.date(),
    endDate: z.date(),
    addedDate: z.date(), // When book was added to collection
    category: z.enum(['tech', 'fiction', 'business', 'self-help', 'other']),
    review: z.string(),
    lang: z.enum(['en', 'vi']).default('vi'),
  })
});

export const collections = {
  blog: blogCollection,
  books: booksCollection
};
