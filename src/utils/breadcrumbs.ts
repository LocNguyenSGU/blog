import { CATEGORIES } from './categories';

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
  baseUrl: string
): BreadcrumbItem[] {
  const categoryInfo = CATEGORIES[category];
  
  return [
    {
      name: 'Home',
      url: baseUrl,
      position: 1,
    },
    {
      name: 'Blog',
      url: `${baseUrl}/blog`,
      position: 2,
    },
    {
      name: categoryInfo.name,
      url: `${baseUrl}/blog?category=${category}`,
      position: 3,
    },
    {
      name: postTitle,
      url: `${baseUrl}/blog/${slug}`,
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
