import type { Locale } from './i18n';
import { toPublicSlug } from './slugs';

export const SUPPORTED_LOCALES: Locale[] = ['vi', 'en'];

export function isLocale(value: unknown): value is Locale {
  return value === 'vi' || value === 'en';
}

export function withLocale(locale: Locale, path = '/'): string {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function toAbsoluteUrl(siteUrl: string, path: string): string {
  return new URL(path, siteUrl).toString();
}

export function getLocalizedHomeUrl(locale: Locale): string {
  return withLocale(locale);
}

export function getLocalizedAboutUrl(locale: Locale): string {
  return withLocale(locale, '/about');
}

export function getLocalizedBlogUrl(locale: Locale): string {
  return withLocale(locale, '/blog');
}

export function getLocalizedBlogPostUrl(locale: Locale, slug: string): string {
  return withLocale(locale, `/blog/${toPublicSlug(slug, locale)}`);
}

export function getLocalizedBooksUrl(locale: Locale): string {
  return withLocale(locale, '/books');
}

export function getLocalizedBookUrl(locale: Locale, slug: string): string {
  return withLocale(locale, `/books/${toPublicSlug(slug, locale)}`);
}

export function getLocalizedCategoriesUrl(locale: Locale): string {
  return withLocale(locale, '/categories');
}

export function getLocalizedCategoryUrl(locale: Locale, slug: string): string {
  return withLocale(locale, `/categories/${slug}`);
}

export function getLocalizedTopicsUrl(locale: Locale): string {
  return withLocale(locale, '/topics');
}

export function getLocalizedTopicUrl(locale: Locale, slug: string): string {
  return withLocale(locale, `/topics/${slug}`);
}

export function getAlternateLocaleUrls(
  pathByLocale: Partial<Record<Locale, string>>
): { vi?: string; en?: string; default?: string } {
  return {
    vi: pathByLocale.vi,
    en: pathByLocale.en,
    default: pathByLocale.vi ?? pathByLocale.en,
  };
}
