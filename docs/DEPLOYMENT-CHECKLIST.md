# Next Steps - SEO Deployment Checklist

## ✅ Đã hoàn thành (Local)
- [x] Cấu hình domain `devjournal.fun` trong `astro.config.mjs`
- [x] Cập nhật `robots.txt` với sitemap URL
- [x] Cập nhật `.env.example` với thông tin site
- [x] Tài liệu SEO implementation đầy đủ

## 🚀 Bước tiếp theo (Deploy to Vercel)

### 1. Add Domain to Vercel
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project → Settings → Domains
3. Add domain: `devjournal.fun`
4. Add www subdomain: `www.devjournal.fun` (optional)
5. Follow DNS configuration instructions

### 2. Configure Environment Variables on Vercel
Vào Settings → Environment Variables, thêm:

```
PUBLIC_SITE_URL = https://devjournal.fun
PUBLIC_SITE_NAME = Dev Journal  
PUBLIC_AUTHOR_NAME = Nguyen Huu Loc
```

Áp dụng cho: **Production, Preview, Development**

### 3. Deploy
```bash
# Commit changes
git add .
git commit -m "feat: configure SEO with devjournal.fun domain"
git push origin main
```

Vercel sẽ tự động deploy.

### 4. Verify Build
Sau khi deploy, kiểm tra:
- ✅ `https://devjournal.fun/sitemap-index.xml` - Sitemap có load được không
- ✅ `https://devjournal.fun/robots.txt` - Robots.txt có đúng không
- ✅ View source bất kỳ trang nào → tìm `<script type="application/ld+json">` - JSON-LD schema
- ✅ Open Graph tags có domain đúng không

### 5. Submit to Google Search Console
1. Truy cập [Google Search Console](https://search.google.com/search-console)
2. Add property: `devjournal.fun`
3. Verify ownership (DNS TXT record hoặc HTML file)
4. Sitemaps → Add sitemap: `https://devjournal.fun/sitemap-index.xml`
5. URL Inspection → Request indexing cho homepage

### 6. Test Rich Results
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Nhập URL: `https://devjournal.fun/blog/any-post`
3. Xác nhận BlogPosting schema được detect

### 7. Social Media Preview Test
- **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: Share URL và xem preview

### 8. Monitor Performance
Vào Vercel Dashboard:
1. Analytics → Check traffic
2. Speed Insights → Core Web Vitals
3. Ensure all metrics are in "Good" range (green)

## 📋 Optional But Recommended

### Create Default OG Image
Tạo file: `public/images/og-default.jpg`
- Kích thước: **1200x630px**
- Format: JPG hoặc PNG
- Nội dung: Logo/Brand + tagline của blog
- Tools: [Canva](https://canva.com), Figma, hoặc [OG Image Generator](https://og-image.vercel.app/)

### Setup Giscus Comments
1. Truy cập [giscus.app](https://giscus.app/)
2. Chọn repository cho comments
3. Enable Discussions trong GitHub repo
4. Copy các IDs và update vào Vercel Environment Variables:
   - `PUBLIC_GISCUS_REPO`
   - `PUBLIC_GISCUS_REPO_ID`
   - `PUBLIC_GISCUS_CATEGORY`
   - `PUBLIC_GISCUS_CATEGORY_ID`

## 🎯 Success Criteria

Sau khi hoàn thành tất cả bước:
- ✅ Site accessible tại `https://devjournal.fun`
- ✅ Sitemap submitted và indexed trong Google Search Console
- ✅ Rich snippets hiển thị đúng trên Google (có thể mất vài tuần)
- ✅ Social media previews đẹp khi share links
- ✅ Core Web Vitals trong vùng "Good"

---

**Domain**: devjournal.fun  
**Created**: 2026-02-27  
**Status**: ⏳ Ready for deployment
