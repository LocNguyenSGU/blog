import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFaqAccordion from "./src/lib/markdown/rehypeFaqAccordion.mjs";

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://devjournal.fun",
  output: "server",
  adapter: vercel({
    maxDuration: 60,
    functionPerRoute: false,
  }),
  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "vi",
        locales: {
          vi: "vi-VN",
          en: "en-US",
        },
      },
      filter: (page) => !page.includes("/404"),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeFaqAccordion, // sau rehypeSlug (giữ id), trước autolink (không bọc link trong <summary>)
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
  // ASTRO_IMAGE_PASSTHROUGH=1: chỉ dùng khi xem trên máy không cài được `sharp` (ảnh không tối ưu).
  // Production và CI luôn dùng sharp.
  image:
    process.env.ASTRO_IMAGE_PASSTHROUGH === "1"
      ? { service: passthroughImageService() }
      : {
          service: {
            entrypoint: "astro/assets/services/sharp",
            config: {
              limitInputPixels: false,
            },
          },
        },
});
