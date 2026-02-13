import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate, b as createAstro } from './astro/server_CphY_etb.mjs';
import 'piccolore';
import { g as getReadingTime, $ as $$CategoryBadge, f as formatReadingTime } from './readingTime_B8OJGn7u.mjs';

function getPostUrl(post) {
  return `/blog/${post.slug}?lang=${post.data.lang}`;
}
function formatDate(date, locale, options = {
  year: "numeric",
  month: "short",
  day: "numeric"
}) {
  const localeString = locale === "vi" ? "vi-VN" : "en-US";
  return date.toLocaleDateString(localeString, options);
}

const $$Astro$1 = createAstro();
const $$FeaturedPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedPost;
  const { post } = Astro2.props;
  const readingTime = getReadingTime(post.body);
  const formattedDate = formatDate(new Date(post.data.pubDate), post.data.lang, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const postUrl = getPostUrl(post);
  return renderTemplate`${maybeRenderHead()}<article class="group relative h-96 md:h-[500px] rounded-2xl overflow-hidden"> <a${addAttribute(postUrl, "href")} class="block h-full">  <div class="absolute inset-0"> <img${addAttribute(post.data.coverImage, "src")}${addAttribute(post.data.coverAlt, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> </div>  <div class="relative h-full flex flex-col justify-end p-8 md:p-12"> <div class="mb-4"> ${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "category": post.data.category })} </div> <h2 class="font-sans text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl group-hover:text-blue-300 transition-colors"> ${post.data.title} </h2> ${post.data.description && renderTemplate`<p class="text-gray-200 text-lg mb-6 max-w-2xl line-clamp-2"> ${post.data.description} </p>`} <div class="flex items-center gap-4 text-sm text-gray-300"> <time${addAttribute(post.data.pubDate.toISOString(), "datetime")}> ${formattedDate} </time> <span>•</span> <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${formatReadingTime(readingTime)} </span> <span>•</span> <span>${post.data.author}</span> </div> </div> </a> </article>`;
}, "/Users/nguyenhuuloc/Documents/blog/src/components/FeaturedPost.astro", void 0);

const $$Astro = createAstro();
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { post } = Astro2.props;
  const readingTime = getReadingTime(post.body);
  const formattedDate = formatDate(new Date(post.data.pubDate), post.data.lang);
  const postUrl = getPostUrl(post);
  return renderTemplate`${maybeRenderHead()}<article class="group bg-white dark:bg-gray-800 sepia:bg-sepia-50 rounded-xl border border-gray-200 dark:border-gray-700 sepia:border-sepia-300 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"> <a${addAttribute(postUrl, "href")} class="block"> <div class="relative aspect-[4/3] overflow-hidden"> <img${addAttribute(post.data.coverImage, "src")}${addAttribute(post.data.coverAlt, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> <div class="absolute top-3 left-3"> ${renderComponent($$result, "CategoryBadge", $$CategoryBadge, { "category": post.data.category })} </div> </div> <div class="p-6"> <h3 class="font-sans text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 sepia:group-hover:text-sepia-700 transition-colors"> ${post.data.title} </h3> ${post.data.description && renderTemplate`<p class="text-gray-600 dark:text-gray-400 sepia:text-sepia-700 text-sm mb-4 line-clamp-3"> ${post.data.description} </p>`} <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 sepia:text-sepia-600"> <time${addAttribute(post.data.pubDate.toISOString(), "datetime")}> ${formattedDate} </time> <span>•</span> <span class="flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${formatReadingTime(readingTime)} </span> </div> </div> </a> </article>`;
}, "/Users/nguyenhuuloc/Documents/blog/src/components/PostCard.astro", void 0);

export { $$FeaturedPost as $, $$PostCard as a };
