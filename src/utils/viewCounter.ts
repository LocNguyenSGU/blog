/**
 * Get view count for a specific post slug
 * @param slug - Post slug identifier
 * @returns View count number
 */
export function getViewCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  const key = `post-views-${slug}`;
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : 0;
}

/**
 * Increment view count for a post
 * @param slug - Post slug identifier
 * @returns New view count
 */
export function incrementViewCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  const currentCount = getViewCount(slug);
  const newCount = currentCount + 1;
  const key = `post-views-${slug}`;
  localStorage.setItem(key, newCount.toString());
  return newCount;
}

/**
 * Format view count for display
 * @param count - View count number
 * @returns Formatted string like "1.2k views" or "45 views"
 */
import type { Locale } from './i18n';

export function formatViewCount(count: number, locale: Locale = 'en'): string {
  const suffix = locale === 'vi' ? 'lượt xem' : 'views';

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k ${suffix}`;
  }
  return `${count} ${suffix}`;
}
