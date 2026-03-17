import type { GetStaticPathsItem } from 'astro';
import type { Locale } from './i18n';
import { SUPPORTED_LOCALES, getAlternateLocaleUrls, getLocalizedAboutUrl, getLocalizedBlogPostUrl, getLocalizedBlogUrl, getLocalizedBookUrl, getLocalizedBooksUrl, getLocalizedCategoriesUrl, getLocalizedCategoryUrl, getLocalizedHomeUrl, getLocalizedTopicUrl, getLocalizedTopicsUrl, toAbsoluteUrl } from './routing';

export function getLocaleStaticPaths(): GetStaticPathsItem[] {
  return SUPPORTED_LOCALES.map((locale) => ({ params: { locale } }));
}

export function getLocalizedPagePath(locale: Locale, page: 'home' | 'about' | 'blog' | 'books' | 'categories' | 'topics'): string {
  switch (page) {
    case 'home':
      return getLocalizedHomeUrl(locale);
    case 'about':
      return getLocalizedAboutUrl(locale);
    case 'blog':
      return getLocalizedBlogUrl(locale);
    case 'books':
      return getLocalizedBooksUrl(locale);
    case 'categories':
      return getLocalizedCategoriesUrl(locale);
    case 'topics':
      return getLocalizedTopicsUrl(locale);
  }
}

export function getLocalizedPageAlternates(siteUrl: string, page: 'home' | 'about' | 'blog' | 'books' | 'categories' | 'topics') {
  return getAlternateLocaleUrls({
    vi: toAbsoluteUrl(siteUrl, getLocalizedPagePath('vi', page)),
    en: toAbsoluteUrl(siteUrl, getLocalizedPagePath('en', page)),
  });
}

export function getLocalizedPostAlternates(siteUrl: string, slugByLocale: Partial<Record<Locale, string>>) {
  return getAlternateLocaleUrls({
    vi: slugByLocale.vi ? toAbsoluteUrl(siteUrl, getLocalizedBlogPostUrl('vi', slugByLocale.vi)) : undefined,
    en: slugByLocale.en ? toAbsoluteUrl(siteUrl, getLocalizedBlogPostUrl('en', slugByLocale.en)) : undefined,
  });
}

export function getLocalizedBookAlternates(siteUrl: string, slugByLocale: Partial<Record<Locale, string>>) {
  return getAlternateLocaleUrls({
    vi: slugByLocale.vi ? toAbsoluteUrl(siteUrl, getLocalizedBookUrl('vi', slugByLocale.vi)) : undefined,
    en: slugByLocale.en ? toAbsoluteUrl(siteUrl, getLocalizedBookUrl('en', slugByLocale.en)) : undefined,
  });
}

export function getLocalizedCategoryAlternates(siteUrl: string, slug: string) {
  return getAlternateLocaleUrls({
    vi: toAbsoluteUrl(siteUrl, getLocalizedCategoryUrl('vi', slug)),
    en: toAbsoluteUrl(siteUrl, getLocalizedCategoryUrl('en', slug)),
  });
}

export function getLocalizedTopicAlternates(siteUrl: string, slug: string) {
  return getAlternateLocaleUrls({
    vi: toAbsoluteUrl(siteUrl, getLocalizedTopicUrl('vi', slug)),
    en: toAbsoluteUrl(siteUrl, getLocalizedTopicUrl('en', slug)),
  });
}
