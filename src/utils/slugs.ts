import type { Locale } from './i18n';

export function toPublicSlug(slug: string, locale?: Locale): string {
  if (locale) {
    const localePattern = new RegExp(`([.-]?)${locale}$`);
    return slug.replace(localePattern, '');
  }

  return slug.replace(/([.-]?)(en|vi)$/, '');
}
