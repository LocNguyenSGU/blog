/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_CphY_etb.mjs';
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
  let recentPosts = [];
  let errorMessage = "";
  try {
    allPosts = await getCollection("blog");
    publishedPosts = allPosts.filter((post) => !post.data.draft && post.data.lang === locale).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    featuredPost = publishedPosts[0];
    recentPosts = publishedPosts.slice(1, 4);
  } catch (error) {
    console.error("Error loading blog posts:", error);
    errorMessage = locale === "en" ? "Unable to load blog posts. Please try again later." : "Kh\xF4ng th\u1EC3 t\u1EA3i b\xE0i vi\u1EBFt. Vui l\xF2ng th\u1EED l\u1EA1i sau.";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "My Blog - Home", "locale": locale }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-16">  <section class="text-center space-y-6 py-12"> <h1 class="font-sans text-5xl md:text-7xl font-bold"> ${t("home.title", locale)} </h1> <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 sepia:text-sepia-700 max-w-2xl mx-auto"> ${t("home.subtitle", locale)} </p> <div class="flex gap-4 justify-center pt-4"> <a href="/blog" class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"> ${t("home.readBlog", locale)} </a> <a href="/about" class="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 sepia:border-sepia-400 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition font-medium"> ${t("home.aboutMe", locale)} </a> </div> </section>  ${errorMessage && renderTemplate`<div class="bg-red-50 dark:bg-red-900/20 sepia:bg-red-100 border border-red-200 dark:border-red-800 sepia:border-red-300 rounded-lg p-6 text-center"> <p class="text-red-600 dark:text-red-400 sepia:text-red-700">${errorMessage}</p> </div>`}  ${!errorMessage && featuredPost && renderTemplate`<section> <h2 class="font-sans text-3xl font-bold mb-6">${t("home.featured", locale)}</h2> ${renderComponent($$result2, "FeaturedPost", $$FeaturedPost, { "post": featuredPost })} </section>`}  ${!errorMessage && recentPosts.length > 0 && renderTemplate`<section> <div class="flex justify-between items-center mb-6"> <h2 class="font-sans text-3xl font-bold">${t("home.recent", locale)}</h2> <a href="/blog" class="text-blue-600 dark:text-blue-400 sepia:text-sepia-700 hover:underline font-medium"> ${t("home.viewAll", locale)} </a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${recentPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post })}`)} </div> </section>`} </div> ` })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/pages/index.astro", void 0);

const $$file = "/Users/nguyenhuuloc/Documents/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
