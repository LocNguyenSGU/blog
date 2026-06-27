import { describe, it, expect } from 'vitest';
import { formatViewCount } from './viewCounter';

describe('formatViewCount', () => {
  it('should format small counts in English', () => {
    expect(formatViewCount(42, 'en')).toBe('42 views');
  });

  it('should format small counts in Vietnamese', () => {
    expect(formatViewCount(42, 'vi')).toBe('42 lượt xem');
  });

  it('should format thousands in English', () => {
    expect(formatViewCount(1200, 'en')).toBe('1.2k views');
  });

  it('should format thousands in Vietnamese', () => {
    expect(formatViewCount(1200, 'vi')).toBe('1.2k lượt xem');
  });

  it('should handle 0', () => {
    expect(formatViewCount(0, 'en')).toBe('0 views');
  });

  it('should default to English locale', () => {
    expect(formatViewCount(5)).toBe('5 views');
  });
});
