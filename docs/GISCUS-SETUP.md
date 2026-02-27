# Hướng Dẫn Cấu Hình Giscus Comments

## 📝 Giscus là gì?

Giscus là hệ thống comment dựa trên **GitHub Discussions**, cho phép người dùng comment bằng GitHub account của họ. Comments được lưu trong GitHub Discussions của repository.

**Ưu điểm:**
- ✅ Free 100%
- ✅ Không cần database
- ✅ Spam protection tốt (qua GitHub)
- ✅ Hỗ trợ Markdown, emoji, reactions
- ✅ Dark mode tự động

---

## 🚀 Bước 1: Chuẩn Bị Repository

### 1.1. Repository phải PUBLIC
Giscus chỉ hoạt động với **public repository**. Kiểm tra:
- Vào GitHub repo: `https://github.com/YOUR_USERNAME/YOUR_REPO`
- Settings → Scroll xuống → Danger Zone → Make sure it's **Public**

### 1.2. Enable Discussions
1. Vào repository trên GitHub
2. Click tab **Settings**
3. Scroll xuống phần **Features**
4. Tích vào ☑️ **Discussions**

![Enable Discussions](https://docs.github.com/assets/cb-58987/images/help/discussions/enabling-or-disabling-github-discussions-for-a-repository.png)

---

## 🔧 Bước 2: Cài Đặt Giscus App

### 2.1. Install Giscus GitHub App
1. Truy cập: **https://github.com/apps/giscus**
2. Click nút **Install** (màu xanh lá)
3. Chọn repository của bạn:
   - **Option 1**: All repositories (không recommend)
   - **Option 2**: Only select repositories → Chọn blog repo của bạn
4. Click **Install**
5. Authorize app

### 2.2. Verify Installation
Sau khi install, kiểm tra:
- Vào **Settings** → **Integrations** → **Applications**
- Bạn sẽ thấy **giscus** trong danh sách Installed GitHub Apps

---

## ⚙️ Bước 3: Generate Configuration

### 3.1. Truy cập Giscus Configuration Tool
Mở: **https://giscus.app**

### 3.2. Điền thông tin Repository

#### **Language** (Ngôn ngữ)
Chọn **Tiếng Việt** hoặc **English** (sẽ dynamic trong code sau)

#### **Repository**
Nhập repository của bạn theo format:
```
your-username/your-repo
```
Ví dụ:
```
nguyenhuuloc/blog
```

Nếu thấy ✅ **Success!** → Repository đã đúng, Discussions đã enabled, Giscus đã installed

#### **Page ↔️ Discussions Mapping**
Chọn cách map URL với Discussions:
- 👉 **pathname** (Recommended) - Tạo discussion dựa trên đường dẫn
- url - Tạo dựa trên full URL
- title - Tạo dựa trên title
- og:title - Dựa trên Open Graph title

**Chọn `pathname`** - tốt nhất cho blog

#### **Discussion Category**
Chọn category để lưu comments:
- 👉 **General** (Recommended)
- Announcements
- Show and tell
- Q&A

**Chọn `General`** hoặc tạo category mới "Blog Comments"

#### **Features**
Tích các box sau:
- ☑️ **Enable reactions for the main post** - Cho phép reaction
- ☐ Place the comment box above the comments (tùy chọn)
- ☑️ Load the comments lazily - Tải lazy cho performance

#### **Theme**
Chọn:
- 👉 **preferred_color_scheme** - Auto dark/light theo hệ thống

---

### 3.3. Copy Configuration

Sau khi điền xong, scroll xuống phần **Enable giscus**, bạn sẽ thấy đoạn script như này:

```html
<script src="https://giscus.app/client.js"
        data-repo="nguyenhuuloc/blog"
        data-repo-id="R_kgDOAbcDefg"
        data-category="General"
        data-category-id="DIC_kwDOAbcDefg4BcDef"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="vi"
        crossorigin="anonymous"
        async>
</script>
```

**📋 Copy các giá trị sau:**
- `data-repo` → Ví dụ: `nguyenhuuloc/blog`
- `data-repo-id` → Ví dụ: `R_kgDOAbcDefg`
- `data-category` → Ví dụ: `General`
- `data-category-id` → Ví dụ: `DIC_kwDOAbcDefg4BcDef`

---

## 🔨 Bước 4: Cập Nhật Code Blog

### 4.1. Tạo Environment Variables

Tạo file `.env` trong root project (nếu chưa có):

```bash
# Giscus Configuration
PUBLIC_GISCUS_REPO=nguyenhuuloc/blog
PUBLIC_GISCUS_REPO_ID=R_kgDOAbcDefg
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOAbcDefg4BcDef
```

**⚠️ Thay thế các giá trị bằng giá trị thực của bạn từ Bước 3.3!**

### 4.2. Update .env.example

Thêm vào file `.env.example`:

```bash
# Giscus Comments Configuration
# Generate at: https://giscus.app
PUBLIC_GISCUS_REPO=your-username/your-repo
PUBLIC_GISCUS_REPO_ID=YOUR_REPO_ID
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=YOUR_CATEGORY_ID
```

### 4.3. Update Vercel Environment Variables

Khi deploy lên Vercel:
1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Thêm 4 environment variables:
   - `PUBLIC_GISCUS_REPO`
   - `PUBLIC_GISCUS_REPO_ID`
   - `PUBLIC_GISCUS_CATEGORY`
   - `PUBLIC_GISCUS_CATEGORY_ID`
3. Apply cho: Production, Preview, Development
4. Redeploy

---

## ✅ Bước 5: Test

### 5.1. Local Testing
```bash
npm run dev
```

1. Mở blog post: `http://localhost:4322/blog/first-post.vi?lang=vi`
2. Scroll xuống phần Comments
3. Click **Sign in with GitHub**
4. Viết comment test
5. Check GitHub Discussions của repo → sẽ thấy discussion mới được tạo

### 5.2. Production Testing
Sau khi deploy:
1. Truy cập blog post trên production URL
2. Test comment
3. Verify discussion xuất hiện trong GitHub

---

## 🎨 Tùy Chỉnh Theme

Giscus sẽ tự động theo theme của blog (light/sepia/dark) nhờ `data-theme="preferred_color_scheme"`.

Nếu muốn custom theme:
- `light` - Light mode
- `dark` - Dark mode
- `dark_dimmed` - GitHub dimmed dark
- `transparent_dark` - Transparent dark
- `preferred_color_scheme` - Auto theo hệ thống

---

## 🐛 Troubleshooting

### ❌ Error: "giscus is not installed"
**Giải pháp:**
1. Verify repository là **PUBLIC**
2. Verify **Discussions** đã được enabled
3. Reinstall Giscus app: https://github.com/apps/giscus
4. Check repository access trong Giscus app settings

### ❌ Comments không hiển thị
**Kiểm tra:**
1. F12 → Console → Xem error messages
2. Verify environment variables đã được set đúng
3. Verify `data-repo-id` và `data-category-id` chính xác
4. Clear cache và reload page

### ❌ Wrong language
Code đã được update để auto-detect language từ URL param `?lang=vi` hoặc `?lang=en`

### ❌ Discussion không được tạo tự động
**Nguyên nhân:**
- `data-mapping="pathname"` → Cần pathname match exactly
- Có thể tạo manual discussion trước trong GitHub

**Giải pháp:**
- Để `data-strict="0"` → tự động tạo discussion nếu chưa có

---

## 📚 Tài Liệu Tham Khảo

- **Giscus Homepage**: https://giscus.app
- **GitHub App**: https://github.com/apps/giscus
- **Documentation**: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
- **Self-hosting Guide**: https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md

---

## 💡 Tips

1. **Moderation**: Bạn có thể moderate comments qua GitHub Discussions interface
2. **Notifications**: Bật GitHub notifications để nhận thông báo khi có comment mới
3. **Backup**: Comments được lưu trong GitHub, không lo mất data
4. **Migration**: Nếu đổi domain, comments vẫn giữ nguyên (vì dùng pathname mapping)
5. **Multiple Languages**: Code đã hỗ trợ auto language switching dựa trên `?lang=` param

---

**Chúc bạn setup thành công! 🎉**

Nếu có vấn đề, kiểm tra lại từng bước hoặc mở issue trên GitHub.
