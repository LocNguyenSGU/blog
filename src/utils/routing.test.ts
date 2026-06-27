import { describe, it, expect } from 'vitest';
import { isLocale, withLocale, SUPPORTED_LOCALES } from './routing';

describe('routing', () => {
  describe('SUPPORTED_LOCALES', () => {
    it('should include vi and en', () => {
      expect(SUPPORTED_LOCALES).toContain('vi');
      expect(SUPPORTED_LOCALES).toContain('en');
      expect(SUPPORTED_LOCALES).toHaveLength(2);
    });
  });

  describe('isLocale', () => {
    it('should return true for vi and en', () => {
      expect(isLocale('vi')).toBe(true);
      expect(isLocale('en')).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isLocale('fr')).toBe(false);
      expect(isLocale('')).toBe(false);
      expect(isLocale(null)).toBe(false);
      expect(isLocale(undefined)).toBe(false);
    });
  });

  describe('withLocale', () => {
    it('should prefix locale to root path', () => {
      expect(withLocale('vi')).toBe('/vi');
      expect(withLocale('en')).toBe('/en');
    });

    it('should prefix locale to subpath', () => {
      expect(withLocale('vi', '/blog')).toBe('/vi/blog');
      expect(withLocale('en', '/about')).toBe('/en/about');
    });

    it('should handle paths without leading slash', () => {
      expect(withLocale('vi', 'blog')).toBe('/vi/blog');
    });
  });
});
