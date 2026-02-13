/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, e as defineScriptVars, f as renderSlot, d as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_CphY_etb.mjs';
import 'piccolore';
import { g as getReadingTime, f as formatReadingTime, $ as $$CategoryBadge, a as getCollection } from '../../chunks/readingTime_DL9Wa4ZU.mjs';
import { $ as $$BaseLayout, t } from '../../chunks/BaseLayout_ZhffxrO1.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, author = "Anonymous", category, coverImage, coverAlt, slug = "", body = "", lang = "vi" } = Astro2.props;
  const readingTime = getReadingTime(body);
  const locale = lang;
  const formattedDate = new Date(pubDate).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "locale": locale }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<article class="max-w-4xl mx-auto">  <div class="relative -mx-4 md:mx-0 mb-8 md:rounded-2xl overflow-hidden aspect-[21/9] max-h-[500px]"> <img', "", ' class="w-full h-full object-cover"> <div class="absolute top-6 left-6"> ', ' </div> </div>  <header class="mb-8"> <h1 class="font-sans text-4xl md:text-5xl font-bold mb-4">', '</h1> <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 sepia:text-sepia-700"> <time', ">", '</time> <span>\u2022</span> <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ', " ", ' </span> <span>\u2022</span> <span id="view-count" class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> <span id="view-count-number">0 views</span> </span> <span>\u2022</span> <span>', "</span> </div> ", ' </header> <hr class="border-gray-200 dark:border-gray-700 sepia:border-sepia-300 mb-8">  <div class="prose prose-lg dark:prose-invert sepia:prose-sepia prose-headings:font-sans prose-code:font-mono prose-pre:font-mono max-w-none"> ', ' </div>  <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 sepia:border-sepia-300"> <h2 class="font-sans text-2xl font-bold mb-6">', '</h2> <script src="https://giscus.app/client.js" data-repo="your-username/your-repo" data-repo-id="YOUR_REPO_ID" data-category="General" data-category-id="YOUR_CATEGORY_ID" data-mapping="pathname" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="bottom" data-theme="preferred_color_scheme" data-lang="vi" crossorigin="anonymous" async><\/script> </div> </article> <script>(function(){', "\n    // View counter\n    function getViewCount(slug) {\n      const key = `post-views-${slug}`;\n      const stored = localStorage.getItem(key);\n      return stored ? parseInt(stored, 10) : 0;\n    }\n\n    function incrementViewCount(slug) {\n      const currentCount = getViewCount(slug);\n      const newCount = currentCount + 1;\n      const key = `post-views-${slug}`;\n      localStorage.setItem(key, newCount.toString());\n      return newCount;\n    }\n\n    function formatViewCount(count) {\n      if (count >= 1000) {\n        return `${(count / 1000).toFixed(1)}k views`;\n      }\n      return `${count} views`;\n    }\n\n    // Initialize view count\n    document.addEventListener('DOMContentLoaded', () => {\n      const viewCount = incrementViewCount(slug);\n      const viewCountElement = document.getElementById('view-count-number');\n      if (viewCountElement) {\n        viewCountElement.textContent = formatViewCount(viewCount);\n      }\n    });\n  })();<\/script> "], [" ", '<article class="max-w-4xl mx-auto">  <div class="relative -mx-4 md:mx-0 mb-8 md:rounded-2xl overflow-hidden aspect-[21/9] max-h-[500px]"> <img', "", ' class="w-full h-full object-cover"> <div class="absolute top-6 left-6"> ', ' </div> </div>  <header class="mb-8"> <h1 class="font-sans text-4xl md:text-5xl font-bold mb-4">', '</h1> <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 sepia:text-sepia-700"> <time', ">", '</time> <span>\u2022</span> <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ', " ", ' </span> <span>\u2022</span> <span id="view-count" class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> <span id="view-count-number">0 views</span> </span> <span>\u2022</span> <span>', "</span> </div> ", ' </header> <hr class="border-gray-200 dark:border-gray-700 sepia:border-sepia-300 mb-8">  <div class="prose prose-lg dark:prose-invert sepia:prose-sepia prose-headings:font-sans prose-code:font-mono prose-pre:font-mono max-w-none"> ', ' </div>  <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 sepia:border-sepia-300"> <h2 class="font-sans text-2xl font-bold mb-6">', '</h2> <script src="https://giscus.app/client.js" data-repo="your-username/your-repo" data-repo-id="YOUR_REPO_ID" data-category="General" data-category-id="YOUR_CATEGORY_ID" data-mapping="pathname" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="bottom" data-theme="preferred_color_scheme" data-lang="vi" crossorigin="anonymous" async><\/script> </div> </article> <script>(function(){', "\n    // View counter\n    function getViewCount(slug) {\n      const key = \\`post-views-\\${slug}\\`;\n      const stored = localStorage.getItem(key);\n      return stored ? parseInt(stored, 10) : 0;\n    }\n\n    function incrementViewCount(slug) {\n      const currentCount = getViewCount(slug);\n      const newCount = currentCount + 1;\n      const key = \\`post-views-\\${slug}\\`;\n      localStorage.setItem(key, newCount.toString());\n      return newCount;\n    }\n\n    function formatViewCount(count) {\n      if (count >= 1000) {\n        return \\`\\${(count / 1000).toFixed(1)}k views\\`;\n      }\n      return \\`\\${count} views\\`;\n    }\n\n    // Initialize view count\n    document.addEventListener('DOMContentLoaded', () => {\n      const viewCount = incrementViewCount(slug);\n      const viewCountElement = document.getElementById('view-count-number');\n      if (viewCountElement) {\n        viewCountElement.textContent = formatViewCount(viewCount);\n      }\n    });\n  })();<\/script> "])), maybeRenderHead(), addAttribute(coverImage, "src"), addAttribute(coverAlt, "alt"), renderComponent($$result2, "CategoryBadge", $$CategoryBadge, { "category": category }), title, addAttribute(pubDate.toISOString(), "datetime"), formattedDate, formatReadingTime(readingTime), t("post.readTime", locale), author, description && renderTemplate`<p class="text-xl text-gray-600 dark:text-gray-400 sepia:text-sepia-700 mt-4 italic">${description}</p>`, renderSlot($$result2, $$slots["default"]), t("post.comments", locale), defineScriptVars({ slug })) })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/layouts/BlogPost.astro", void 0);

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let entry = null;
  let Content = null;
  try {
    const allPosts = await getCollection("blog");
    entry = allPosts.find((post) => post.slug === slug);
    if (!entry) {
      return Astro2.redirect("/404");
    }
    const rendered = await entry.render();
    Content = rendered.Content;
  } catch (error) {
    console.error("Error loading blog post:", error);
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...entry.data, "slug": entry.slug, "body": entry.body, "lang": entry.data.lang }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/nguyenhuuloc/Documents/blog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
