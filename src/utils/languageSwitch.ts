export function getLanguageTargetUrl(lang: 'en' | 'vi'): string {
  const alternateUrl = document.body.dataset[lang === 'en' ? 'alternateEn' : 'alternateVi'];

  if (alternateUrl) {
    const targetUrl = new URL(alternateUrl, window.location.origin);
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      targetUrl.protocol = window.location.protocol;
      targetUrl.host = window.location.host;
    }

    return targetUrl.toString();
  }

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  return url.toString();
}

export function persistLocale(lang: 'en' | 'vi'): void {
  localStorage.setItem('locale', lang);
}
