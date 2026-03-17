import { CATEGORIES } from './categories';
import type { Locale } from './i18n';
import { getTopicInfo, type TopicSlug } from './topics';
import {
  getLocalizedBlogPostUrl,
  getLocalizedBlogUrl,
  getLocalizedCategoriesUrl,
  getLocalizedCategoryUrl,
  getLocalizedHomeUrl,
  getLocalizedTopicsUrl,
  getLocalizedTopicUrl,
  getLocalizedBooksUrl,
  getLocalizedBookUrl,
} from './routing';

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
  
  return [
    {
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: 'Blog',
      url: `${baseUrl}${getLocalizedBlogUrl(locale)}`,
      position: 2,
    },
    {
      name: categoryInfo.labels[locale],
      url: `${baseUrl}${getLocalizedCategoryUrl(locale, category)}`,
      position: 3,
    },
    {
      name: postTitle,
      url: `${baseUrl}${getLocalizedBlogPostUrl(locale, slug)}`,
      position: 4,
    },
  ];
}

/**
 * Generate breadcrumbs for books
 * Structure: Home > Books > Book Title
 */
export function generateBookBreadcrumbs(
  bookTitle: string,
  _category: 'tech' | 'fiction' | 'business' | 'self-help' | 'other',
  slug: string,
  baseUrl: string,
  locale: Locale
): BreadcrumbItem[] {
  return [
    {
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: locale === 'en' ? 'Books' : 'Sách',
      url: `${baseUrl}${getLocalizedBooksUrl(locale)}`,
      position: 2,
    },
    {
      name: bookTitle,
      url: `${baseUrl}${getLocalizedBookUrl(locale, slug)}`,
      position: 3,
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
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: locale === 'vi' ? 'Chủ đề' : 'Topics',
      url: `${baseUrl}${getLocalizedTopicsUrl(locale)}`,
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
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: locale === 'en' ? 'Categories' : 'Category',
      url: `${baseUrl}${getLocalizedCategoriesUrl(locale)}`,
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
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: locale === 'en' ? 'Categories' : 'Category',
      url: `${baseUrl}${getLocalizedCategoriesUrl(locale)}`,
      position: 2,
    },
    {
      name: categoryInfo.labels[locale],
      url: `${baseUrl}${getLocalizedCategoryUrl(locale, category)}`,
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
      name: locale === 'en' ? 'Home' : 'Trang chủ',
      url: `${baseUrl}${getLocalizedHomeUrl(locale)}`,
      position: 1,
    },
    {
      name: locale === 'vi' ? 'Chủ đề' : 'Topics',
      url: `${baseUrl}${getLocalizedTopicsUrl(locale)}`,
      position: 2,
    },
    {
      name: topic.name,
      url: `${baseUrl}${getLocalizedTopicUrl(locale, topicSlug)}`,
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
