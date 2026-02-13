import { c as createComponent, m as maybeRenderHead, j as renderScript, a as renderTemplate, b as createAstro, f as renderSlot, r as renderComponent, k as renderHead, d as addAttribute } from './astro/server_CphY_etb.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const defaultLocale = "vi";
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About",
    // Homepage
    "home.title": "Welcome to My Blog",
    "home.subtitle": "Sharing knowledge about programming, technology and life",
    "home.readBlog": "Read Blog",
    "home.aboutMe": "About Me",
    "home.featured": "Featured Post",
    "home.recent": "Recent Posts",
    "home.viewAll": "View all →",
    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Thoughts, tutorials, and stories",
    "blog.allPosts": "All Posts",
    // Post
    "post.readTime": "min read",
    "post.views": "views",
    "post.comments": "Comments",
    // Categories
    "category.programming": "Programming",
    "category.lifestyle": "Lifestyle",
    "category.personal": "Personal",
    // Footer
    "footer.copyright": "My Blog. Built with Astro & Tailwind CSS.",
    // Language
    "lang.switch": "Switch to Vietnamese",
    "lang.current": "English"
  },
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.blog": "Blog",
    "nav.about": "Giới thiệu",
    // Homepage
    "home.title": "Chào mừng đến với Blog của tôi",
    "home.subtitle": "Chia sẻ kiến thức về lập trình, công nghệ và cuộc sống",
    "home.readBlog": "Đọc Blog",
    "home.aboutMe": "Về Tôi",
    "home.featured": "Bài viết nổi bật",
    "home.recent": "Bài viết gần đây",
    "home.viewAll": "Xem tất cả →",
    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Suy nghĩ, hướng dẫn và câu chuyện",
    "blog.allPosts": "Tất cả bài viết",
    // Post
    "post.readTime": "phút đọc",
    "post.views": "lượt xem",
    "post.comments": "Bình luận",
    // Categories
    "category.programming": "Lập trình",
    "category.lifestyle": "Đời sống",
    "category.personal": "Cá nhân",
    // Footer
    "footer.copyright": "My Blog. Được xây dựng với Astro & Tailwind CSS.",
    // Language
    "lang.switch": "Chuyển sang tiếng Anh",
    "lang.current": "Tiếng Việt"
  }
};
function getTranslation(locale, key) {
  return translations[locale][key] || key;
}
function t(key, locale = defaultLocale) {
  return getTranslation(locale, key);
}

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <button id="theme-toggle" type="button" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 sepia:hover:bg-sepia-200 transition-colors" aria-label="Toggle theme"> <!-- Light mode icon --> <svg id="theme-icon-light" class="hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <!-- Sepia mode icon --> <svg id="theme-icon-sepia" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> <!-- Dark mode icon --> <svg id="theme-icon-dark" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> </svg> </button> <!-- Theme dropdown menu --> <div id="theme-menu" class="hidden absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 sepia:bg-sepia-50 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 sepia:border-sepia-300 z-50"> <button data-theme="light" class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 sepia:hover:bg-sepia-200 rounded-t-lg flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg>
Light
</button> <button data-theme="sepia" class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 sepia:hover:bg-sepia-200 flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg>
Sepia
</button> <button data-theme="dark" class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 sepia:hover:bg-sepia-200 rounded-b-lg flex items-center gap-2"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> </svg>
Dark
</button> </div> </div> ${renderScript($$result, "/Users/nguyenhuuloc/Documents/blog/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/components/ThemeToggle.astro", void 0);

const $$Astro$1 = createAstro();
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LanguageSwitcher;
  const { currentLocale = "vi" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <button id="lang-toggle" type="button" class="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 sepia:hover:bg-sepia-200 transition-colors text-sm font-medium uppercase flex items-center gap-1" aria-label="Switch language"> <span id="current-lang-icon">${currentLocale === "vi" ? "\u{1F1FB}\u{1F1F3}" : "\u{1F1EC}\u{1F1E7}"}</span> <span id="current-lang-text">${currentLocale}</span> </button> <div id="lang-menu" class="hidden absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 sepia:bg-sepia-50 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 sepia:border-sepia-300 z-50"> <button data-lang="vi" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 sepia:hover:bg-sepia-200 rounded-t-lg">
🇻🇳 Tiếng Việt
</button> <button data-lang="en" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 sepia:hover:bg-sepia-200 rounded-b-lg">
🇬🇧 English
</button> </div> </div> ${renderScript($$result, "/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description = "My personal blog", locale = "vi" } = Astro2.props;
  const siteUrl = Astro2.url.origin;
  const currentPath = Astro2.url.pathname;
  const canonicalUrl = `${siteUrl}${currentPath}${locale !== "vi" ? `?lang=${locale}` : ""}`;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="generator"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', '</title><!-- SEO: Canonical and alternate language links --><link rel="canonical"', '><link rel="alternate" hreflang="vi"', '><link rel="alternate" hreflang="en"', '><link rel="alternate" hreflang="x-default"', '><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:locale"', '><meta property="og:locale:alternate"', '><meta property="og:type" content="website"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', "><!-- Prevent flash of wrong theme --><script>\n      const theme = (() => {\n        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {\n          return localStorage.getItem('theme');\n        }\n        return 'sepia'; // Default to sepia\n      })();\n      \n      document.documentElement.classList.remove('light', 'sepia', 'dark');\n      document.documentElement.classList.add(theme);\n    </script><!-- Auto-redirect to saved language preference if no lang param --><script>\n      if (typeof window !== 'undefined') {\n        const urlParams = new URLSearchParams(window.location.search);\n        const savedLocale = localStorage.getItem('locale');\n        \n        // Only redirect if saved locale is valid and different from default\n        if (!urlParams.has('lang') && savedLocale && (savedLocale === 'en' || savedLocale === 'vi') && savedLocale !== 'vi') {\n          const url = new URL(window.location.href);\n          url.searchParams.set('lang', savedLocale);\n          window.location.replace(url.toString());\n        }\n      }\n    </script>", '</head> <body class="min-h-screen transition-colors"> <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 sepia:border-sepia-300 bg-white/80 dark:bg-gray-900/80 sepia:bg-sepia-100/80 backdrop-blur-md transition-colors"> <nav class="max-w-6xl mx-auto px-4 py-4"> <div class="flex justify-between items-center"> <a href="/" class="text-2xl font-sans font-bold hover:text-blue-600 dark:hover:text-blue-400 sepia:hover:text-sepia-700 transition-colors">\nMy Blog\n</a> <div class="flex items-center gap-4"> <div class="flex gap-6"> <a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 sepia:hover:text-sepia-700 transition-colors">', '</a> <a href="/blog" class="hover:text-blue-600 dark:hover:text-blue-400 sepia:hover:text-sepia-700 transition-colors">', '</a> <a href="/about" class="hover:text-blue-600 dark:hover:text-blue-400 sepia:hover:text-sepia-700 transition-colors">', "</a> </div> ", " ", ' </div> </div> </nav> </header> <main class="max-w-6xl mx-auto px-4 py-12"> ', ' </main> <footer class="border-t border-gray-200 dark:border-gray-700 sepia:border-sepia-300 mt-20"> <div class="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400 sepia:text-sepia-700"> <p>&copy; ', " ", "</p> </div> </footer> </body></html>"])), addAttribute(locale, "lang"), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), title, addAttribute(canonicalUrl, "href"), addAttribute(`${siteUrl}${currentPath}?lang=vi`, "href"), addAttribute(`${siteUrl}${currentPath}?lang=en`, "href"), addAttribute(`${siteUrl}${currentPath}`, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalUrl, "content"), addAttribute(locale === "vi" ? "vi_VN" : "en_US", "content"), addAttribute(locale === "vi" ? "en_US" : "vi_VN", "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), t("nav.home", locale), t("nav.blog", locale), t("nav.about", locale), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, { "currentLocale": locale }), renderComponent($$result, "ThemeToggle", $$ThemeToggle, {}), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear(), t("footer.copyright", locale));
}, "/Users/nguyenhuuloc/Documents/blog/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, t };
