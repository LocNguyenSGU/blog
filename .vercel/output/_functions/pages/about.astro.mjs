/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_CphY_etb.mjs';
import 'piccolore';
import { t, $ as $$BaseLayout } from '../chunks/BaseLayout_CH4dmWTi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const urlParams = Astro2.url.searchParams;
  const locale = urlParams.get("lang") || "vi";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("nav.about", locale), "locale": locale }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="prose prose-lg dark:prose-invert sepia:prose-sepia mx-auto"> ${locale === "vi" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h1 class="font-sans">Giới thiệu</h1> <p>
Xin chào! Tôi là một lập trình viên đam mê công nghệ và chia sẻ kiến thức.
</p> <h2>Kỹ năng</h2> <ul> <li>TypeScript / JavaScript</li> <li>React / Next.js / Astro</li> <li>Tailwind CSS</li> <li>Node.js</li> </ul> <h2>Liên hệ</h2> <p>
Bạn có thể tìm tôi trên <a href="https://github.com/yourusername">GitHub</a>
hoặc gửi email đến <a href="mailto:your@email.com">your@email.com</a>.
</p> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h1 class="font-sans">About Me</h1> <p>
Hello! I'm a developer passionate about technology and knowledge sharing.
</p> <h2>Skills</h2> <ul> <li>TypeScript / JavaScript</li> <li>React / Next.js / Astro</li> <li>Tailwind CSS</li> <li>Node.js</li> </ul> <h2>Contact</h2> <p>
You can find me on <a href="https://github.com/yourusername">GitHub</a>
or email me at <a href="mailto:your@email.com">your@email.com</a>.
</p> ` })}`} </div> ` })}`;
}, "/Users/nguyenhuuloc/Documents/blog/src/pages/about.astro", void 0);

const $$file = "/Users/nguyenhuuloc/Documents/blog/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
