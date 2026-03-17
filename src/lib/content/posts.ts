import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/utils/i18n';
import { TOPICS, getTopicPillarPost, type TopicSlug } from '@/utils/topics';
import { CATEGORIES, type CategoryKey } from '@/utils/categories';
import { toPublicSlug } from '@/utils/slugs';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getAllBlogPosts(): Promise<BlogEntry[]> {
  return getCollection('blog');
}

export async function getPublishedPosts(locale: Locale): Promise<BlogEntry[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.lang === locale);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostBySlug(slug: string, locale?: Locale): Promise<BlogEntry | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => {
    if (locale && post.data.lang !== locale) return false;
    return toPublicSlug(post.slug, post.data.lang) === toPublicSlug(slug, locale ?? post.data.lang);
  });
}

export async function getPostsByCategory(
  locale: Locale,
  category: CategoryKey
): Promise<BlogEntry[]> {
  const posts = await getPublishedPosts(locale);
  return posts.filter((post) => post.data.category === category);
}

export async function getPostsByTopic(
  locale: Locale,
  topic: TopicSlug
): Promise<BlogEntry[]> {
  const posts = await getPublishedPosts(locale);
  const translationKeys = new Set(TOPICS[topic].translationKeys);

  return posts.filter(
    (post) => !!post.data.translationKey && translationKeys.has(post.data.translationKey)
  );
}

export function getCategoryCounts(posts: BlogEntry[]): Array<{ slug: CategoryKey; count: number }> {
  return (Object.keys(CATEGORIES) as CategoryKey[]).map((slug) => ({
    slug,
    count: posts.filter((post) => post.data.category === slug).length,
  }));
}

export function getTopicCounts(posts: BlogEntry[]): Array<{ slug: TopicSlug; count: number }> {
  return (Object.keys(TOPICS) as TopicSlug[]).map((slug) => ({
    slug,
    count: posts.filter(
      (post) => !!post.data.translationKey && TOPICS[slug].translationKeys.includes(post.data.translationKey)
    ).length,
  }));
}

export function getPillarTopics(
  allPosts: BlogEntry[],
  locale: Locale
): Array<{ slug: TopicSlug; post: BlogEntry }> {
  return (Object.keys(TOPICS) as TopicSlug[])
    .map((slug) => ({
      slug,
      post: getTopicPillarPost(allPosts, slug, locale),
    }))
    .filter((entry): entry is { slug: TopicSlug; post: BlogEntry } => !!entry.post);
}
