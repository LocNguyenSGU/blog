/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_CphY_etb.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CH4dmWTi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const urlParams = Astro2.url.searchParams;
  const langParam = urlParams.get("lang");
  const locale = langParam === "en" || langParam === "vi" ? langParam : "vi";
  const title = locale === "en" ? "Page Not Found" : "Kh\xF4ng t\xECm th\u1EA5y trang";
  const description = locale === "en" ? "The page you are looking for does not exist." : "Trang b\u1EA1n \u0111ang t\xECm ki\u1EBFm kh\xF4ng t\u1ED3n t\u1EA1i.";
  const homeButtonText = locale === "en" ? "Back to Home" : "V\u1EC1 trang ch\u1EE7";
  const blogButtonText = locale === "en" ? "Browse Blog" : "Xem Blog";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "locale": locale }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex-grow container mx-auto px-4 py-16"> <div class="max-w-2xl mx-auto text-center"> <div class="mb-8"> <h1 class="text-9xl font-bold text-gray-300 dark:text-gray-700 sepia:text-sepia-400">
404
</h1> </div> <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 sepia:text-sepia-900"> ${title} </h2> <p class="text-lg text-gray-600 dark:text-gray-400 sepia:text-sepia-700 mb-8"> ${description} </p> <div class="flex gap-4 justify-center"> <a${addAttribute(`/?lang=${locale}`, "href")} class="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sepia:bg-sepia-600 sepia:hover:bg-sepia-700 text-white rounded-lg transition-colors font-medium"> ${homeButtonText} </a> <a${addAttribute(`/blog?lang=${locale}`, "href")} class="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 sepia:bg-sepia-200 sepia:hover:bg-sepia-300 text-gray-900 dark:text-gray-100 sepia:text-sepia-900 rounded-lg transition-colors font-medium"> ${blogButtonText} </a> </div> </div> </main> ` })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/pages/404.astro", void 0);

const $$file = "/Users/nguyenhuuloc/Documents/blog/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
