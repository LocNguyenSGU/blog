# Books Collection Feature Design

**Date:** 2026-02-13  
**Status:** Approved  
**Goal:** Add books collection to display 25 books read with reviews and ratings

---

## Overview

Create a dedicated `/books` page to showcase books read, with detailed information including ratings, read dates, categories, and short reviews. Uses Astro Content Collections for easy management.

---

## Architecture

### Content Collection Schema

**Location:** `src/content/config.ts`

```typescript
const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    coverImage: z.string(), // URL or path to cover image
    rating: z.number().min(1).max(5), // 1-5 stars
    startDate: z.date(), // When started reading
    endDate: z.date(), // When finished reading
    category: z.enum(['tech', 'fiction', 'business', 'self-help', 'other']),
    review: z.string(), // Short review (1-2 sentences)
    lang: z.enum(['en', 'vi']).default('vi'),
  })
});

export const collections = {
  blog: blogCollection,
  books: booksCollection
};
```

### File Structure

```
src/content/books/
  atomic-habits.md
  clean-code.md
  sapiens.md
  ... (25 total book files)
```

**Example Book File:**
```markdown
---
title: "Atomic Habits"
author: "James Clear"
coverImage: "/images/books/atomic-habits.jpg"
rating: 5
startDate: 2025-01-01
endDate: 2025-01-15
category: "self-help"
review: "Powerful framework for building good habits. Small changes compound over time."
lang: "vi"
---

Optional long-form review here in markdown format...
Can include detailed notes, key takeaways, favorite quotes, etc.
```

---

## Components

### 1. BookCard.astro

**Purpose:** Display individual book in grid layout

**Props:**
```typescript
interface Props {
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  startDate: Date;
  endDate: Date;
  category: string;
  review: string;
  lang: 'vi' | 'en';
}
```

**Layout Structure:**
```astro
<article class="group bg-white dark:bg-gray-800 sepia:bg-sepia-50 rounded-xl border border-gray-200 dark:border-gray-700 sepia:border-sepia-300 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  
  {/* Cover Image - 2:3 aspect ratio for book covers */}
  <div class="aspect-[2/3] overflow-hidden">
    <img 
      src={coverImage} 
      alt={title}
      class="w-full h-full object-cover"
    />
  </div>
  
  {/* Content */}
  <div class="p-4 space-y-2">
    {/* Category Badge */}
    <CategoryBadge category={category} />
    
    {/* Title */}
    <h3 class="font-sans font-bold text-lg line-clamp-2">
      {title}
    </h3>
    
    {/* Author */}
    <p class="text-sm text-gray-600 dark:text-gray-400 sepia:text-sepia-700">
      {author}
    </p>
    
    {/* Star Rating */}
    <StarRating rating={rating} />
    
    {/* Short Review */}
    <p class="text-sm text-gray-600 dark:text-gray-400 sepia:text-sepia-700 line-clamp-3">
      {review}
    </p>
    
    {/* Read Dates */}
    <p class="text-xs text-gray-500 dark:text-gray-500 sepia:text-sepia-600">
      {formatReadPeriod(startDate, endDate, lang)}
    </p>
  </div>
</article>
```

**Styling:**
- Similar hover effects to PostCard
- Dark/Sepia mode support
- Responsive padding
- Category badge reuses CategoryBadge component

### 2. StarRating.astro

**Purpose:** Reusable star rating display component

**Props:**
```typescript
interface Props {
  rating: number; // 1-5
}
```

**Implementation:**
```astro
<div class="flex items-center gap-1">
  {Array.from({ length: 5 }, (_, i) => (
    <svg 
      class={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))}
</div>
```

---

## Pages

### books.astro

**Location:** `src/pages/books.astro`

**Structure:** Similar to `blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import BookCard from '../components/BookCard.astro';

const locale = /* get from URL param */;

const allBooks = await getCollection('books');
const books = allBooks
  .filter(book => book.data.lang === locale)
  .sort((a, b) => b.data.endDate.valueOf() - a.data.endDate.valueOf());
---

<BaseLayout title="Books" locale={locale}>
  {/* Hero Section */}
  <section class="text-center space-y-4 py-12">
    <h1 class="text-5xl font-bold">{t('books.title', locale)}</h1>
    <p class="text-xl text-gray-600">
      {t('books.subtitle', locale)}
    </p>
  </section>

  {/* Books Grid */}
  <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {books.map(book => (
      <BookCard {...book.data} />
    ))}
  </section>
</BaseLayout>
```

