/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_CphY_etb.mjs';
import 'piccolore';
import { a as getCollection } from '../chunks/readingTime_DL9Wa4ZU.mjs';
import { $ as $$BaseLayout, t } from '../chunks/BaseLayout_ZhffxrO1.mjs';
import { $ as $$FeaturedPost, a as $$PostCard } from '../chunks/PostCard_V2oRKKfR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const urlParams = Astro2.url.searchParams;
  const langParam = urlParams.get("lang");
  const locale = langParam === "en" || langParam === "vi" ? langParam : "vi";
  let allPosts = [];
  let publishedPosts = [];
  let featuredPost = null;
  let otherPosts = [];
  let errorMessage = "";
  try {
    allPosts = await getCollection("blog");
    publishedPosts = allPosts.filter((post) => !post.data.draft && post.data.lang === locale).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    featuredPost = publishedPosts[0];
    otherPosts = publishedPosts.slice(1);
  } catch (error) {
    console.error("Error loading blog posts:", error);
    errorMessage = locale === "en" ? "Unable to load blog posts. Please try again later." : "Kh\xF4ng th\u1EC3 t\u1EA3i b\xE0i vi\u1EBFt. Vui l\xF2ng th\u1EED l\u1EA1i sau.";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog", "description": "All blog posts", "locale": locale }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12"> <div> <h1 class="font-sans text-4xl md:text-5xl font-bold mb-2">${t("blog.title", locale)}</h1> <p class="text-gray-600 dark:text-gray-400 sepia:text-sepia-700 text-lg">${t("blog.subtitle", locale)}</p> </div> ${errorMessage && renderTemplate`<div class="bg-red-50 dark:bg-red-900/20 sepia:bg-red-100 border border-red-200 dark:border-red-800 sepia:border-red-300 rounded-lg p-6 text-center"> <p class="text-red-600 dark:text-red-400 sepia:text-red-700">${errorMessage}</p> </div>`} ${!errorMessage && publishedPosts.length === 0 && renderTemplate`<div class="bg-blue-50 dark:bg-blue-900/20 sepia:bg-blue-100 border border-blue-200 dark:border-blue-800 sepia:border-blue-300 rounded-lg p-8 text-center"> <p class="text-blue-600 dark:text-blue-400 sepia:text-blue-700 text-lg mb-4"> ${locale === "en" ? "No posts available in English yet." : "Ch\u01B0a c\xF3 b\xE0i vi\u1EBFt b\u1EB1ng ti\u1EBFng Vi\u1EC7t."} </p> <a${addAttribute(`/blog?lang=${locale === "en" ? "vi" : "en"}`, "href")} class="text-blue-600 dark:text-blue-400 hover:underline"> ${locale === "en" ? "View Vietnamese posts \u2192" : "Xem b\xE0i vi\u1EBFt ti\u1EBFng Anh \u2192"} </a> </div>`} ${!errorMessage && featuredPost && renderTemplate`<section> ${renderComponent($$result2, "FeaturedPost", $$FeaturedPost, { "post": featuredPost })} </section>`} ${!errorMessage && otherPosts.length > 0 && renderTemplate`<section> <h2 class="font-sans text-2xl font-bold mb-6">${t("blog.allPosts", locale)}</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${otherPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post })}`)} </div> </section>`} </div> ` })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/pages/blog/index.astro", void 0);

const $$file = "/Users/nguyenhuuloc/Documents/blog/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
