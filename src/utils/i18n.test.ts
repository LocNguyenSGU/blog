import { describe, it, expect } from 'vitest';
import { getTranslation, t, defaultLocale, translations } from './i18n';

describe('i18n', () => {
  describe('defaultLocale', () => {
    it('should be vi', () => {
      expect(defaultLocale).toBe('vi');
    });
  });

  describe('translations', () => {
    it('should have same keys in both locales', () => {
      const enKeys = Object.keys(translations.en).sort();
      const viKeys = Object.keys(translations.vi).sort();
      expect(enKeys).toEqual(viKeys);
    });

    it('should have non-empty values for all keys in EN', () => {
      for (const [key, value] of Object.entries(translations.en)) {
        expect(value, `EN translation for "${key}" should not be empty`).toBeTruthy();
      }
    });

    it('should have non-empty values for all keys in VI', () => {
      for (const [key, value] of Object.entries(translations.vi)) {
        expect(value, `VI translation for "${key}" should not be empty`).toBeTruthy();
      }
    });
  });

  describe('getTranslation', () => {
    it('should return EN translation for nav.home', () => {
      expect(getTranslation('en', 'nav.home')).toBe('Home');
    });

    it('should return VI translation for nav.home', () => {
      expect(getTranslation('vi', 'nav.home')).toBe('Trang chủ');
    });

    it('should return the key itself if not found', () => {
      expect(getTranslation('en', 'nonexistent.key')).toBe('nonexistent.key');
    });
  });

  describe('t', () => {
    it('should use default locale (vi) when locale is omitted', () => {
      expect(t('nav.home')).toBe('Trang chủ');
    });

    it('should return EN translation when locale is specified', () => {
      expect(t('nav.home', 'en')).toBe('Home');
    });

    it('should fallback to key for missing translations', () => {
      expect(t('missing.key', 'en')).toBe('missing.key');
    });
  });
});