**Features:**
- Bilingual support (lang URL param)
- Sort by endDate (newest finished first)
- 3 column grid desktop, 1 column mobile
- Responsive gap and padding

---

## Navigation Updates

### BaseLayout.astro

Add "Books" link to main navigation:

```astro
<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/books">Books</a>
  <a href="/about">About</a>
</nav>
```

---

## i18n Translations

**Add to `src/utils/i18n.ts`:**

```typescript
books: {
  title: {
    vi: 'Sách Tôi Đã Đọc',
    en: 'Books I\'ve Read'
  },
  subtitle: {
    vi: '25 cuốn sách đã hoàn thành',
    en: '25 books completed'
  },
  readPeriod: {
    vi: 'Đọc từ',
    en: 'Read from'
  },
  to: {
    vi: 'đến',
    en: 'to'
  },
  categories: {
    tech: { vi: 'Công nghệ', en: 'Technology' },
    fiction: { vi: 'Tiểu thuyết', en: 'Fiction' },
    business: { vi: 'Kinh doanh', en: 'Business' },
    'self-help': { vi: 'Phát triển bản thân', en: 'Self-Help' },
    other: { vi: 'Khác', en: 'Other' }
  }
}
```

**Utility function for read period:**
```typescript
export function formatReadPeriod(start: Date, end: Date, locale: Locale): string {
  const formatDate = (date: Date) => date.toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    { month: 'short', year: 'numeric' }
  );
  
  const from = t('books.readPeriod', locale);
  const to = t('books.to', locale);
  
  return `${from} ${formatDate(start)} ${to} ${formatDate(end)}`;
}
```

---

## Responsive Design

### Desktop (≥768px)
- 3 column grid
- Hover effects on cards
- Larger cover images

### Mobile (<768px)
- 1 column grid
- Stacked layout
- Touch-friendly card spacing

---

## Cover Images

**Storage:** `public/images/books/`

**Format:** JPG or WebP recommended

**Size:** 
- Width: 300-400px
- Aspect ratio: 2:3 (standard book cover)
- Optimized for web (<100KB per image)

**Naming:** Use slug format: `atomic-habits.jpg`, `clean-code.jpg`

---

## CategoryBadge Reuse

Extend existing `CategoryBadge.astro` to support book categories:

```typescript
type Category = 
  // Blog categories
  | 'programming' | 'lifestyle' | 'personal'
  // Book categories  
  | 'tech' | 'fiction' | 'business' | 'self-help' | 'other';
```

Add color mappings for new categories.

---

## Implementation Checklist

### Phase 1: Schema & Content Structure
- [ ] Update `src/content/config.ts` - Add books collection schema
- [ ] Create `src/content/books/` directory
- [ ] Create 25 book markdown files with frontmatter
- [ ] Add cover images to `public/images/books/`

### Phase 2: Components
- [ ] Create `src/components/StarRating.astro`
- [ ] Create `src/components/BookCard.astro`
- [ ] Update `src/components/CategoryBadge.astro` for book categories

### Phase 3: Pages & Navigation
- [ ] Create `src/pages/books.astro`
- [ ] Update navigation in BaseLayout.astro
- [ ] Add i18n translations to `src/utils/i18n.ts`
- [ ] Add `formatReadPeriod()` utility function

### Phase 4: Styling & Polish
- [ ] Test dark mode support
- [ ] Test sepia mode support
- [ ] Verify responsive layout
- [ ] Test bilingual switching

### Phase 5: Testing
- [ ] Build succeeds without errors
- [ ] All 25 books display correctly
- [ ] Star ratings render properly
- [ ] Cover images load correctly
- [ ] Read dates format correctly for both languages
- [ ] Category badges work for book categories

---

## Edge Cases

1. **Missing cover image** → Use placeholder image
2. **Long book titles** → line-clamp-2 prevents overflow
3. **Long reviews** → line-clamp-3 keeps cards consistent height
4. **No books found** → Show empty state message
5. **Date formatting edge cases** → Handle same-month reads (Jan 2025 - Jan 2025)

---

## Future Enhancements (V2)

- [ ] Individual book detail pages (`/books/[slug]`)
- [ ] Category filtering tabs
- [ ] Sort options (by rating, by date, by title)
- [ ] Search functionality
- [ ] Reading stats (total books, avg rating, pages per month)
- [ ] "Currently Reading" section
- [ ] Integration with Goodreads API

---

**Approved by:** User  
**Next step:** Implementation
