# Code Review Issues - Blog Song Ngữ

**Ngày:** 13/02/2026  
**Reviewer:** AI Assistant  
**Scope:** Bilingual blog implementation với Astro + SSR

---

## 🔴 Critical Issues (Fix trước deploy)

### #3: Locale Validation Thiếu
- **Files**: `src/pages/index.astro:10`, `src/pages/blog/index.astro:10`, `src/pages/blog/[slug].astro:10`
- **Issue**: Cast trực tiếp `(urlParams.get('lang') as Locale)` không validate
- **Impact**: User nhập `?lang=invalid` vẫn được accept
- **Fix**: 
```typescript
const langParam = urlParams.get('lang');
const locale: Locale = (langParam === 'en' || langParam === 'vi') ? langParam : 'vi';
```

### #4: Missing 404 Page
- **File**: `src/pages/blog/[slug].astro:16`
- **Issue**: `return Astro.redirect('/404')` nhưng không có file `/src/pages/404.astro`
- **Impact**: Redirect đến trang không tồn tại
- **Fix**: Tạo `src/pages/404.astro` hoặc dùng `Astro.redirect('/')`

### #15: Language Switch Không Preserve Current Page
- **File**: `src/components/LanguageSwitcher.astro:60-69`
- **Issue**: Switch language chỉ thêm `?lang=` vào URL hiện tại
- **Impact**: Ở post page không chuyển sang bản dịch tương ứng
- **Expected**: `/blog/first-posten?lang=vi` → `/blog/first-postvi?lang=vi`
- **Fix**: Cần logic map sang slug tương ứng qua `translationKey`

---

## 🟡 Important Issues (Fix sớm)

### #1: Schema Conflict - Unused `slug` Field
- **File**: `src/content/config.ts:18`
- **Issue**: Schema có `slug: z.string().optional()` nhưng không dùng trong frontmatter
- **Impact**: Gây confusion, tăng complexity không cần thiết
- **Fix**: Xóa dòng `slug: z.string().optional(),`

### #2: Auto-redirect Script Gây Infinite Loop Risk
- **File**: `src/layouts/BaseLayout.astro:41-51`
- **Issue**: Script auto-redirect có thể gây loop nếu localStorage và URL không sync
- **Impact**: Trang reload liên tục trong edge cases
- **Fix**: 
```javascript
if (!urlParams.has('lang') && savedLocale && savedLocale !== 'vi') {
  // Chỉ redirect khi khác default
}
```

### #5: URL Structure Không Consistent
- **Issue**: 
  - Homepage: `/?lang=en`
  - Blog list: `/blog?lang=en`
  - Blog post: `/blog/first-posten?lang=en` (có `en` trong slug + param)
- **Impact**: Confusing, redundant data trong URL
- **Actual behavior**: Slugs là `first-posten`, `first-postvi` do Astro tạo từ filename
- **Fix options**:
  - A: Accept current structure (slugs có suffix ngôn ngữ)
  - B: Rename files: `first-post.en.mdx` → `en/first-post.mdx` (folder structure)
  - C: Override slug generation với custom logic

### #11: SSR Mode Cho Toàn Site
- **File**: `astro.config.mjs:8`
- **Issue**: `output: 'server'` cho toàn bộ site
- **Impact**: Mọi page đều SSR → slower, cần Vercel Functions
- **Cost**: Vercel Functions có limit, static site free hơn
- **Better**: `output: 'hybrid'` + mark dynamic pages với `export const prerender = false`

---

## 🟢 Code Quality Issues

### #6: Performance - Redundant getCollection Calls
- **Files**: `src/pages/index.astro:12`, `src/pages/blog/index.astro:11`, `src/pages/blog/[slug].astro:14`
- **Issue**: Mỗi page load lại toàn bộ collection
- **Impact**: Với SSR, mỗi request đều query lại
- **Note**: Acceptable cho small blog, nhưng cần cache layer để scale

### #7: Component Link Generation Không DRY
- **Files**: `PostCard.astro:19`, `FeaturedPost.astro:20`
- **Issue**: Logic `<a href={...}?lang=${...}>` lặp lại
- **Fix**: Tạo helper function `getPostUrl(post)`

### #8: Date Formatting Hardcoded Locale
- **File**: `src/components/PostCard.astro:12`
- **Issue**: `toLocaleDateString('vi-VN', ...)` hardcoded
- **Fix**: Dùng prop `locale` để format đúng ngôn ngữ:
```typescript
const formattedDate = new Date(post.data.pubDate).toLocaleDateString(
  locale === 'en' ? 'en-US' : 'vi-VN',
  { year: 'numeric', month: 'short', day: 'numeric' }
);
```

