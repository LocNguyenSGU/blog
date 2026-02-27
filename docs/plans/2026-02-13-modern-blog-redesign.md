# Modern Blog Redesign

**Date:** February 13, 2026  
**Status:** Approved

## Overview

Redesign blog với minimalist & clean style, thêm thumbnail images, category system, reading time, view count, và manual dark mode toggle.

## Design Decisions

### Style
- **Minimalist & Clean** - Nhiều khoảng trắng, tập trung nội dung, màu sắc nhẹ nhàng

### Content Structure

**Blog Post Schema:**
```yaml
title: string
description: string
pubDate: date
author: string
category: "programming" | "lifestyle" | "personal"
tags: string[]
coverImage: string (path to /images/posts/)
coverAlt: string
```

**Categories:**
- Programming (Blue #3b82f6)
- Lifestyle (Green #10b981)
- Personal (Purple #8b5cf6)

**Image Management:**
- Upload real images to `public/images/posts/`
- Reference in frontmatter via `coverImage` field

### Layout

**Blog Listing (Featured + Grid):**
- Featured post: Full-width hero với large cover image (16:9)
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Post cards: Cover image (4:3) + category badge + title + description + metadata

**Single Post:**
- Full-width cover image (21:9, max 500px height)
- Max-width prose container (768px)
- Category badge overlay on image
- Metadata: date • reading time • view count

### Features

**Reading Time:**
- Auto-calculate from content (200 words/min average)
- Display as "X min read"

**View Count:**
- Client-side localStorage implementation
- Display with eye icon

**Dark Mode:**
- Manual toggle button (sun/moon icon)
- Save preference to localStorage
- Smooth transitions

### Components

**New Components:**
- `CategoryBadge.astro` - Colored badge với category
- `PostCard.astro` - Reusable card cho grid
- `FeaturedPost.astro` - Hero post component
- `DarkModeToggle.astro` - Theme switcher

**Updated Components:**
- `BaseLayout.astro` - Add dark mode toggle, sticky header
- `BlogPost.astro` - Add cover image, reading time, view count

**Utilities:**
- `getReadingTime.ts` - Calculate reading time
- `viewCounter.ts` - Handle view count with localStorage

### Technical Stack

- Astro + TypeScript + Tailwind CSS
- Tailwind Typography plugin
- Custom category color utilities
- Client-side scripts for dark mode + view counter

## Implementation Plan

1. Update content schema with new fields
2. Create utility functions (reading time, view counter)
3. Build reusable components
4. Update layouts with new design
5. Update pages with new components
6. Add sample cover images
7. Test responsive design
8. Test dark mode functionality

## File Changes

**New:**
- `src/components/CategoryBadge.astro`
- `src/components/PostCard.astro`
- `src/components/FeaturedPost.astro`
- `src/components/DarkModeToggle.astro`
- `src/utils/readingTime.ts`
- `src/utils/viewCounter.ts`
- `public/images/posts/` (directory)

**Updated:**
- `src/content/config.ts`
- `src/layouts/BaseLayout.astro`
- `src/layouts/BlogPost.astro`
- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `tailwind.config.mjs`
