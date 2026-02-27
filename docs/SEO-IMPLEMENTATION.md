# SEO Core Implementation - Complete Guide

## ✅ Đã hoàn thành

### 1. **SEO Component với JSON-LD Schema** (`src/components/SEO.astro`)

Component tái sử dụng cho tất cả trang, tự động xử lý:

- ✅ Canonical URLs (tránh duplicate content)
- ✅ Open Graph tags (Facebook, LinkedIn sharing)
- ✅ Twitter Card tags (Twitter/X sharing)
- ✅ Alternate language links (vi/en)
- ✅ JSON-LD structured data:
  - **WebSite** schema (homepage)
  - **BlogPosting** schema (blog posts với đầy đủ metadata)
  - **WebPage** schema (các trang khác)

### 2. **Sitemap Tự động** (`@astrojs/sitemap`)

- ✅ Tự động quét tất cả routes khi build
- ✅ Tạo `sitemap-index.xml` và `sitemap-0.xml`
- ✅ Hỗ trợ đa ngôn ngữ (vi/en)
- ✅ Lọc trang 404 (không index)

### 3. **Robots.txt** (`public/robots.txt`)

- ✅ Cho phép tất cả bots crawl
- ✅ Chỉ định đường dẫn sitemap
- ✅ Template sẵn để thêm rules sau

### 4. **Layout Integration**

- ✅ `BaseLayout.astro`: Sử dụng SEO component cho các trang thông thường
- ✅ `BlogPost.astro`: SEO component riêng với Article schema cho blog posts

## 📝 Cách sử dụng

### Trong các trang thường (index, about, books)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="Page Title" 
  description="Page description for SEO"
  locale="vi"
  image="/images/og-image.jpg"  // Optional
  imageAlt="Image description"  // Optional
>
  <!-- Your content -->
</BaseLayout>
```

### Trong blog posts (tự động)

Blog posts tự động có:

- Article JSON-LD schema
- Author, publish date, tags
- Category
- Proper Open Graph tags

## 🎯 Sau khi có Custom Domain

### 1. Update Environment Variable

Tạo file `.env` hoặc cấu hình trên Vercel Dashboard:

```bash
PUBLIC_SITE_URL=https://devjournal.fun
PUBLIC_SITE_NAME=Dev Journal
PUBLIC_AUTHOR_NAME=Nguyen Huu Loc
```

### 2. Update Vercel Settings

1. Vào Vercel Dashboard
2. Settings → Domains → Add domain
3. Environment Variables → Add:
   - `PUBLIC_SITE_URL` = `https://devjournal.fun`
   - `PUBLIC_SITE_NAME` = `Dev Journal`
   - `PUBLIC_AUTHOR_NAME` = `Nguyen Huu Loc`

### 3. Update robots.txt (Optional)

Nếu muốn thay đổi sitemap URL trong `public/robots.txt`:

```txt
Sitemap: https://devjournal.fun/sitemap-index.xml
```

✅ **Đã được cập nhật với domain devjournal.fun**

### 4. Submit to Google Search Console

1. Truy cập [Google Search Console](https://search.google.com/search-console)
2. Thêm property với domain của bạn
3. Verify domain ownership
4. Submit sitemap: `https://devjournal.fun/sitemap-index.xml`
5. Request indexing cho homepage

### 5. Test Rich Results

Kiểm tra JSON-LD schema:

1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Nhập URL bài viết blog
3. Xác nhận BlogPosting schema được detect

## 🔍 Kiểm tra SEO

### Local Testing

```bash
npm run build
npm run preview
```

Sau đó kiểm tra:

- `/sitemap-index.xml` - Sitemap index
- `/sitemap-0.xml` - Sitemap URLs
- `/robots.txt` - Robots file
- View page source → kiểm tra `<script type="application/ld+json">` có JSON-LD schema

### Online Tools

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (built into Chrome DevTools)

## 📊 Vercel Analytics (Khuyến nghị)

### Enable Vercel Analytics

1. Vào Vercel Dashboard
2. Project → Analytics → Enable
3. Enable **Speed Insights** (Core Web Vitals)

### Install Vercel Analytics Package (Optional)

```bash
npm install @vercel/analytics
```

Thêm vào `BaseLayout.astro`:

```astro
---
import { Analytics } from '@vercel/analytics/astro';
---

<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <Analytics />
  </body>
</html>
```

## 🎨 Next Steps (Advanced SEO)

### 1. Image Optimization

Thay thế `<img>` tags bằng Astro's `<Image>` component:

```astro
---
import { Image } from 'astro:assets';
---

<Image 
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  format="webp"
  loading="lazy"
/>
```

### 2. Add og:image cho homepage

Tạo file `/public/images/og-default.jpg` (1200x630px)

### 3. Add modifiedDate field

Update schema `src/content/config.ts`:

```typescript
modifiedDate: z.date().optional(),
```

Update SEO component để sử dụng modifiedDate

### 4. Breadcrumbs Schema

Thêm BreadcrumbList JSON-LD cho blog posts

### 5. FAQ Schema

Nếu có FAQ section trong blog posts

## 🚨 Important Notes

1. **Site URL**: ✅ Đã cấu hình với domain `https://devjournal.fun`
2. **Default OG Image**: Cần tạo file `/public/images/og-default.jpg` (1200x630px)
3. **Google Search Console**: Submit sitemap tại `https://devjournal.fun/sitemap-index.xml`
4. **Build trước khi deploy**: Luôn chạy `npm run build` locally để kiểm tra errors

## 📚 Resources

- [Astro SEO Guide](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## ✨ Benefits Achieved

1. ✅ Google có thể index toàn bộ site (sitemap)
2. ✅ Tránh duplicate content (canonical URLs)
3. ✅ Rich snippets trên Google (JSON-LD schema)
4. ✅ Đẹp khi share lên social media (OG tags)
5. ✅ Đa ngôn ngữ SEO-friendly (hreflang)
6. ✅ Cấu trúc code clean, dễ maintain

---

**Created**: 2026-02-27
**Status**: ✅ Core SEO Implementation Complete
**Next**: Thêm custom domain và submit Google Search Console
