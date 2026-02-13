import type { CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

/**
 * Generate the full URL path for a blog post with language parameter
 */
export function getPostUrl(post: CollectionEntry<'blog'>): string {
  return `/blog/${post.slug}?lang=${post.data.lang}`;
}

/**
 * Find the translated version of a post
 * @param post - Current post
 * @param targetLang - Target language to find
 * @param allPosts - All blog posts collection
 * @returns Translated post or undefined if not found
 */
export function findTranslation(
  post: CollectionEntry<'blog'>,
  targetLang: Locale,
  allPosts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'> | undefined {
  if (!post.data.translationKey) {
    return undefined;
  }
  
  return allPosts.find(
    p => p.data.translationKey === post.data.translationKey && 
         p.data.lang === targetLang
  );
}

/**
 * Format a date according to locale
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
): string {
  const localeString = locale === 'vi' ? 'vi-VN' : 'en-US';
  return date.toLocaleDateString(localeString, options);
}
