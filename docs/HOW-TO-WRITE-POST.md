# Hướng dẫn viết bài mới

> Cập nhật 10/2026. Bản đầy đủ (giọng văn, luật riêng tư, mẫu PR) ở [CLAUDE.md](../CLAUDE.md).

## 1. Tạo khung bài

```bash
git checkout -b post/<slug>
npm run new-post -- <slug> --category personal --topics career,learning \
  --title-vi "Tiêu Đề Tiếng Việt" --title-en "English Title"
```

Lệnh tạo **cặp** file, luôn ở `draft: true`:

- `src/content/blog/<slug>.vi.mdx`
- `src/content/blog/<slug>.en.mdx`

Hai file dùng chung `translationKey` (mặc định bằng slug), `pubDate`, `category`, `topics`.

## 2. Viết nội dung

Thay mọi chỗ `[[VIẾT …]]` / `[[WRITE …]]`. Cấu trúc gợi ý đã có sẵn trong khung: mở bài, "Câu trả lời ngắn", các mục chính, kết, "Câu hỏi thường gặp" (khớp `faqs` trong frontmatter).

## 3. Ảnh bìa

- Đặt ảnh vào `src/content/blog/_images/` (không dùng `public/images/` nữa).
- 1200×675, ≤ 500 KB, ưu tiên `.webp` hoặc `.jpg`.
- Sửa `coverImage: "./_images/<file>"` và `coverAlt` ở **cả hai** file.

## 4. Kiểm tra

```bash
npm run validate:content   # cặp vi/en, topics, ảnh, mô tả, draft
npm run verify             # + astro check, lint, test
```

## 5. Đăng

1. Push nhánh, mở PR. CI chạy kiểm tra + build; Vercel tạo bản preview.
2. Xem preview. Duyệt xong thì đổi `draft: false` ở **cả hai** file, commit.
3. Merge vào `main` → Vercel deploy production.

## Tham khảo nhanh

| Field         | Giá trị                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| `category`    | `programming` · `lifestyle` · `personal`                                                                    |
| `topics`      | `ai` · `career` · `programming` · `learning` (thêm mới ở `src/utils/topicSlugs.ts` + `src/utils/topics.ts`) |
| `description` | 50–170 ký tự                                                                                                |
| `lang`        | `vi` / `en`, khớp đuôi file                                                                                 |
