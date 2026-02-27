# Hướng Dẫn Deploy Blog lên Vercel

## 🚀 Tổng Quan

Blog này được thiết kế để deploy lên **Vercel** - platform tối ưu cho Astro projects với:
- ✅ Free tier generous
- ✅ Auto SSL/HTTPS
- ✅ Global CDN
- ✅ Auto preview deployments
- ✅ SSR support (server-side rendering)

---

## 📋 Yêu Cầu Trước Khi Deploy

### 1. GitHub Repository
- ✅ Code đã được push lên GitHub
- ✅ Repository có thể là **public** hoặc **private** (Vercel support cả hai)

### 2. Vercel Account
- Tạo tài khoản miễn phí tại: **https://vercel.com/signup**
- Recommend: Đăng ký bằng GitHub account để dễ dàng import repos

### 3. Cấu Hình Environment Variables (Tùy chọn nhưng recommend)
Chuẩn bị các giá trị cho:
- `PUBLIC_SITE_URL` - Domain production của bạn
- Giscus configuration (nếu đã setup)

---

## 🔧 Bước 1: Chuẩn Bị Code

### 1.1. Kiểm tra build local
```bash
npm run build
```

Phải thấy:
```
✓ Completed in X.XXs
[build] Complete!
```

Nếu có lỗi → Fix trước khi deploy

### 1.2. Kiểm tra astro.config.mjs
Verify file [astro.config.mjs](../astro.config.mjs) có config đúng:

```javascript
export default defineConfig({
  output: 'server',  // ✅ SSR mode cho bilingual blog
  adapter: vercel({
    analytics: true,      // ✅ Vercel Analytics
    imageService: true,   // ✅ Image optimization
    functionPerRoute: false,
  }),
  // ...
});
```

### 1.3. Commit và Push
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## 🌟 Bước 2: Deploy lên Vercel

### Option A: Deploy qua Vercel Dashboard (Recommended cho lần đầu)

#### 2.1. Import Project
1. Truy cập: **https://vercel.com/new**
2. Click **Import Git Repository**
3. Chọn repository blog của bạn
4. Click **Import**

#### 2.2. Configure Project
Vercel sẽ auto-detect Astro và set:
- **Framework Preset**: Astro
- **Build Command**: `npm run build` hoặc `astro build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

✅ **Không cần thay đổi gì** - Vercel đã config đúng!

#### 2.3. Environment Variables (Quan trọng!)
Trước khi deploy, click **Environment Variables** và add:

| Key | Value | Example |
|-----|-------|---------|
| `PUBLIC_SITE_URL` | Production URL | `https://your-blog.vercel.app` |
| `PUBLIC_GISCUS_REPO` | Your GitHub repo | `nguyenhuuloc/blog` |
| `PUBLIC_GISCUS_REPO_ID` | From giscus.app | `R_kgDOL1234567` |
| `PUBLIC_GISCUS_CATEGORY` | Discussion category | `General` |
| `PUBLIC_GISCUS_CATEGORY_ID` | From giscus.app | `DIC_kwDOL1234567_4Cg` |

**Lưu ý:**
- Apply cho: ✅ Production, ✅ Preview, ✅ Development
- Nếu chưa có Giscus config → có thể skip, add sau

#### 2.4. Deploy!
1. Click **Deploy**
2. Đợi 1-2 phút
3. Thấy 🎉 **Congratulations!** → Done!

---

### Option B: Deploy qua Vercel CLI (Cho developers)

#### 2.1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2.2. Login
```bash
vercel login
```
Chọn login method (GitHub/Email)

#### 2.3. Deploy lần đầu
Trong thư mục project:
```bash
vercel
```

Trả lời các câu hỏi:
```
? Set up and deploy "~/Documents/blog"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? my-blog
? In which directory is your code located? ./
```

Vercel sẽ auto-detect Astro và deploy!

#### 2.4. Deploy Production
```bash
vercel --prod
```

---

## 🔄 Bước 3: Cấu Hình Sau Deploy

### 3.1. Custom Domain (Tùy chọn)

#### Nếu có domain riêng:
1. Vào Vercel Dashboard → Project → **Settings** → **Domains**
2. Add domain của bạn (vd: `yourblog.com`)
3. Follow hướng dẫn config DNS:
   - **A Record**: Point to Vercel IP
   - **CNAME**: Point to `cname.vercel-dns.com`
4. Đợi DNS propagate (5-30 phút)
5. ✅ Auto SSL được cấp!

#### Sử dụng subdomain Vercel (Miễn phí):
- Default: `your-project-name.vercel.app`
- Có thể đổi tên: Settings → Domains → Edit

### 3.2. Update Environment Variables

Nếu đã deploy nhưng quên add env vars:
1. **Settings** → **Environment Variables**
2. Add các variables cần thiết
3. **Deployments** → Latest deployment → **⋯** → **Redeploy**

### 3.3. Update PUBLIC_SITE_URL

Sau khi có production URL:
1. Copy URL production (vd: `https://my-blog.vercel.app`)
2. Update env var `PUBLIC_SITE_URL` = URL đó
3. Redeploy

---

## 🔍 Bước 4: Verify Deployment

### 4.1. Check Homepage
- Truy cập production URL
- Kiểm tra:
  - ✅ Homepage load
  - ✅ Theme switching (light/sepia/dark)
  - ✅ Language switching (EN/VI)

### 4.2. Check Blog Posts
- Click vào blog post
- Verify:
  - ✅ Content hiển thị đúng
  - ✅ Images load
  - ✅ Code highlighting hoạt động
  - ✅ Language switching giữ nguyên bài dịch tương ứng

