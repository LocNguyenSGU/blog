# Hướng dẫn viết blog post mới

## Bước 1: Chuẩn bị ảnh cover

1. Tạo hoặc tìm ảnh cover cho bài viết (khuyến nghị: 1200x675px, tỷ lệ 16:9)
2. Lưu ảnh vào thư mục `public/images/posts/`
3. Đặt tên file có ý nghĩa (ví dụ: `my-awesome-post.jpg`)

## Bước 2: Tạo file blog post

1. Tạo file `.mdx` mới trong `src/content/blog/`
2. Đặt tên file theo slug bài viết (ví dụ: `my-awesome-post.mdx`)

## Bước 3: Viết frontmatter

```mdx
---
title: "Tiêu đề bài viết của bạn"
description: "Mô tả ngắn gọn về bài viết"
pubDate: 2026-02-13
author: "Tên của bạn"
category: "programming"  # hoặc "lifestyle" hoặc "personal"
tags: ["tag1", "tag2", "tag3"]
coverImage: "/images/posts/my-awesome-post.jpg"
coverAlt: "Mô tả ảnh cho accessibility"
---
```

## Bước 4: Viết nội dung

Sau frontmatter, viết nội dung bằng Markdown thuần:

```mdx
# Heading chính

Đoạn văn bản của bạn...

## Subheading

- Bullet point 1
- Bullet point 2

### Code example

​```javascript
const hello = "world";
console.log(hello);
​```

## Kết luận

Tổng kết bài viết...
```

## Categories có sẵn

- `programming` - Màu xanh dương (lập trình, code, tutorial)
- `lifestyle` - Màu xanh lá (đời sống, tips, productivity)
- `personal` - Màu tím (cá nhân, suy nghĩ, chia sẻ)

## Ví dụ hoàn chỉnh

Xem các file trong `src/content/blog/` để tham khảo:
- `first-post.mdx`
- `markdown-guide.mdx`
- `coding-journey.mdx`

## Preview

```bash
npm run dev
```

Mở http://localhost:4321 để xem blog của bạn!

## Deploy

Khi push lên GitHub và connect với Vercel, mỗi commit sẽ tự động deploy.
