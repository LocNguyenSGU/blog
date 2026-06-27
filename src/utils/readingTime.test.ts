import { describe, it, expect } from 'vitest';
import { getReadingTime, formatReadingTime } from './readingTime';

describe('getReadingTime', () => {
  it('should return 1 for empty content (edge case)', () => {
    expect(getReadingTime('')).toBe(1);
  });

  it('should return 1 for short content (< 200 words)', () => {
    const content = 'word '.repeat(50);
    expect(getReadingTime(content)).toBe(1);
  });

  it('should return 2 for ~400 words', () => {
    const content = 'word '.repeat(380);
    expect(getReadingTime(content)).toBe(2);
  });

  it('should return 5 for ~1000 words', () => {
    const content = 'word '.repeat(1000);
    expect(getReadingTime(content)).toBe(5);
  });

  it('should round up (ceil)', () => {
    const content = 'word '.repeat(201); // 201 words -> ceil(201/200) = 2
    expect(getReadingTime(content)).toBe(2);
  });
});

describe('formatReadingTime', () => {
  it('should format in Vietnamese', () => {
    expect(formatReadingTime(5, 'vi')).toBe('5 phút đọc');
  });

  it('should format in English', () => {
    expect(formatReadingTime(5, 'en')).toBe('5 min read');
  });

  it('should default to Vietnamese when no locale', () => {
    expect(formatReadingTime(3)).toBe('3 phút đọc');
  });

  it('should handle 1 minute', () => {
    expect(formatReadingTime(1, 'en')).toBe('1 min read');
    expect(formatReadingTime(1, 'vi')).toBe('1 phút đọc');
  });
});
