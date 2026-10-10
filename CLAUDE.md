# Hướng dẫn cho AI viết bài trên devjournal.fun

Blog cá nhân song ngữ (Việt / Anh) của Lộc (Nguyễn Hữu Lộc), chạy Astro 5 + MDX, deploy Vercel.
Đọc file này trước khi tạo hoặc sửa bài. Lộc nói tiếng Việt; trả lời Lộc bằng tiếng Việt.

## Luật cứng

1. **Không bao giờ push thẳng lên `main`.** Push lên `main` = lên production ngay. Mỗi bài một nhánh `post/<slug>`, mở PR, Lộc xem bản preview của Vercel rồi tự merge.
2. **Bài mới luôn `draft: true`.** Chỉ đổi sang `false` (ở **cả hai** file vi và en) khi Lộc nói rõ "đăng" hoặc "duyệt".
3. **Riêng tư** (xem mục dưới). Không có ngoại lệ ngầm.
4. **Không bịa:** không số liệu, trích dẫn, nghiên cứu hay câu chuyện không có thật. Số liệu bên ngoài phải có link nguồn trong mục "Nguồn tham khảo". Chuyện cá nhân chỉ lấy từ điều Lộc đã kể.
5. `npm run validate:content` phải không có lỗi trước khi mở PR.

## Riêng tư: dữ liệu từ repo `hanh-trinh`

Repo `~/Documents/hanh-trinh` là bộ não thứ hai riêng tư của Lộc. Được dùng làm chất liệu, nhưng **không đưa lên blog** những thứ sau khi Lộc chưa duyệt từng mục:

- Con số lương, tài sản, tiền tiết kiệm, chi tiêu, số dư chứng khoán.
- Tên người thật (thầy, bạn, đồng nghiệp, người thân, người bỏ vốn) và chuyện tình cảm.
- Chuyện nội bộ công ty: tên khách hàng, nhân sự nghỉ việc, lương đồng nghiệp, chi tiết dự án nội bộ.
- Giấy tờ, số định danh, điểm thi chi tiết, sức khoẻ, hoàn cảnh gia đình.

Cách làm: khái quát hoá ("một người thầy hướng dẫn", "công ty tôi đang làm", "tài sản đứng yên gần một năm"). Trong mô tả PR luôn có mục **"Thông tin cá nhân dùng trong bài"** liệt kê mọi chi tiết đời thật để Lộc duyệt.

## Quy trình viết một bài

```bash
git checkout main && git pull
git checkout -b post/<slug>
npm run new-post -- <slug> --category <programming|lifestyle|personal> --topics <ai,career,...> \
  --title-vi "..." --title-en "..."
# viết nội dung vào src/content/blog/<slug>.vi.mdx và .en.mdx
# đặt ảnh bìa vào src/content/blog/_images/<slug>.<webp|jpg|png>, sửa coverImage ở cả hai file
npm run validate:content
npm run check && npm run test
git add -A && git commit -m "post: <slug> (draft)"
git push -u origin post/<slug>
gh pr create --fill   # rồi sửa mô tả theo mẫu ở cuối file
```

`npm run build` trên máy Lộc có thể lỗi vì thư viện ảnh `sharp` cài không được; CI trên GitHub và Vercel vẫn build. Đừng sửa cấu hình build để né lỗi này.

## File và frontmatter