### 4.3. Check Giscus Comments
- Scroll xuống blog post
- Verify:
  - ✅ Giscus widget hiển thị
  - ✅ "Sign in with GitHub" button hoạt động
  - ✅ Test comment (optional)

### 4.4. Check SEO
View page source (Ctrl+U / Cmd+Option+U):
```html
<!-- Verify các meta tags -->
<link rel="canonical" href="...">
<link rel="alternate" hreflang="vi" href="...">
<link rel="alternate" hreflang="en" href="...">
<meta property="og:title" content="...">
```

---

## 🚦 Auto Deployments

### Git Integration
Vercel tự động deploy khi:
- ✅ Push to `main` branch → **Production deployment**
- ✅ Push to other branches → **Preview deployment**
- ✅ Open PR → **Preview deployment** với comment link

### Preview Deployments
Mỗi commit có unique URL:
- Format: `your-project-git-branch-name.vercel.app`
- Perfect để test trước khi merge

### Rollback
Nếu deployment có issue:
1. **Deployments** tab
2. Find working deployment
3. Click **⋯** → **Promote to Production**

---

## 📊 Monitoring & Analytics

### Vercel Analytics
Nếu enable `analytics: true` trong config:
1. Tab **Analytics** trong dashboard
2. Xem:
   - Page views
   - Top pages
   - Top referrers
   - Real Experience Score

### Logs
Xem runtime logs:
1. **Deployments** → Click vào deployment
2. Tab **Runtime Logs**
3. Real-time logs của serverless functions

---

## ⚡ Performance Tips

### 1. Image Optimization
Vercel tự động optimize images nếu:
```javascript
adapter: vercel({
  imageService: true,  // ✅
})
```

### 2. Caching
Headers được set tự động:
- Static assets: `Cache-Control: public, max-age=31536000, immutable`
- HTML: `Cache-Control: public, max-age=0, must-revalidate`

### 3. Edge Functions (Advanced)
Nếu muốn deploy functions tại edge locations gần users:
```javascript
export const config = {
  runtime: 'edge',
};
```

---

## 🐛 Troubleshooting

### ❌ Build Failed
**Check:**
1. Vercel Deployment logs
2. Verify `npm run build` works locally
3. Check Node.js version (Vercel default: Node 18)
4. Environment variables đã set chưa

**Fix:**
- Settings → General → **Node.js Version** → Chọn compatible version

### ❌ 404 on Routes
**Nguyên nhân:** SSR routing issue

**Fix:**
Verify [astro.config.mjs](../astro.config.mjs):
```javascript
output: 'server',  // Phải là 'server', không phải 'static'
```

### ❌ Environment Variables không work
**Check:**
1. Settings → Environment Variables → Verify values
2. Check spelling: `PUBLIC_` prefix mandatory cho client-side vars
3. Redeploy sau khi add env vars

### ❌ Giscus không hiển thị
**Check:**
1. Browser Console (F12) → Check errors
2. Verify env vars: `PUBLIC_GISCUS_*`
3. Verify GitHub Discussions enabled
4. Verify Giscus app installed

### ❌ Images không load
**Check:**
1. Images ở trong `/public/` folder?
2. Path đúng chưa: `/images/...` (không phải `./images/...`)
3. Vercel Deployment logs → Check build output

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ❌ Không commit `.env` vào Git
- ✅ Chỉ commit `.env.example`
- ✅ Add `.env` vào `.gitignore`

### 2. API Keys
- Nếu có API keys → Chỉ set trong Vercel env vars
- Never hardcode trong code

### 3. HTTPS
- ✅ Vercel auto SSL cho tất cả deployments
- ✅ Force HTTPS enabled by default

---

## 📈 Next Steps

Sau khi deploy thành công:

### 1. Share Blog
- Copy production URL
- Share với friends/community
- Add link vào GitHub README

### 2. Custom Domain
- Mua domain (Namecheap, Cloudflare, etc.)
- Config trong Vercel
- Update `PUBLIC_SITE_URL`

### 3. SEO
- Submit sitemap: `https://yourblog.com/sitemap.xml`
- Google Search Console
- Bing Webmaster Tools

### 4. Analytics
- Enable Vercel Analytics
- Optional: Google Analytics, Plausible, etc.

### 5. Continuous Improvement
- Monitor performance
- Add more blog posts
- Improve SEO
- Add features

---

## 📚 Resources

### Official Documentation
- **Vercel Docs**: https://vercel.com/docs
- **Astro + Vercel**: https://docs.astro.build/en/guides/deploy/vercel/
- **Vercel CLI**: https://vercel.com/docs/cli

### Community
- **Astro Discord**: https://astro.build/chat
- **Vercel Community**: https://github.com/vercel/vercel/discussions

### Pricing
- **Free Tier**: https://vercel.com/pricing
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Auto SSL
  - Preview deployments

---

## ✅ Deployment Checklist

Trước khi deploy:
- [ ] `npm run build` thành công locally
- [ ] Code đã push lên GitHub
- [ ] `.env.example` updated với all variables
- [ ] README updated
- [ ] Giscus đã setup (nếu muốn comments)

Sau khi deploy:
- [ ] Homepage hoạt động
- [ ] Blog posts load đúng
- [ ] Language switching work
- [ ] Theme switching work
- [ ] Comments hiển thị (nếu có Giscus)
- [ ] SEO meta tags đúng
- [ ] Performance acceptable

---

**🎉 Chúc bạn deploy thành công!**

Nếu cần hỗ trợ, check Vercel logs hoặc hỏi thêm nhé!
