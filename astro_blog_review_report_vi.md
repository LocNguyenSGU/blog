# Báo Cáo Review Dự Án Astro Blog

## 1. Tóm tắt hiện trạng

### Kiến trúc hiện tại

- Dự án đang dùng **Astro 5 + MDX + Tailwind + Vercel adapter + sitemap** theo [`package.json:8-30`](./package.json) và [`astro.config.mjs:10-49`](./astro.config.mjs).
- Routing đang theo chuẩn file-based routing của Astro trong `src/pages/`.
  - Trang tĩnh/chính: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/books.astro`
  - Route động: `src/pages/blog/[slug].astro`, `src/pages/books/[slug].astro`, `src/pages/categories/[slug].astro`, `src/pages/topics/[slug].astro`
- Nội dung đang nằm trong **Content Collections**:
  - Blog posts: `src/content/blog/*`
  - Book notes/reviews: `src/content/books/*`
  - Schema: [`src/content/config.ts:1-45`](./src/content/config.ts)
- Tổ chức UI:
  - Layout toàn cục: [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro)
  - Layout bài viết: [`src/layouts/BlogPost.astro`](./src/layouts/BlogPost.astro)
  - Components render card/SEO/breadcrumb/theme/lang/TOC trong `src/components/`
  - Logic domain nằm trong `src/utils/` như `topics.ts`, `categories.ts`, `breadcrumbs.ts`, `postHelpers.ts`

### Điểm mạnh hiện có

- Đã dùng **Content Collections** thay vì markdown ad-hoc.
- Đã dùng **`astro:assets` `<Image />`** cho card/post/books.
- Đã có **SEO component**, **JSON-LD**, **sitemap**, **robots.txt**, **breadcrumb schema**, **TOC**, **reading time**, **dark mode**, **Giscus**.
- Có ý thức về category/topic clusters và i18n nội dung EN/VI.

### Nhận định tổng quan

Dự án đang ở mức **khá tốt cho blog cá nhân** nhưng chưa thật sự “Astro-idiomatic 2025–2026” ở các phần sau:

- Output đang để `server` dù site gần như toàn bộ là content build-time.
- Data fetching / filter / sort đang lặp lại ở nhiều page thay vì có query layer chung.
- i18n dùng `?lang=` làm tăng độ phức tạp cho SEO, canonical và alternate URLs.
- Ảnh cover trong content vẫn đang là `string` trỏ vào `public/`, nên đang bỏ lỡ phần tối ưu ảnh mạnh nhất của Astro Content Collections.
- A11y của menu/dropdown/drawer còn yếu.
- DX còn thiếu lint/format/test/content-query abstraction.

## 2. Checklist review

| Hạng mục | Trạng thái | Evidence | Recommendation |
| --- | --- | --- | --- |
| Functionality | PARTIAL | `src/pages/blog/[slug].astro:12-27`, `src/pages/books/[slug].astro:24-55`, `src/utils/breadcrumbs.ts:75-104` | Core flow chạy được, nhưng breadcrumb books đang link tới `?category=` không được hỗ trợ; view count chỉ là localStorage pseudo-counter. |
| Architecture & structure | PARTIAL | `src/layouts/BaseLayout.astro:60-76`, `src/layouts/BlogPost.astro:53-115`, `src/pages/index.astro:26-49`, `src/pages/blog/index.astro:83-109` | Tách query layer chung cho posts/books; giảm logic business trong layout/page; gom filter/sort/count vào `src/lib/content/queries.ts`. |
| Readability | PARTIAL | `src/pages/index.astro:17-24`, `src/pages/blog/index.astro:21-28`, `src/pages/books.astro:12-15` | Loại bỏ `any[]`, dùng `CollectionEntry<'blog'>[]` / `CollectionEntry<'books'>[]`, giảm try/catch không cần thiết cho build-time content. |
| Performance | PARTIAL | `astro.config.mjs:12-16`, `src/layouts/BaseLayout.astro:60-76`, `src/layouts/BlogPost.astro:248-263`, `src/components/TableOfContents.astro:170-267` | Chuyển về static output nếu không cần SSR; lazy-load comments; giảm global data fetch ở layout; chuyển cover image sang local image metadata để Astro tối ưu thật sự. |
| SEO | PARTIAL | `src/components/SEO.astro:58-64`, `src/layouts/BlogPost.astro:118-136`, `src/components/SEO.astro:159-162`, `public/robots.txt` | Sửa hreflang cho post detail; bổ sung RSS; thêm OG default image thật; cân nhắc chuyển sang path-based i18n (`/en/...`, `/vi/...`). |
| Accessibility | FAIL | `src/components/ThemeToggle.astro:6-33`, `src/components/LanguageSwitcher.astro:12-33`, `src/layouts/BaseLayout.astro:247-320`, `src/components/TableOfContents.astro:48-103`, `src/pages/404.astro:17-49` | Thêm `aria-expanded`, `aria-controls`, focus trap, Escape/Tab handling, menu semantics; bỏ nested `<main>` trong 404. |
| DX & tooling | FAIL | `package.json:8-13`, `tsconfig.json`, `src/utils/viewCounter.ts`, `src/components/DarkModeToggle.astro` | Thêm ESLint, Prettier, Vitest/Playwright, lint scripts, typed query helpers; xóa component chết và utility không dùng. |

## 3. Findings chi tiết và khuyến nghị

### A. Code quality & architecture

#### 1. Đã dùng Content Collections, nhưng schema chưa tận dụng hết khả năng type-safe của Astro

- Evidence:
  - [`src/content/config.ts:3-40`](./src/content/config.ts)
  - `coverImage` đang là `z.string()` cho cả blog và books.
- Vấn đề:
  - Khi `coverImage` là string trỏ vào `/public/...`, bạn vẫn render được với `<Image />`, nhưng Astro không tối ưu file local giống như khi dùng local image metadata.
  - Bạn cũng bỏ lỡ validation ảnh ở level schema.
- Khuyến nghị:
  - Đổi schema sang function form `schema: ({ image }) => z.object({ coverImage: image(), ... })`.
  - Co-locate ảnh gần content hoặc chuyển vào `src/assets/` / `src/content/...`.
  - Đây là bước nâng chất lượng mạnh nhất cho blog content-heavy.

#### 2. Layout và page đang gánh quá nhiều business logic

- Evidence:
  - [`src/layouts/BaseLayout.astro:60-76`](./src/layouts/BaseLayout.astro)
  - [`src/layouts/BlogPost.astro:53-115`](./src/layouts/BlogPost.astro)
  - [`src/pages/blog/index.astro:83-137`](./src/pages/blog/index.astro)
  - [`src/pages/index.astro:26-49`](./src/pages/index.astro)
- Vấn đề:
  - `BaseLayout` vừa render shell, vừa query toàn bộ blog collection để dựng footer/topic/category hub.
  - `BlogPost` vừa lo SEO meta, TOC, breadcrumb, related posts, series schema, comments, view count.
  - `pages/index`, `pages/blog/index`, `pages/categories/*`, `pages/topics/*` đều tự `getCollection()`, `filter()`, `sort()`, `count()`.
- Tác động:
  - Khó test, khó tái sử dụng, dễ lệch logic giữa các trang.
- Khuyến nghị:
  - Tạo query layer chung kiểu:
    - `src/lib/content/posts.ts`
    - `src/lib/content/books.ts`
  - Các hàm nên có:
    - `getPublishedPosts(locale)`
    - `getPostBySlug(slug)`
    - `getPostsByCategory(locale, category)`
    - `getPostsByTopic(locale, topic)`
    - `getTopicCounts(locale)`
    - `getCategoryCounts(locale)`

#### 3. Dùng `any[]` rộng khắp làm mất DX và type safety

- Evidence:
  - [`src/pages/index.astro:17-24`](./src/pages/index.astro)
  - [`src/pages/blog/index.astro:21-28`](./src/pages/blog/index.astro)
  - [`src/pages/books.astro:12-15`](./src/pages/books.astro)
- Vấn đề:
  - Đã có Content Collections type-safe nhưng page vẫn kéo everything về `any[]`.
- Khuyến nghị:
  - Dùng `CollectionEntry<'blog'>[]`, `CollectionEntry<'books'>[]`.
  - Tạo type helper:
    - `type BlogEntry = CollectionEntry<'blog'>`
    - `type BookEntry = CollectionEntry<'books'>`

#### 4. Có dead code / duplication không cần thiết

- Evidence:
  - `src/components/DarkModeToggle.astro` không được import dùng trong app.
  - [`src/utils/viewCounter.ts`](./src/utils/viewCounter.ts) tồn tại nhưng [`src/layouts/BlogPost.astro:275-307`](./src/layouts/BlogPost.astro) vẫn duplicate logic inline.
  - [`src/pages/categories/index.astro:66-83`](./src/pages/categories/index.astro) render 2 section gần như lặp nội dung category.
- Khuyến nghị:
  - Xóa `DarkModeToggle.astro` nếu không còn dùng.
  - Hoặc dùng `viewCounter.ts`, hoặc xóa nó và wrap view counter thành component riêng.
  - Gộp 2 section category index nếu không có ý đồ sản phẩm rõ ràng.

#### 5. Query-param i18n đang làm kiến trúc SEO và routing phức tạp hơn mức cần thiết

- Evidence:
  - [`src/pages/blog/index.astro:31-79`](./src/pages/blog/index.astro)
  - [`src/components/LanguageSwitcher.astro:87-123`](./src/components/LanguageSwitcher.astro)
  - [`src/layouts/BaseLayout.astro:115-128`](./src/layouts/BaseLayout.astro)
- Vấn đề:
  - `?lang=` kéo theo canonical/alternate phức tạp.
  - Client script phải tự rewrite URL slug theo heuristic `.en/.vi`.
  - Dễ sinh alternate URL sai cho bài viết detail.
- Khuyến nghị:
  - Dài hạn: chuyển sang Astro i18n routing chuẩn (`/en/...`, `/vi/...`).
  - Ngắn hạn: tối thiểu phải có mapping chính xác giữa post EN/VI thay vì suffix heuristic.

### B. Performance

#### 1. Site gần như hoàn toàn static nhưng vẫn build ở chế độ server

- Evidence:
  - [`astro.config.mjs:12-16`](./astro.config.mjs)
  - Content đang là build-time collections tại [`src/content/config.ts:3-40`](./src/content/config.ts)
- Vấn đề:
  - Đây là blog cá nhân content-driven, không có user session, auth, personalized SSR hay live CMS.
  - `output: 'server'` + Vercel adapter làm complexity và deployment cost cao hơn mức cần thiết.
- Khuyến nghị:
  - Nếu không có nhu cầu SSR thực sự, chuyển sang:
    - `output: 'static'`
    - bỏ Vercel adapter
    - dùng static hosting thuần trên Vercel/Cloudflare Pages.
- Deployment note:
  - Search với Pagefind, comments Giscus, analytics, RSS, sitemap đều vẫn chạy tốt ở static mode.

#### 2. `BaseLayout` fetch toàn bộ posts cho mọi page

- Evidence:
  - [`src/layouts/BaseLayout.astro:60-76`](./src/layouts/BaseLayout.astro)
- Vấn đề:
  - Kể cả page books/about/404 vẫn query blog collection chỉ để render footer clusters.
- Khuyến nghị:
  - Đưa phần “footer content model” thành query cached/chung.
  - Hoặc truyền data từ page vào layout nếu thực sự cần.
  - Nếu site chuyển về static, impact nhỏ hơn, nhưng đây vẫn là coupling không đẹp.

#### 3. Ảnh đang dùng `<Image />` nhưng chưa tối ưu tối đa vì source là string trong `public/`

- Evidence:
  - [`src/content/config.ts:17,31`](./src/content/config.ts)
  - [`src/components/PostCard.astro`](./src/components/PostCard.astro)
  - [`src/components/FeaturedPost.astro`](./src/components/FeaturedPost.astro)
  - [`src/layouts/BlogPost.astro:142-153`](./src/layouts/BlogPost.astro)
- Theo docs Astro:
  - `<Image />` là cách ưu tiên để tránh CLS và tối ưu ảnh khi Astro có thể xử lý asset local.
  - Ảnh trong `public/` vẫn có thể dùng với `<Image />`, nhưng không được optimize như local imported image.
- Khuyến nghị:
  - Di chuyển cover image của post/book thành local image metadata bằng schema `image()`.
  - Với hero image, cân nhắc dùng `<Picture />` + `sizes`.
  - Với card image, dùng kích thước nhỏ hơn và `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"`.

#### 4. Third-party script và interactive script còn eager

- Evidence:
  - Giscus: [`src/layouts/BlogPost.astro:245-263`](./src/layouts/BlogPost.astro)
  - TOC mobile + scroll spy: [`src/components/TableOfContents.astro:170-267`](./src/components/TableOfContents.astro)
  - Theme/Language script: [`src/components/ThemeToggle.astro:35-100`](./src/components/ThemeToggle.astro), [`src/components/LanguageSwitcher.astro:35-128`](./src/components/LanguageSwitcher.astro)
- Vấn đề:
  - Comments script tải ở mọi bài viết, kể cả người dùng không scroll đến.
  - Scroll spy chạy JS trực tiếp trong component thay vì lazy strategy.
- Khuyến nghị:
  - Comments: lazy-load khi user click “Hiển thị bình luận” hoặc khi khối comments vào viewport.
  - TOC: chỉ attach logic khi `displayTOC === true` là đúng, nhưng vẫn nên wrap code gọn hơn hoặc dùng `IntersectionObserver` init sau `requestIdleCallback`.

### C. SEO

#### 1. Hreflang/alternate URLs của post detail hiện tại sai

- Evidence:
  - [`src/layouts/BlogPost.astro:118-136`](./src/layouts/BlogPost.astro) không truyền `alternateUrls`
  - [`src/components/SEO.astro:58-61`](./src/components/SEO.astro) fallback alternate URL theo `currentPath + ?lang=...`
- Vấn đề:
  - Post EN và VI đang là **2 slug khác nhau** trong `src/content/blog/*`.
  - Nhưng fallback hreflang lại giả định cùng path khác `?lang=`.
  - Kết quả: Google có thể thấy alternate sai trên bài detail.
- Khuyến nghị:
  - Trong `pages/blog/[slug].astro` hoặc `BlogPost.astro`, resolve translated sibling bằng `translationKey`.
  - Truyền `alternateUrls` chính xác theo slug của bản dịch.

#### 2. Default OG image đang trỏ tới file không tồn tại

- Evidence:
  - [`src/components/SEO.astro:64`](./src/components/SEO.astro)
  - `public/` hiện không có `images/og-default.jpg`
- Vấn đề:
  - Mọi page không truyền `image` sẽ có social preview image bị broken.
- Khuyến nghị:
  - Tạo `public/images/og-default.jpg` hoặc đổi sang route generate OG động.

#### 3. Có sitemap + robots nhưng chưa có RSS

- Evidence:
  - Sitemap integration: [`astro.config.mjs:17-30`](./astro.config.mjs)
  - Robots: `public/robots.txt`
  - Không có route RSS trong `src/pages/`
- Khuyến nghị:
  - Thêm `src/pages/rss.xml.ts` dùng `@astrojs/rss`.
  - Đây là feature gần như bắt buộc cho blog cá nhân nghiêm túc.

#### 4. SEO strategy chưa đồng nhất giữa blog posts và book pages

- Evidence:
  - Blog post có `type="article"` và JSON-LD qua [`src/layouts/BlogPost.astro:118-136`](./src/layouts/BlogPost.astro)
  - Books detail chỉ truyền title/description locale ở [`src/pages/books/[slug].astro:81`](./src/pages/books/[slug].astro)
- Vấn đề:
  - Trang sách hiện chưa có structured data riêng kiểu `Book` / `Review`.
- Khuyến nghị:
  - Với books detail, thêm JSON-LD:
    - `@type: Book`
    - `name`, `author`, `image`, `review`, `reviewRating`

#### 5. URL strategy sạch ở mức vừa phải, nhưng nên nâng lên path-based i18n

- Hiện tại:
  - Blog URL: `/blog/[slug]?lang=en|vi`
  - Category/topic archive cũng tương tự
- Khuyến nghị:
  - Dài hạn: `/en/blog/...`, `/vi/blog/...`
  - Dễ canonicalize, dễ analytics, dễ internal linking, dễ share URL sạch hơn.

### D. Accessibility

#### 1. Dropdown/menu chưa đủ semantics

- Evidence:
  - [`src/components/ThemeToggle.astro:6-33`](./src/components/ThemeToggle.astro)
  - [`src/components/LanguageSwitcher.astro:12-33`](./src/components/LanguageSwitcher.astro)
- Vấn đề:
  - Chưa có `aria-expanded`, `aria-controls`.
  - Chưa có role menu/listbox rõ ràng.
  - Không có keyboard handling cho Escape / Arrow keys / focus return.
- Khuyến nghị:
  - Nếu giữ pattern dropdown custom:
    - button: `aria-expanded`, `aria-controls`
    - panel: `role="menu"`
    - items: `role="menuitemradio"` hoặc pattern listbox tùy semantics
  - Hoặc dùng disclosure/popup pattern đơn giản hơn nhưng đúng a11y.

#### 2. Mobile menu và TOC drawer chưa có focus trap

- Evidence:
  - [`src/layouts/BaseLayout.astro:247-320`](./src/layouts/BaseLayout.astro)
  - [`src/components/TableOfContents.astro:170-267`](./src/components/TableOfContents.astro)
- Vấn đề:
  - Drawer mở ra nhưng focus không bị giữ trong drawer.
  - Người dùng keyboard có thể tab ra nền sau overlay.
- Khuyến nghị:
  - Thêm focus trap.
  - Trả focus về trigger khi đóng drawer.
  - Gắn `aria-modal="true"` và `role="dialog"` cho drawer phù hợp.

#### 3. 404 page đang lồng `<main>` bên trong layout vốn đã có `<main>`

- Evidence:
  - `BaseLayout` có `<main>` ở cuối layout.
  - [`src/pages/404.astro:17-49`](./src/pages/404.astro) lại render thêm `<main>`.
- Vấn đề:
  - Sai landmark hierarchy.
- Khuyến nghị:
  - Đổi `<main>` trong 404 thành `<section>` hoặc `<div>`.

#### 4. Breadcrumb books không đúng hành vi thật

- Evidence:
  - [`src/utils/breadcrumbs.ts:75-104`](./src/utils/breadcrumbs.ts)
  - `Books` page không hỗ trợ `?category=` filter ở [`src/pages/books.astro:36-72`](./src/pages/books.astro)
- Vấn đề:
  - Breadcrumb category tạo URL dead-end.
- Khuyến nghị:
  - Hoặc thêm filter category cho sách.
  - Hoặc bỏ node category khỏi breadcrumb books.

### E. DX & maintainability

#### 1. Tooling còn rất mỏng

- Evidence:
  - [`package.json:8-13`](./package.json) chỉ có `dev/start/build/preview/astro`
- Khuyến nghị:
  - Thêm:
    - `lint`
    - `format`
    - `test`
    - `check`
  - Gợi ý stack:
    - ESLint (`eslint`, `eslint-plugin-astro`, `typescript-eslint`)
    - Prettier + `prettier-plugin-astro`
    - Vitest cho unit utilities
    - Playwright cho smoke e2e

#### 2. Cấu trúc project nên chuẩn hóa cho blog dài hạn

- Gợi ý:
  - `src/content/blog/`
  - `src/content/books/`
  - `src/lib/content/queries.ts`
  - `src/lib/seo/`
  - `src/lib/i18n/`
  - `src/components/content/`
  - `src/components/ui/`
  - `src/components/seo/`
  - `src/layouts/`

#### 3. Nên tận dụng JSON schema generated từ Content Collections

- Astro docs cho phép editor tận dụng schema auto-generated cho collections.
- Với repo nhiều content file EN/VI, đây là nâng cấp DX rất đáng giá cho authoring.

### F. Reader & product features nên bổ sung

#### 1. Search: Pagefind hoặc Orama

- Vì sao hữu ích:
  - Blog cá nhân sẽ sớm khó điều hướng khi số bài tăng.
- Khuyến nghị triển khai:
  - **Ưu tiên Pagefind** nếu site static: index build-time, không cần backend.
  - Tạo:
    - `src/components/SearchDialog.astro`
    - `src/pages/search.astro`
  - Build hook sau `astro build`.

#### 2. RSS feed

- Vì sao hữu ích:
  - Chuẩn blog cơ bản; tốt cho syndication và power users.
- Triển khai:
  - Thêm `@astrojs/rss`
  - Tạo `src/pages/rss.xml.ts`

#### 3. Tags thật sự

- Hiện trạng:
  - Schema blog có `tags`, nhưng UI/route tags chưa có.
- Hữu ích:
  - Tăng discoverability và internal linking.
- Triển khai:
  - `src/pages/tags/index.astro`
  - `src/pages/tags/[tag].astro`
  - query helper `getTagCounts(locale)` và `getPostsByTag(locale, tag)`

#### 4. Related posts tốt hơn

- Hiện trạng:
  - `BlogPost` đang score theo shared tags + same category, nhưng logic nằm ngay trong layout.
- Hữu ích:
  - Tăng page depth và time on site.
- Triển khai:
  - Tách sang `src/lib/content/related.ts`
  - Sau này dễ thay bằng embedding/search-based related posts.

#### 5. Comments lazy / opt-in

- Hiện trạng:
  - Giscus script inject ngay trong post detail.
- Hữu ích:
  - Giảm JS/third-party impact.
- Triển khai:
  - Button “Hiển thị bình luận”
  - Khi click mới inject script hoặc load island.

#### 6. Analytics

- Hữu ích:
  - Theo dõi bài nào được đọc, đường dẫn vào, hiệu quả SEO.
- Triển khai:
  - Nếu ở Vercel: `@vercel/analytics`
  - Nếu host chung/static: Plausible hoặc Umami script component.

## 4. Roadmap 3 phase

### Phase 1: Quick wins, effort thấp / impact cao

- Chuyển query logic lặp lại thành helper typed trong `src/lib/content/queries.ts`.
- Sửa hreflang/canonical cho blog post detail bằng `translationKey`.
- Thêm `public/images/og-default.jpg` hoặc OG route.
- Thêm RSS feed.
- Sửa 404 nested `<main>`.
- Xóa dead component / utility không dùng (`DarkModeToggle`, duplicate view counter path).
- Bổ sung scripts `lint`, `format`, `check`.

### Phase 2: Medium effort improvements

- Đổi `coverImage` trong collections sang `image()` helper.
- Di chuyển content images sang local assets/co-located images.
- Refactor `BaseLayout`, `BlogPost`, `ThemeToggle`, `LanguageSwitcher`, `TableOfContents` theo hướng component nhỏ hơn + a11y đúng chuẩn.
- Thêm tags pages và search bằng Pagefind.
- Thêm structured data `Book` / `Review` cho trang sách.

### Phase 3: Long-term enhancements / nice-to-have

- Migrate từ query-param i18n sang Astro i18n path-based routing.
- Chuyển từ `output: 'server'` sang `static` nếu không còn SSR requirement.
- Thêm OG image generation động.
- Thêm test suite:
  - Vitest cho lib/query/SEO utils
  - Playwright smoke cho home/blog/post/theme/lang/search
- Cân nhắc content author model bằng `reference()` nếu blog phát triển thêm guest posts/authors.

## 5. Hướng dẫn triển khai cụ thể

### 5.1. Tách query layer cho content

**Files cần tạo**

- `src/lib/content/posts.ts`
- `src/lib/content/books.ts`

**Ví dụ**

```ts
// src/lib/content/posts.ts
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/utils/i18n';
import { TOPICS, type TopicSlug } from '@/utils/topics';
import type { CategoryKey } from '@/utils/categories';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(locale: Locale): Promise<BlogEntry[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.lang === locale);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostBySlug(slug: string) {
  const posts = await getCollection('blog');
  return posts.find((post) => post.slug === slug);
}

export async function getPostsByCategory(locale: Locale, category: CategoryKey) {
  const posts = await getPublishedPosts(locale);
  return posts.filter((post) => post.data.category === category);
}

export async function getPostsByTopic(locale: Locale, topic: TopicSlug) {
  const posts = await getPublishedPosts(locale);
  const keys = new Set(TOPICS[topic].translationKeys);
  return posts.filter((post) => post.data.translationKey && keys.has(post.data.translationKey));
}
```

**Áp dụng**

- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/categories/[slug].astro`
- `src/pages/topics/[slug].astro`
- `src/layouts/BlogPost.astro`

### 5.2. Nâng schema ảnh sang `image()` helper

**Files cần sửa**

- `src/content/config.ts`
- Frontmatter các file blog/books
- Cập nhật đường dẫn ảnh theo local file

**Ví dụ schema**

```ts
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.date(),
      modifiedDate: z.date().optional(),
      author: z.string().default('Anonymous'),
      category: z.enum(['programming', 'lifestyle', 'personal']),
      tags: z.array(z.string()).default([]),
      coverImage: image(),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
      lang: z.enum(['en', 'vi']).default('vi'),
      translationKey: z.string().optional(),
      showTOC: z.boolean().optional(),
    }),
});
```

**Ví dụ frontmatter mới**

```md
---
title: "My post"
coverImage: "./cover.jpg"
coverAlt: "Mô tả ảnh cover"
---
```

### 5.3. Sửa alternate URLs cho bài viết detail

**Vấn đề hiện tại**

- `SEO.astro` fallback `hreflang` theo cùng `currentPath`.
- Với bài EN/VI có slug khác nhau, điều này sai.

**Cách làm**

1. Trong `src/pages/blog/[slug].astro`, lấy `allPosts`.
2. Tìm sibling translation bằng `translationKey`.
3. Truyền `canonicalUrl` và `alternateUrls` thật xuống `BlogPost`.

**Ví dụ**

```ts
// src/pages/blog/[slug].astro
const allPosts = await getCollection('blog');
const entry = allPosts.find((post) => post.slug === slug);

const translations = entry?.data.translationKey
  ? allPosts.filter((post) => post.data.translationKey === entry.data.translationKey)
  : [];

const viPost = translations.find((post) => post.data.lang === 'vi');
const enPost = translations.find((post) => post.data.lang === 'en');

const siteUrl = import.meta.env.PUBLIC_SITE_URL || Astro.url.origin;
const alternateUrls = {
  vi: viPost ? `${siteUrl}/blog/${viPost.slug}?lang=vi` : undefined,
  en: enPost ? `${siteUrl}/blog/${enPost.slug}?lang=en` : undefined,
  default: viPost ? `${siteUrl}/blog/${viPost.slug}` : undefined,
};
```

Sau đó truyền vào `BlogPost` và từ `BlogPost` truyền xuống `BaseLayout`.

### 5.4. Thêm RSS feed

**Packages**

```bash
npm i @astrojs/rss
```

**File cần tạo**

- `src/pages/rss.xml.ts`

**Ví dụ**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'vi');

  return rss({
    title: 'Loc Nguyen Blog',
    description: 'Bài viết về lập trình, AI, công việc và phát triển bản thân.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description ?? '',
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}?lang=${post.data.lang}`,
      })),
  });
}
```

**Thêm auto-discovery**

- Trong `SEO.astro`, thêm:

```astro
<link rel="alternate" type="application/rss+xml" title="RSS" href={`${siteUrl}/rss.xml`} />
```

### 5.5. Chuẩn hóa tooling DX

**Packages đề xuất**

```bash
npm i -D eslint prettier prettier-plugin-astro eslint-plugin-astro @typescript-eslint/parser @typescript-eslint/eslint-plugin vitest playwright
```

**Scripts đề xuất**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

### 5.6. Gợi ý search tĩnh với Pagefind

**Vì sao chọn Pagefind**

- Phù hợp blog static.
- Không cần backend.
- Index rất tốt cho Astro build pipeline.

**Cách làm**

1. Cài Pagefind CLI.
2. Build Astro trước.
3. Chạy Pagefind trên thư mục output.
4. Tạo `SearchDialog.astro` để query index.

**Pseudo flow**

```json
{
  "scripts": {
    "build": "astro check && astro build && pagefind --site dist"
  }
}
```

## Tài liệu Astro chính thức nên bám theo

- Content Collections: https://docs.astro.build/en/guides/content-collections/
- Images: https://docs.astro.build/en/guides/images/
- RSS: https://docs.astro.build/en/recipes/rss/
- Template directives: https://docs.astro.build/en/reference/directives-reference/
- View transitions / routing UX: https://docs.astro.build/en/guides/view-transitions/

## Kết luận

Repo này đã có nền khá ổn cho một personal blog Astro hiện đại: Content Collections, Astro Image, SEO component, sitemap, JSON-LD, topic/category clusters. Tuy nhiên, để đạt mức production-quality “strict Astro blog 2026”, cần ưu tiên 5 việc:

1. Tách content query layer typed.
2. Sửa hreflang/canonical cho bài viết bilingual.
3. Chuyển `coverImage` sang `image()` helper + local image assets.
4. Cải thiện a11y cho dropdown/drawer/menu.
5. Bổ sung RSS, lint/format/test và giảm phụ thuộc vào server output nếu không thật sự cần SSR.

Nếu làm tốt 5 việc này, codebase sẽ bền hơn đáng kể cho các tính năng sắp tới như search, tags, analytics, comments tối ưu và i18n chuẩn.

## Nhật ký triển khai

### Hạng mục 1: Tách query layer typed cho content

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Tạo query layer mới:
  - [src/lib/content/posts.ts](/Users/nguyenhuuloc/Documents/blog/src/lib/content/posts.ts)
  - [src/lib/content/books.ts](/Users/nguyenhuuloc/Documents/blog/src/lib/content/books.ts)
- Refactor các page đang lặp `getCollection/filter/sort/count` sang helper typed:
  - [src/pages/index.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/index.astro)
  - [src/pages/blog/index.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/blog/index.astro)
  - [src/pages/blog/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/blog/[slug].astro)
  - [src/pages/books.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books.astro)
  - [src/pages/books/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books/[slug].astro)
  - [src/pages/categories/index.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/categories/index.astro)
  - [src/pages/categories/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/categories/[slug].astro)
  - [src/pages/topics/index.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/topics/index.astro)
  - [src/pages/topics/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/topics/[slug].astro)
- Loại bỏ nhiều `any[]` và thay bằng `CollectionEntry<'blog'>` / `CollectionEntry<'books'>`.

Kiểm tra:

- `npm run build` pass sau refactor.

Ghi chú:

- Hạng mục này mới xử lý phần lặp logic ở page/query layer.
- `BaseLayout` và `BlogPost` vẫn còn logic nặng, sẽ tiếp tục ở các hạng mục sau nếu cần tách thêm.

### Hạng mục 2: Sửa SEO detail pages, thêm RSS và fallback social image

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Sửa `canonicalUrl` và `alternateUrls` cho blog post detail dựa trên `translationKey` thật:
  - [src/pages/blog/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/blog/[slug].astro)
  - [src/layouts/BlogPost.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BlogPost.astro)
- Cập nhật SEO component để:
  - dùng fallback social image hợp lệ
  - expose RSS discovery link
  - file: [src/components/SEO.astro](/Users/nguyenhuuloc/Documents/blog/src/components/SEO.astro)
- Thêm RSS feed route:
  - [src/pages/rss.xml.ts](/Users/nguyenhuuloc/Documents/blog/src/pages/rss.xml.ts)
- Thêm social preview image mặc định:
  - [public/images/og-default.svg](/Users/nguyenhuuloc/Documents/blog/public/images/og-default.svg)
- Thêm dependency:
  - `@astrojs/rss` trong [package.json](/Users/nguyenhuuloc/Documents/blog/package.json)

Kiểm tra:

- `npm run build` pass sau khi thêm RSS và sửa props SEO.

Ghi chú:

- Hạng mục này sửa đúng lỗi `hreflang`/alternate trước đó ở bài viết bilingual.
- Books detail vẫn chưa có structured data riêng kiểu `Book` / `Review`; có thể xử lý ở vòng tiếp theo nếu đưa vào phạm vi SEO sâu hơn.

### Hạng mục 3: Sửa accessibility cho menu/drawer, landmark 404 và breadcrumb sách

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Nâng cấp semantics + state cho theme dropdown:
  - `aria-haspopup`, `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitemradio"`, `aria-checked`
  - file: [src/components/ThemeToggle.astro](/Users/nguyenhuuloc/Documents/blog/src/components/ThemeToggle.astro)
- Nâng cấp semantics + state cho language dropdown:
  - file: [src/components/LanguageSwitcher.astro](/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro)
- Thêm dialog semantics + focus handling cho mobile menu:
  - `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-expanded`
  - focus return + tab loop cơ bản
  - file: [src/layouts/BaseLayout.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro)
- Thêm dialog semantics + focus handling cho TOC drawer mobile:
  - file: [src/components/TableOfContents.astro](/Users/nguyenhuuloc/Documents/blog/src/components/TableOfContents.astro)
- Sửa landmark 404:
  - đổi nested `<main>` thành `<section>`
  - file: [src/pages/404.astro](/Users/nguyenhuuloc/Documents/blog/src/pages/404.astro)
- Sửa breadcrumb sách để không còn link tới `?category=` chưa được hỗ trợ:
  - file: [src/utils/breadcrumbs.ts](/Users/nguyenhuuloc/Documents/blog/src/utils/breadcrumbs.ts)

Kiểm tra:

- `npm run build` pass sau các thay đổi accessibility.

Ghi chú:

- Focus trap hiện tại là mức “cơ bản nhưng đúng hướng”; nếu sau này menu/drawer phức tạp hơn, nên tách ra helper chung hoặc dùng pattern component chuẩn hóa hơn.

### Hạng mục 4: Chuyển cover image sang Astro Content Collections `image()`

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Nâng schema content collections để `coverImage` dùng `image()` thay vì `z.string()`:
  - [src/content/config.ts](/Users/nguyenhuuloc/Documents/blog/src/content/config.ts)
- Chuyển toàn bộ frontmatter của blog/books từ đường dẫn `public/` sang asset local đồng vị trí với content:
  - [src/content/blog](/Users/nguyenhuuloc/Documents/blog/src/content/blog)
  - [src/content/books](/Users/nguyenhuuloc/Documents/blog/src/content/books)
  - asset mới đặt tại:
    - [src/content/blog/_images](/Users/nguyenhuuloc/Documents/blog/src/content/blog/_images)
    - [src/content/books/_images](/Users/nguyenhuuloc/Documents/blog/src/content/books/_images)
- Cập nhật type surface để nhận `ImageMetadata` thay vì giả định `string`:
  - [src/components/SEO.astro](/Users/nguyenhuuloc/Documents/blog/src/components/SEO.astro)
  - [src/layouts/BaseLayout.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro)
  - [src/components/BookCard.astro](/Users/nguyenhuuloc/Documents/blog/src/components/BookCard.astro)
- Sửa logic tạo absolute OG image URL để hoạt động đúng cho cả `string` lẫn `ImageMetadata.src`:
  - [src/components/SEO.astro](/Users/nguyenhuuloc/Documents/blog/src/components/SEO.astro)

Kiểm tra:

- `npm run build` pass sau migration schema + asset local.

Lợi ích đạt được:

- Cover image của content giờ được Astro kiểm tra ở schema level.
- `<Image />` render từ metadata local thay vì string path, giúp tối ưu asset đúng chuẩn hơn và an toàn type hơn.
- Loại lỗi “đường dẫn ảnh tồn tại trong frontmatter nhưng file thực tế không resolve được” sẽ bị phát hiện sớm ngay ở build.

### Hạng mục 5: Bổ sung SEO chuyên biệt cho trang sách detail

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Bổ sung canonical URL và alternate URL EN/VI chính xác cho books detail dựa trên localized sibling cùng base slug:
  - [src/pages/books/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books/[slug].astro)
- Truyền `image`, `imageAlt`, `canonicalUrl`, `alternateUrls` vào layout để Open Graph/Twitter cards của trang sách không còn chỉ dựa vào fallback chung:
  - [src/pages/books/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books/[slug].astro)
- Thêm structured data riêng cho trang sách:
  - `@type: Book`
  - `@type: Review`
  - gồm `name`, `author`, `image`, `reviewBody`, `reviewRating`, `inLanguage`, `url`
  - file: [src/pages/books/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books/[slug].astro)

Kiểm tra:

- `npm run build` pass sau khi thêm JSON-LD và alternate URLs cho books detail.

Lợi ích đạt được:

- Search engine có thêm tín hiệu ngữ nghĩa đúng cho trang review sách thay vì chỉ thấy generic `WebPage`.
- Books detail có social preview image chính xác thay vì phụ thuộc fallback.
- Hreflang/canonical của nội dung sách song ngữ nhất quán hơn với phần blog detail đã sửa trước đó.

### Hạng mục 6: Bổ sung DX tooling với ESLint và Prettier

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Thêm script DX chuẩn trong [package.json](/Users/nguyenhuuloc/Documents/blog/package.json):
  - `check`
  - `lint`
  - `lint:fix`
  - `format`
  - `format:check`
- Thêm ESLint flat config cho Astro + TypeScript + a11y:
  - [eslint.config.mjs](/Users/nguyenhuuloc/Documents/blog/eslint.config.mjs)
- Thêm Prettier config và ignore:
  - [.prettierrc.json](/Users/nguyenhuuloc/Documents/blog/.prettierrc.json)
  - [.prettierignore](/Users/nguyenhuuloc/Documents/blog/.prettierignore)
- Sửa các lint issue thực tế để baseline mới pass sạch:
  - bỏ `require()` trong [tailwind.config.mjs](/Users/nguyenhuuloc/Documents/blog/tailwind.config.mjs)
  - sửa `prefer-const` ở [src/components/LanguageSwitcher.astro](/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro) và [src/layouts/BaseLayout.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro)
  - đổi `env.d.ts` sang import-style reference ở [src/env.d.ts](/Users/nguyenhuuloc/Documents/blog/src/env.d.ts)
  - bỏ các `as any` không cần thiết ở [src/components/BookCard.astro](/Users/nguyenhuuloc/Documents/blog/src/components/BookCard.astro) và [src/pages/books/[slug].astro](/Users/nguyenhuuloc/Documents/blog/src/pages/books/[slug].astro)

Kiểm tra:

- `npm run lint` pass.
- `npm run build` pass.

Lợi ích đạt được:

- Repo có guardrail rõ ràng để chặn lỗi cú pháp/style/a11y từ sớm.
- Các file config/runtime hiện không còn mang lint debt ngay từ lúc introduce tooling.
- Team có thể đưa `lint` và `format:check` vào CI mà không cần cleanup thủ công thêm trước mắt.

### Hạng mục 7: Giảm duplication trong `BlogPost` và lazy-load comments

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Tách view counter khỏi inline script trong layout thành component riêng:
  - [src/components/ViewCounter.astro](/Users/nguyenhuuloc/Documents/blog/src/components/ViewCounter.astro)
  - dùng lại utility [src/utils/viewCounter.ts](/Users/nguyenhuuloc/Documents/blog/src/utils/viewCounter.ts)
- Tách Giscus comments thành component riêng và chuyển sang lazy-load theo hành động người dùng:
  - [src/components/Comments.astro](/Users/nguyenhuuloc/Documents/blog/src/components/Comments.astro)
- Làm gọn [src/layouts/BlogPost.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BlogPost.astro):
  - bỏ inline script view counter
  - bỏ block script Giscus eager
  - thay bằng `ViewCounter` và `Comments`
- Xóa dead component không còn được dùng:
  - [src/components/DarkModeToggle.astro](/Users/nguyenhuuloc/Documents/blog/src/components/DarkModeToggle.astro)

Kiểm tra:

- `npm run lint` pass.
- `npm run build` pass.

Lợi ích đạt được:

- `BlogPost` bớt gánh logic client-side, dễ đọc và dễ bảo trì hơn.
- Script Giscus không còn tải eager cho mọi pageview của bài viết; chỉ tải khi người dùng thực sự muốn mở comments.
- View counter không còn duplicate logic inline, tránh drift với utility riêng.

### Hạng mục 8: Loại bỏ heuristic đổi slug khi switch ngôn ngữ

Trạng thái: **Đã hoàn thành**

Đã thực hiện:

- Tạo helper client-side dùng chung cho language switching:
  - [src/utils/languageSwitch.ts](/Users/nguyenhuuloc/Documents/blog/src/utils/languageSwitch.ts)
- Cập nhật desktop language switcher để ưu tiên exact alternate URL từ page metadata, fallback mới tới query param:
  - [src/components/LanguageSwitcher.astro](/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro)
- Cập nhật mobile language switcher trong layout dùng cùng helper, bỏ hoàn toàn logic đoán `.en/.vi` bằng string replace:
  - [src/layouts/BaseLayout.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro)
- Đưa alternate URLs xuống `body[data-alternate-vi|en]` để client scripts dùng chung source of truth:
  - [src/layouts/BaseLayout.astro](/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro)

Kiểm tra:

- `npm run lint` pass.
- `npm run build` pass.

Lợi ích đạt được:

- Bỏ duplication logic đổi slug ở cả desktop và mobile menu.
- Giảm rủi ro redirect sai cho content song ngữ có slug khác nhau thật, nhất là khi không còn phụ thuộc suffix heuristic.
- Language switching giờ nhất quán hơn với `canonical`/`alternateUrls` đã được sửa ở các hạng mục SEO trước đó.