- Mỗi bài là **một cặp** `src/content/blog/<slug>.vi.mdx` + `<slug>.en.mdx`, cùng `translationKey`, cùng `pubDate`, `category`, `topics`, `draft`.
- `slug`: chữ thường không dấu, gạch nối, ngắn, có từ khoá. URL công khai là `/vi/blog/<slug>` và `/en/blog/<slug>`.
- `category`: `programming` · `lifestyle` · `personal`.
- `topics`: một hoặc nhiều trong `src/utils/topicSlugs.ts` (`ai`, `career`, `programming`, `learning`). Muốn thêm topic mới: hỏi Lộc trước, rồi thêm slug vào `topicSlugs.ts` và mục tương ứng trong `TOPICS` (`src/utils/topics.ts`).
- `description`: 50–170 ký tự, nói rõ người đọc nhận được gì. Đây là meta description.
- `coverImage`: đường dẫn tương đối `./_images/<file>`, 1200×675 (16:9), **≤ 500 KB** (ưu tiên `.webp`/`.jpg`). `coverAlt` mô tả nội dung ảnh, không để "Cover image".
- `faqs`: 3 câu hỏi người đọc thật sự hay hỏi. Nội dung phải **giống hệt** mục "Câu hỏi thường gặp" cuối bài (dùng cho dữ liệu có cấu trúc FAQ).
- `author: "Loc Nguyen"`. `modifiedDate` chỉ thêm khi sửa nội dung đáng kể sau khi đăng.
- Ảnh trong thân bài: đặt cạnh ảnh bìa trong `_images/`, dùng đường dẫn tương đối. Không thêm ảnh vào `public/images/`.

## Giọng văn và cấu trúc (rút ra từ các bài đã đăng)

**Giọng:**

- Kể từ trải nghiệm thật, xưng **"tôi"**, nói với người đọc là **"bạn"**. Thẳng, ấm, không lên giọng dạy đời.
- Câu ngắn, đoạn 1–3 câu. Dùng con số cụ thể ("8 tiếng", "3 giờ buổi tối") thay vì tính từ chung chung.
- Người đọc chính: người làm IT trẻ, đi làm văn phòng, tự học, muốn tiến lên mà không có ai dẫn đường.

**Cấu trúc thường dùng:**

1. Mở bài 2–4 đoạn: một tình huống thật.
2. `## Câu trả lời ngắn`: **một câu trả lời in đậm** cho câu hỏi chính của bài, rồi 1–2 câu giải thích.
3. 3–6 mục `##` (có thể đánh số `## 1) ...` khi là các bước/ý song song), dùng danh sách khi liệt kê.
4. Kết: một hành động nhỏ người đọc làm được ngay.
5. `## Câu hỏi thường gặp` với 3 mục `###`, khớp `faqs`.
6. `## Nguồn tham khảo` nếu có dữ kiện bên ngoài (chỉ link thật).

Độ dài 1.200–2.500 chữ. Tiêu đề tiếng Việt viết hoa chữ cái đầu mỗi từ như các bài cũ.

**Bản tiếng Anh:** viết lại tự nhiên cho người đọc tiếng Anh, không dịch từng chữ. Tiêu đề mục: `## Short answer`, `## Frequently asked questions`, `## References`. Giữ cùng ý, cùng cấu trúc, cùng số FAQ.

## Kiểm tra

| Lệnh                       | Kiểm tra                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run validate:content` | Cặp vi/en, topics, ảnh tồn tại và dung lượng, mô tả, draft, ảnh bìa tạm, đánh dấu `[[VIẾT…]]` còn sót |
| `npm run check`            | Kiểu dữ liệu + schema frontmatter (zod)                                                               |
| `npm run test`             | Unit test                                                                                             |
| `npm run verify`           | Cả ba lệnh trên + lint                                                                                |

CI (`.github/workflows/ci.yml`) chạy kiểm tra nội dung, lint, test và build trên mọi PR.

## Mẫu mô tả PR cho bài viết

```markdown
## Bài viết

- Tiêu đề (vi / en):
- Slug, category, topics:
- Trạng thái: draft (chưa đăng)

## Thông tin cá nhân dùng trong bài

- (liệt kê từng chi tiết đời thật: con số, sự kiện, người; ghi "không có" nếu không có)

## Nguồn

- (link nguồn cho mọi số liệu bên ngoài)

## Cần Lộc quyết

- (ảnh bìa, tiêu đề, đoạn nào chưa chắc)
```