### #9: TypeScript Type Safety
- **File**: `src/pages/blog/[slug].astro:10`
- **Issue**: Type assertion không an toàn
- **Fix**: Đã cover trong #3

### #10: Debug Code Cleanup
- **Check**: Verify không còn `console.log` debug statements

---

## 📝 Best Practices & Enhancement

### #12: Missing SEO Meta Tags
- **Issue**: Không có OpenGraph, canonical URLs cho bilingual
- **Impact**: SEO không tối ưu cho multilingual content
- **Fix**: Thêm vào `<head>`:
```html
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="vi" href="..." />
<link rel="canonical" href="..." />
```

### #13: Accessibility - Language Switching
- **File**: `src/components/LanguageSwitcher.astro:13`
- **Status**: ✅ Đã OK - có icon + text
- **Current**: Button có `aria-label`, visual icon và text

### #14: Error Boundary Thiếu
- **Issue**: Không có error handling cho `getCollection`, `render()` failures
- **Impact**: Site crash nếu MDX parse error
- **Fix**: Wrap trong try-catch, show user-friendly error

### #16: No Fallback Khi Translation Thiếu
- **Issue**: Nếu chỉ có bài VI, chọn EN → empty blog list
- **Better**: 
  - Option A: Show message "No posts in English yet"
  - Option B: Fallback về VI với notice
  - Option C: Hide language switch nếu không có translation

---

## 🚀 Deployment Concerns

### #17: Vercel Adapter Config Thiếu
- **File**: `astro.config.mjs:9`
- **Issue**: `adapter: vercel()` không có config
- **Missing options**:
```javascript
adapter: vercel({
  analytics: true,           // Vercel Analytics
  imageService: true,        // Vercel Image Optimization
  functionPerRoute: false,   // Single function vs per-route
  edgeMiddleware: false,     // Edge middleware
})
```

### #18: Environment Variables Thiếu
- **Issue**: Không có `.env.example` cho deployment
- **Need**: 
  - `PUBLIC_SITE_URL` - Base URL
  - Build settings documentation

### #19: Build Verification Script
- **Issue**: `npm run build` có thể pass nhưng deploy fail
- **Better**: Add script test deployment locally:
```json
"scripts": {
  "preview:build": "npm run build && npm run preview"
}
```

---

## ✅ Những Gì Hoạt Động Tốt

- ✅ Theme system (Light/Sepia/Dark) implementation clean
- ✅ i18n utility structure tốt với typed translations
- ✅ Content schema validation với Zod
- ✅ Tailwind config với sepia colors đẹp
- ✅ Component structure modular, dễ maintain
- ✅ TypeScript strict mode enabled
- ✅ MDX integration hoạt động tốt
- ✅ Responsive design with Tailwind

---

## 📊 Độ Ưu Tiên Tổng Hợp

### Giai đoạn 1: Pre-deploy (Bắt buộc)
1. #3 - Locale validation
2. #4 - 404 page
3. #15 - Language switch logic

### Giai đoạn 2: Post-deploy Quick Wins
4. #1 - Remove unused slug field
5. #2 - Fix auto-redirect
6. #8 - Date formatting by locale

### Giai đoạn 3: Optimization
7. #11 - SSR → Hybrid mode
8. #5 - URL structure cleanup
9. #7 - DRY helper functions

### Giai đoạn 4: Production Hardening
10. #12 - SEO meta tags
11. #14 - Error boundaries
12. #16 - Translation fallbacks
13. #17-19 - Deployment config

---

## 🔧 Quick Fix Checklist

- [ ] Validate locale input (#3)
- [ ] Create 404.astro (#4)
- [ ] Fix language switcher for posts (#15)
- [ ] Remove unused slug field from schema (#1)
- [ ] Add conditional auto-redirect (#2)
- [ ] Switch to hybrid rendering (#11)
- [ ] Add locale-aware date formatting (#8)
- [ ] Create getPostUrl helper (#7)
- [ ] Add SEO meta tags (#12)
- [ ] Add error boundaries (#14)

---

**Notes:** 
- File này nên được review và update sau mỗi lần fix
- Priority có thể thay đổi tùy deployment timeline
- Một số issues có thể resolve cùng lúc (e.g., #3 + #9)
