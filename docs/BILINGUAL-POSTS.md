# Bilingual Blog Posts Guide

## Overview

Your blog now supports bilingual content (Vietnamese and English) with a 3-theme system (Light, Sepia, Dark).

## Creating Bilingual Posts

### 1. File Naming Convention

Create two files for each blog post:
- `post-name.vi.mdx` - Vietnamese version
- `post-name.en.mdx` - English version

### 2. Frontmatter Requirements

Both versions must have:
- **Same `slug`**: URL path (e.g., `"first-post"`)
- **Same `translationKey`**: Links the two versions (e.g., `"first-post"`)
- **Different `lang`**: `"vi"` or `"en"`
- **Different `title`** and **`description`**: Translated content

### 3. Example

**first-post.vi.mdx:**
```markdown
---
title: "Bài viết đầu tiên"
description: "Đây là bài viết đầu tiên trên blog của tôi"
pubDate: 2026-02-13
author: "Your Name"
category: "personal"
tags: ["welcome", "first-post"]
coverImage: "/images/posts/first-post.svg"
coverAlt: "Welcome to my blog"
lang: "vi"
translationKey: "first-post"
slug: "first-post"
---

# Chào mừng đến với Blog của tôi

Nội dung tiếng Việt...
```

**first-post.en.mdx:**
```markdown
---
title: "My First Post"
description: "This is my first blog post"
pubDate: 2026-02-13
author: "Your Name"
category: "personal"
tags: ["welcome", "first-post"]
coverImage: "/images/posts/first-post.svg"
coverAlt: "Welcome to my blog"
lang: "en"
translationKey: "first-post"
slug: "first-post"
---

# Welcome to My Blog

English content...
```

## How It Works

1. **Single URL**: Both language versions share the same URL (e.g., `/blog/first-post/`)
2. **Language Detection**: The page shows content based on:
   - `?lang=en` or `?lang=vi` URL parameter
   - User's language preference (saved in localStorage)
   - Default is Vietnamese (`vi`)

3. **Language Switcher**: Click the language dropdown in the header to switch between EN/VI
   - Updates URL with `?lang=` parameter
   - Saves preference to localStorage
   - Filters blog list to show only posts in selected language

## Theme System

Your blog has 3 reading themes:

1. **Light** - Clean white background
2. **Sepia** - Warm reading mode (default) - optimized for long reading
3. **Dark** - Dark mode for night reading

Toggle themes using the theme dropdown in the header. Preference is saved to localStorage.

## Categories

Three categories are available:
- **Programming** (Blue badge) - Tech tutorials and coding
- **Lifestyle** (Green badge) - Life tips and experiences
- **Personal** (Purple badge) - Personal stories and reflections

## Best Practices

1. Always create both EN and VI versions for each post
2. Use the same `slug` and `translationKey` for linked posts
3. Keep the same `coverImage` for both versions (or create localized versions)
4. Maintain consistent `pubDate` and `category` across translations
5. The `slug` field controls the URL - keep it simple and descriptive

## Testing

- Visit `http://localhost:4323/` to test your blog
- Switch languages using the dropdown: 🇻🇳 / 🇬🇧
- Switch themes using the theme dropdown: ☀️ / 📖 / 🌙
- Test URLs: `/blog/first-post/`, `/blog/first-post/?lang=en`, `/blog/first-post/?lang=vi`
