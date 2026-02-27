# Table of Contents Feature Design

**Date:** 2026-02-13  
**Status:** Approved  
**Goal:** Add auto-generated sticky sidebar TOC với scroll spy tracking

---

## Overview

Implement a sticky sidebar Table of Contents (TOC) cho blog posts với:
- Auto-generation từ H2/H3 headings
- Scroll spy để highlight active section
- Smooth scroll + heading highlight khi click
- Smart auto-detection với frontmatter override
- Fully responsive (sidebar desktop, drawer mobile)

---

## Architecture

### Component Structure

**New Component:** `src/components/TableOfContents.astro`
- Extract và render headings từ props
- Client-side scroll spy logic
- Smooth scroll behavior

**New Utility:** `src/utils/toc.ts`
```typescript
extractHeadings(markdownContent: string): Heading[]
slugify(text: string): string
shouldShowTOC(headings: Heading[], frontmatter: any): boolean
```

**Modified Files:**
- `src/layouts/BlogPost.astro` - Add TOC sidebar
- `src/content/config.ts` - Add `showTOC?: boolean` field

### Layout Structure

```
Desktop (>= 1024px):
┌─────────────────────┬──────────────┐
│                     │  TOC (sticky)│
│   Blog Content      │  - Heading 1 │
│   (max-w-4xl)       │  - Heading 2 │
│                     │    - Sub 2.1 │
└─────────────────────┴──────────────┘

Mobile (< 1024px):
┌─────────────────────┐
│   Blog Content      │  [≡] Button
│   (full width)      │
└─────────────────────┘
```

---

## Auto-Detection Logic

**Priority (highest to lowest):**
1. If `showTOC: false` in frontmatter → Don't show
2. If `showTOC: true` in frontmatter → Force show
3. If not set → Auto-detect: Show if >= 3 total headings (H2 + H3)

**Example:**
```yaml
---
title: "My Post"
showTOC: true  # Optional override
---
```

---

## Scroll Spy Behavior

### Active State Detection

Use **Intersection Observer API**:
- Monitor all H2/H3 headings in content
- When heading enters viewport center → mark as active
- Update TOC highlight immediately
- Auto-scroll TOC to keep active item visible

### Visual Feedback (Active State)

```css
/* Active TOC item */
- Font weight: bold
- Color: Primary color (blue-600)
- Left border: 3px solid primary
- Background: subtle highlight (blue-50)
```

### Click Behavior

1. User clicks TOC link
2. `event.preventDefault()`
3. Smooth scroll to target heading (CSS `scroll-behavior: smooth`)
4. Apply highlight animation to heading:
   ```css
   @keyframes highlight-flash {
     0%, 100% { background: transparent; }
     50% { background: rgba(251, 191, 36, 0.3); }
   }
   ```
5. Update active state in TOC
6. (Optional) Update URL hash without page jump

---

## Data Structure

```typescript
type Heading = {
  depth: 2 | 3;           // H2 or H3 only
  text: string;           // Original heading text
  slug: string;           // URL-safe ID (auto-generated)
};

type TOCProps = {
  headings: Heading[];
};
```

**Example headings array:**
```javascript
[
  { depth: 2, text: "The Shift: Từ Coder Thành Orchestra Conductor", slug: "the-shift-tu-coder-thanh-orchestra-conductor" },
  { depth: 2, text: "The 2-Hour Timeline: Workflow Chi Tiết", slug: "the-2-hour-timeline-workflow-chi-tiet" },
  { depth: 3, text: "00:00 - Tech Stack Decision", slug: "0000-tech-stack-decision" },
  { depth: 3, text: "00:15 - Brainstorming Với Claude", slug: "0015-brainstorming-voi-claude" }
]
```

---

## Responsive Design

### Desktop (>= 1024px)

```html
<div class="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
  <article><!-- Blog content --></article>
  <aside class="hidden lg:block">
    <nav class="sticky top-24">
      <!-- TOC here -->
    </nav>
  </aside>
</div>
```

- Sticky position: `top-24` (below header)
- Max height: `calc(100vh - 6rem)` with scroll
- Width: `250px` fixed

### Mobile (< 1024px)

```html
<!-- Floating button -->
<button class="lg:hidden fixed bottom-4 right-4 z-40">
  <svg><!-- Menu icon --></svg>
  Table of Contents
</button>

<!-- Slide-in drawer -->
<div class="fixed inset-y-0 right-0 w-80 transform transition-transform">
  <!-- TOC content -->
</div>
```

- Drawer slides from right
- Backdrop dim overlay
- Click outside or "X" button to close

---

## Implementation Checklist

### Phase 1: Core Functionality
- [ ] Create `src/utils/toc.ts`
  - [ ] `slugify()` function
  - [ ] `extractHeadings()` parser
  - [ ] `shouldShowTOC()` logic
- [ ] Create `src/components/TableOfContents.astro`
  - [ ] Basic TOC rendering
  - [ ] Nested H2/H3 structure
- [ ] Update `src/content/config.ts`
  - [ ] Add `showTOC?: boolean` to schema
- [ ] Update `src/layouts/BlogPost.astro`
  - [ ] Extract headings from body
  - [ ] Render TOC conditionally
  - [ ] Update layout grid

### Phase 2: Scroll Spy
- [ ] Intersection Observer setup
- [ ] Active state tracking
- [ ] TOC highlight updates
- [ ] Auto-scroll TOC sidebar

### Phase 3: Click Interactions
- [ ] Smooth scroll to heading
- [ ] Heading highlight flash animation
- [ ] URL hash update (optional)

### Phase 4: Responsive
- [ ] Desktop sticky sidebar
- [ ] Mobile floating button
- [ ] Mobile slide-in drawer
- [ ] Backdrop overlay

### Phase 5: Styling & Polish
- [ ] Dark mode support
- [ ] Sepia mode support
- [ ] Smooth transitions
- [ ] Accessibility (ARIA labels, keyboard nav)

---

## Edge Cases

1. **No headings found** → Don't render TOC (even if `showTOC: true`)
2. **Only H2s or only H3s** → Flat list, no nesting
3. **Duplicate heading text** → Append number to slug (`heading`, `heading-2`, `heading-3`)
4. **Very long headings** → Truncate in TOC with ellipsis, show full on hover
5. **Mobile landscape** → Adjust drawer width to not cover entire screen

---

## Performance Considerations

- **Build-time extraction:** Parse headings during build, not client-side
- **Lazy Intersection Observer:** Only initialize when TOC visible
- **Debounced scroll events:** Prevent excessive scroll spy updates
- **CSS containment:** Use `contain: layout style` on TOC for paint optimization

---

## Accessibility

- Semantic HTML: `<nav aria-label="Table of Contents">`
- Keyboard navigation: Tab through links
- Skip to content link (if TOC is first in DOM)
- Screen reader announcements for active section
- Focus visible styles on all interactive elements

---

## Future Enhancements (V2)

- [ ] Collapse/expand nested sections
- [ ] Filter TOC by depth (show only H2)
- [ ] Print-friendly version
- [ ] Share link to specific heading
- [ ] Reading progress indicator
- [ ] Estimated time to read each section

---

**Approved by:** User  
**Next step:** Implementation via writing-plans skill
