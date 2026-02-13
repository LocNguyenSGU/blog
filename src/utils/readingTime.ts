/**
 * Calculate reading time for blog post content
 * @param content - The markdown/text content
 * @returns Reading time in minutes
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @param locale - Language locale ('vi' or 'en')
 * @returns Formatted string like "5 phút đọc" or "5 min read"
 */
export function formatReadingTime(minutes: number, locale: string = 'vi'): string {
  if (locale === 'vi') {
    return `${minutes} phút đọc`;
  }
  return `${minutes} min read`;
}
