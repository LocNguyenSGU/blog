# 📝 My Bilingual Blog

A modern, bilingual (English/Vietnamese) blog built with Astro, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚀 **Astro SSR** - Fast server-side rendering with Vercel
- 🌏 **Bilingual** - Full English/Vietnamese support with URL-based switching
- 📝 **MDX Support** - Write blog posts in Markdown with JSX components
- 🎨 **Tailwind CSS** - Beautiful, responsive design with 3 themes (Light/Sepia/Dark)
- 💬 **Giscus Comments** - GitHub Discussions powered comments
- 🔤 **Custom Fonts** - Merriweather (headings), Inter (body), JetBrains Mono (code)
- ⚡ **TypeScript** - Type-safe development
- 🔍 **SEO Optimized** - Meta tags, Open Graph, hreflang for bilingual content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and add your values

# Start development server
npm run dev
```

Visit `http://localhost:4321` (or the port shown in terminal)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run astro check
```

## 📁 Project Structure

```
/
├── docs/                  # Documentation
│   ├── DEPLOYMENT.md      # Deployment guide
│   ├── GISCUS-SETUP.md    # Giscus setup guide
│   └── CODE-REVIEW-ISSUES.md
├── src/
│   ├── content/
│   │   ├── blog/          # Blog posts (MDX files)
│   │   │   ├── *.en.mdx   # English posts
│   │   │   └── *.vi.mdx   # Vietnamese posts
│   │   └── config.ts      # Content collections schema
│   ├── components/        # Astro components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes (index, blog, about, 404)
│   ├── styles/            # Global styles
│   ├── utils/             # Utilities (i18n, helpers)
│   └── env.d.ts
├── public/                # Static assets
│   └── images/
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variables template
└── package.json
```

## ✍️ Writing Blog Posts

### Creating a New Post

Create two files in `src/content/blog/` (one for each language):

**English version** (`my-post.en.mdx`):
```mdx
---
title: "Your Post Title"
description: "Post description"
pubDate: 2026-02-13
author: "Your Name"
category: "programming"
tags: ["astro", "web"]
coverImage: "/images/posts/cover.jpg"
coverAlt: "Cover image description"
lang: "en"
translationKey: "my-post"
---

Your content here...
```

**Vietnamese version** (`my-post.vi.mdx`):
```mdx
---
title: "Tiêu đề bài viết"
description: "Mô tả bài viết"
pubDate: 2026-02-13
author: "Tên bạn"
category: "programming"
tags: ["astro", "web"]
coverImage: "/images/posts/cover.jpg"
coverAlt: "Mô tả ảnh bìa"
lang: "vi"
translationKey: "my-post"
---

Nội dung của bạn...
```

**Important:** Use the same `translationKey` to link EN/VI versions!

### Categories
Available categories: `programming`, `lifestyle`, `personal`

See [docs/HOW-TO-WRITE-POST.md](docs/HOW-TO-WRITE-POST.md) for more details.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# Site URL (update for production)
PUBLIC_SITE_URL=http://localhost:4321

# Giscus Comments (optional - see docs/GISCUS-SETUP.md)
PUBLIC_GISCUS_REPO=your-username/your-repo
PUBLIC_GISCUS_REPO_ID=YOUR_REPO_ID
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=YOUR_CATEGORY_ID
```

### Giscus Comments Setup

Follow the detailed guide: **[docs/GISCUS-SETUP.md](docs/GISCUS-SETUP.md)**

Quick steps:
1. Enable GitHub Discussions in your repo
2. Install [Giscus app](https://github.com/apps/giscus)
3. Generate config at [giscus.app](https://giscus.app)
4. Add env variables to `.env`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

**Quick Deploy:**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

**Full Guide:** See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for detailed instructions including:
- Step-by-step deployment
- Custom domain setup
- Environment variables configuration
- Troubleshooting
- Performance tips

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

### Other Platforms

The blog can also be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any platform supporting Node.js SSR

Update `adapter` in `astro.config.mjs` accordingly.

## 🎨 Theme System

The blog includes 3 beautiful themes:
- **Light** - Clean, bright theme
- **Sepia** - Warm, paper-like reading experience
- **Dark** - Easy on the eyes

Themes are persisted in localStorage and sync across tabs.

## 🌍 Internationalization (i18n)

### Language Switching
- URL-based: `?lang=en` or `?lang=vi`
- Automatic translation switching on blog posts
- Preserved in localStorage
- SEO-friendly with hreflang tags

### Adding Translations
Edit `src/utils/i18n.ts` to add/modify translations for UI text.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build) 5.0
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 3.4
- **Content:** [MDX](https://mdxjs.com)
- **Fonts:** Merriweather, Inter, JetBrains Mono
- **Comments:** [Giscus](https://giscus.app)
- **Deployment:** [Vercel](https://vercel.com)
- **Type Safety:** TypeScript 5.6

## 📚 Documentation

- **[Deployment Guide](docs/DEPLOYMENT.md)** - Complete deployment instructions
- **[Giscus Setup](docs/GISCUS-SETUP.md)** - Configure GitHub comments
- **[Writing Posts](docs/HOW-TO-WRITE-POST.md)** - Blog post guidelines
- **[Code Review](docs/CODE-REVIEW-ISSUES.md)** - Code quality checklist

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT

---

**Made with ❤️ using Astro + TypeScript + Tailwind CSS**
