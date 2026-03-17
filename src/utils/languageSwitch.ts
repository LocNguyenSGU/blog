export function getLanguageTargetUrl(lang: 'en' | 'vi'): string {
  const alternateUrl = document.body.dataset[lang === 'en' ? 'alternateEn' : 'alternateVi'];

  if (alternateUrl) {
    return alternateUrl;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  return url.toString();
}

export function persistLocale(lang: 'en' | 'vi'): void {
  localStorage.setItem('locale', lang);
}
