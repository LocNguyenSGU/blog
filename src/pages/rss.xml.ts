import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const site = context.site?.toString() ?? 'https://devjournal.fun';

  return rss({
    title: 'Loc Nguyen Blog',
    description: 'Blog cá nhân về lập trình, AI, công việc và phát triển bản thân.',
    site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description ?? '',
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}?lang=${post.data.lang}`,
      })),
    customData: `<language>vi-VN</language>`,
  });
}
