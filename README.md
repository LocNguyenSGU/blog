# My Blog

A modern blog built with Astro, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Astro** - Fast, modern static site generator
- 📝 **MDX Support** - Write blog posts in Markdown with JSX components
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 💬 **Giscus Comments** - GitHub Discussions powered comments
- 🔤 **Custom Fonts** - Merriweather (headings), Inter (body), JetBrains Mono (code)
- ⚡ **TypeScript** - Type-safe development

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── blog/          # Blog posts (MDX files)
│   │   └── config.ts      # Content collections config
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes
│   ├── styles/            # Global styles
│   └── env.d.ts
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Writing Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Post description"
pubDate: 2026-02-13
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

## Deploying to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Astro and configure the build settings
4. Deploy!

## Setting up Giscus Comments

1. Install [Giscus app](https://github.com/apps/giscus) on your repository
2. Enable Discussions in your repository settings
3. Go to [giscus.app](https://giscus.app) to generate your configuration
4. Update the Giscus script in `src/layouts/BlogPost.astro` with your repo details

## License

MIT
