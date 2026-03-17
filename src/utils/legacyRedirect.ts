import { defaultLocale, type Locale } from './i18n';

export function getLegacyLocaleFromUrl(url: URL): Locale {
  const lang = url.searchParams.get('lang');
  return lang === 'en' || lang === 'vi' ? lang : defaultLocale;
}

export function buildLegacyRedirectUrl(
  currentUrl: URL,
  pathname: string,
  options?: {
    preserveKeys?: string[];
  }
): string {
  const targetUrl = new URL(pathname, currentUrl.origin);
  const preserveKeys = options?.preserveKeys;

  for (const [key, value] of currentUrl.searchParams.entries()) {
    if (key === 'lang') continue;
    if (preserveKeys && !preserveKeys.includes(key)) continue;
    targetUrl.searchParams.append(key, value);
  }

  return `${targetUrl.pathname}${targetUrl.search}`;
}
