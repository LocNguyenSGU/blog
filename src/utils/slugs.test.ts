import { describe, it, expect } from 'vitest';
import { toPublicSlug } from './slugs';

describe('toPublicSlug', () => {
  it('should strip locale suffix from slug', () => {
    expect(toPublicSlug('building-blog-with-ai.vi', 'vi')).toBe('building-blog-with-ai');
    expect(toPublicSlug('building-blog-with-ai.en', 'en')).toBe('building-blog-with-ai');
  });

  it('should strip locale suffix without locale param', () => {
    expect(toPublicSlug('building-blog-with-ai.vi')).toBe('building-blog-with-ai');
    expect(toPublicSlug('building-blog-with-ai.en')).toBe('building-blog-with-ai');
  });

  it('should handle hyphen-separated locale suffix', () => {
    expect(toPublicSlug('my-post-vi', 'vi')).toBe('my-post');
    expect(toPublicSlug('my-post-en', 'en')).toBe('my-post');
  });

  it('should return slug unchanged if no locale suffix', () => {
    expect(toPublicSlug('my-post', 'vi')).toBe('my-post');
    expect(toPublicSlug('my-post', 'en')).toBe('my-post');
  });

  it('should handle empty string', () => {
    expect(toPublicSlug('')).toBe('');
  });
});
