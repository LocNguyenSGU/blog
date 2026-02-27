# ⚡ Quick Deploy Checklist

## ✅ Pre-Deploy (5 phút)

### 1. Test Build
```bash
npm run build
```
- [ ] Build thành công không có errors

### 2. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
- [ ] Code đã push lên GitHub
- [ ] Repository có thể public hoặc private

### 3. Chuẩn bị Environment Variables

Copy các giá trị này (sẽ dùng ở bước sau):

```bash
# Required
PUBLIC_SITE_URL=https://your-blog.vercel.app  # Sẽ update sau khi deploy

# Optional (Giscus - nếu đã setup)
PUBLIC_GISCUS_REPO=your-username/your-repo
PUBLIC_GISCUS_REPO_ID=R_kgDO...
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDO...
```

---

## 🚀 Deploy (3 phút)

### 1. Import Project
1. Đi tới: **https://vercel.com/new**
2. Login bằng GitHub
3. Click **Import Git Repository**
4. Chọn repo blog của bạn
5. Click **Import**

### 2. Configure (Vercel tự động detect Astro)
- [x] Framework: Astro ✅ Auto-detected
- [x] Build Command: `npm run build` ✅ Auto
- [x] Output Directory: `dist` ✅ Auto

**→ Không cần thay đổi gì!**

### 3. Add Environment Variables
Click **Environment Variables**, add từng cái:

| Variable | Value |
|----------|-------|
| `PUBLIC_SITE_URL` | Để trống, update sau |
| `PUBLIC_GISCUS_REPO` | (nếu có) |
| `PUBLIC_GISCUS_REPO_ID` | (nếu có) |
| `PUBLIC_GISCUS_CATEGORY` | (nếu có) |
| `PUBLIC_GISCUS_CATEGORY_ID` | (nếu có) |

Apply cho: ✅ Production, ✅ Preview, ✅ Development

### 4. Deploy
- [ ] Click **Deploy**
- [ ] Đợi 1-2 phút ☕
- [ ] Thấy 🎉 Success!

---

## 📝 Post-Deploy (2 phút)

### 1. Copy Production URL
Ví dụ: `https://my-blog-abc123.vercel.app`

### 2. Update PUBLIC_SITE_URL
1. Vercel Dashboard → Settings → Environment Variables
2. Edit `PUBLIC_SITE_URL` → Paste production URL
3. Save

### 3. Redeploy
1. Tab **Deployments**
2. Latest deployment → Click **⋯** (3 dots)
3. **Redeploy**

---

## ✅ Verify (2 phút)

Visit production URL và test:

- [ ] Homepage loads
- [ ] Click blog post → Content hiển thị
- [ ] Switch theme (Light/Sepia/Dark) → Hoạt động
- [ ] Switch language (EN/VI) → Hoạt động
- [ ] Giscus comments (nếu setup) → Hiển thị

**🎉 Done! Blog đã online!**

---

## 🔄 Update Blog (Mỗi lần viết bài mới)

Cực kỳ đơn giản:

```bash
# 1. Tạo bài mới trong src/content/blog/
# 2. Commit & push
git add .
git commit -m "Add new post: Title"
git push

# 3. Vercel tự động deploy! ✨
```

Chờ ~1 phút → Bài mới đã online!

---

## 🐛 Troubleshooting

### Build failed?
Check Deployment Logs → Find error → Fix code → Push lại

### 404 errors?
Verify `astro.config.mjs` có `output: 'server'`

### Env vars không work?
Redeploy sau khi add env vars

### Giscus không hiển thị?
Check browser Console (F12) → Xem error message

---

## 📖 Need More Details?

Đọc full guide: **[docs/DEPLOYMENT.md](DEPLOYMENT.md)**

Giscus setup: **[docs/GISCUS-SETUP.md](GISCUS-SETUP.md)**

---

**Total Time: ~12 phút từ zero → deployed blog! 🚀**
