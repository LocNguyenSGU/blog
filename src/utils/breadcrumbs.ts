import { CATEGORIES } from './categories';
import type { Locale } from './i18n';
import { getTopicInfo, type TopicSlug } from './topics';

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate breadcrumbs for blog posts
 * Structure: Home > Blog > Category > Post Title
 */
export function generateBlogBreadcrumbs(
  postTitle: string,
  category: 'programming' | 'lifestyle' | 'personal',
  slug: string,
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  const categoryInfo = CATEGORIES[category];
  const localeQuery = locale === 'en' ? '?lang=en' : '?lang=vi';
  
  return [
    {
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${locale === 'en' ? '?lang=en' : ''}`,
      position: 1,
    },
    {
      name: 'Blog',
      url: `${baseUrl}/blog${localeQuery}`,
      position: 2,
    },
    {
      name: categoryInfo.labels[locale],
      url: `${baseUrl}/categories/${category}${localeQuery}`,
      position: 3,
    },
    {
      name: postTitle,
      url: `${baseUrl}/blog/${slug}${localeQuery}`,
      position: 4,
    },
  ];
}

/**
 * Books categories mapping (similar to blog categories)
 */
const BOOK_CATEGORIES = {
  'tech': 'Technology',
  'fiction': 'Fiction',
  'business': 'Business',
  'self-help': 'Self Help',
  'other': 'Other',
} as const;

/**
 * Generate breadcrumbs for books
 * Structure: Home > Books > Category > Book Title
 */
export function generateBookBreadcrumbs(
  bookTitle: string,
  category: 'tech' | 'fiction' | 'business' | 'self-help' | 'other',
  slug: string,
  baseUrl: string
): BreadcrumbItem[] {
  const categoryName = BOOK_CATEGORIES[category];
  
  return [
    {
      name: 'Home',
      url: baseUrl,
      position: 1,
    },
    {
      name: 'Books',
      url: `${baseUrl}/books`,
      position: 2,
    },
    {
      name: categoryName,
      url: `${baseUrl}/books?category=${category}`,
      position: 3,
    },
    {
      name: bookTitle,
      url: `${baseUrl}/books/${slug}`,
      position: 4,
    },
  ];
}

/**
 * Generate breadcrumbs for topic hub index
 * Structure: Home > Topics
 */
export function generateTopicsBreadcrumbs(
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  return [
    {
      name: 'Home',
      url: `${baseUrl}${locale === 'en' ? '?lang=en' : ''}`,
      position: 1,
    },
    {
      name: locale === 'vi' ? 'Chủ đề' : 'Topics',
      url: `${baseUrl}/topics${locale === 'en' ? '?lang=en' : ''}`,
      position: 2,
    },
  ];
}

export function generateCategoriesBreadcrumbs(
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  return [
    {
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${locale === 'en' ? '?lang=en' : ''}`,
      position: 1,
    },
    {
      name: locale === 'en' ? 'Categories' : 'Category',
      url: `${baseUrl}/categories${locale === 'en' ? '?lang=en' : ''}`,
      position: 2,
    },
  ];
}

export function generateCategoryBreadcrumbs(
  category: 'programming' | 'lifestyle' | 'personal',
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  const categoryInfo = CATEGORIES[category];

  return [
    {
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${locale === 'en' ? '?lang=en' : ''}`,
      position: 1,
    },
    {
      name: locale === 'en' ? 'Categories' : 'Category',
      url: `${baseUrl}/categories${locale === 'en' ? '?lang=en' : ''}`,
      position: 2,
    },
    {
      name: categoryInfo.labels[locale],
      url: `${baseUrl}/categories/${category}${locale === 'en' ? '?lang=en' : '?lang=vi'}`,
      position: 3,
    },
  ];
}

/**
 * Generate breadcrumbs for a topic hub page
 * Structure: Home > Topics > Topic
 */
export function generateTopicBreadcrumbs(
  topicSlug: TopicSlug,
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  const topic = getTopicInfo(topicSlug, locale);

  return [
    {
      name: 'Home',
      url: `${baseUrl}${locale === 'en' ? '?lang=en' : ''}`,
      position: 1,
    },
    {
      name: locale === 'vi' ? 'Chủ đề' : 'Topics',
      url: `${baseUrl}/topics${locale === 'en' ? '?lang=en' : ''}`,
      position: 2,
    },
    {
      name: topic.name,
      url: `${baseUrl}/topics/${topicSlug}${locale === 'en' ? '?lang=en' : ''}`,
      position: 3,
    },
  ];
}

/**
 * Convert breadcrumb items to JSON-LD BreadcrumbList schema
 */
export function breadcrumbsToJsonLd(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };
}
