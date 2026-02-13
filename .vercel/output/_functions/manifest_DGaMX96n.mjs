import 'piccolore';
import { l as decodeKey } from './chunks/astro/server_CphY_etb.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C6InLCVN.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/nguyenhuuloc/Documents/blog/","cacheDir":"file:///Users/nguyenhuuloc/Documents/blog/node_modules/.astro/","outDir":"file:///Users/nguyenhuuloc/Documents/blog/dist/","srcDir":"file:///Users/nguyenhuuloc/Documents/blog/src/","publicDir":"file:///Users/nguyenhuuloc/Documents/blog/public/","buildClientDir":"file:///Users/nguyenhuuloc/Documents/blog/dist/client/","buildServerDir":"file:///Users/nguyenhuuloc/Documents/blog/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.ZFx6RUVm.css"},{"type":"external","src":"/_astro/_slug_.WwB4ZctS.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.ZFx6RUVm.css"},{"type":"external","src":"/_astro/_slug_.WwB4ZctS.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.ZFx6RUVm.css"},{"type":"external","src":"/_astro/_slug_.WwB4ZctS.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.ZFx6RUVm.css"},{"type":"external","src":"/_astro/_slug_.WwB4ZctS.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.ZFx6RUVm.css"},{"type":"external","src":"/_astro/_slug_.WwB4ZctS.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/nguyenhuuloc/Documents/blog/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/nguyenhuuloc/Documents/blog/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nguyenhuuloc/Documents/blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nguyenhuuloc/Documents/blog/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/nguyenhuuloc/Documents/blog/src/pages/about.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DGaMX96n.mjs","/Users/nguyenhuuloc/Documents/blog/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_jfaObxwd.mjs","/Users/nguyenhuuloc/Documents/blog/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/nguyenhuuloc/Documents/blog/.astro/content-modules.mjs":"chunks/content-modules_BazyzOMb.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_pC-QB3_s.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.vi.mdx?astroPropagatedAssets":"chunks/first-post.vi_CJxDPhi4.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.vi.mdx?astroPropagatedAssets":"chunks/coding-journey.vi_CNCDt5aw.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.en.mdx?astroPropagatedAssets":"chunks/first-post.en_zmTeGrvB.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.en.mdx?astroPropagatedAssets":"chunks/coding-journey.en_DeWppimp.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.vi.mdx?astroPropagatedAssets":"chunks/markdown-guide.vi_2XSeFBxP.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.en.mdx?astroPropagatedAssets":"chunks/markdown-guide.en_CuEyo1iX.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.vi.mdx":"chunks/first-post.vi_Z_Ow2raD.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.vi.mdx":"chunks/coding-journey.vi_D2JxvY-t.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.en.mdx":"chunks/first-post.en_DYfW3CQH.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.en.mdx":"chunks/coding-journey.en_dD73HYf5.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.vi.mdx":"chunks/markdown-guide.vi_BQoNRcL3.mjs","/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.en.mdx":"chunks/markdown-guide.en_CWw-aQj8.mjs","/Users/nguyenhuuloc/Documents/blog/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.D86HTq7K.js","/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts":"_astro/LanguageSwitcher.astro_astro_type_script_index_0_lang.CiFLNseZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/nguyenhuuloc/Documents/blog/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","function i(){return typeof localStorage<\"u\"&&localStorage.getItem(\"theme\")?localStorage.getItem(\"theme\"):\"sepia\"}function s(t){const e=document.documentElement;e.classList.remove(\"light\",\"sepia\",\"dark\"),e.classList.add(t),localStorage.setItem(\"theme\",t),a(t)}function a(t){const e=document.getElementById(\"theme-icon-light\"),d=document.getElementById(\"theme-icon-sepia\"),n=document.getElementById(\"theme-icon-dark\");e?.classList.add(\"hidden\"),d?.classList.add(\"hidden\"),n?.classList.add(\"hidden\"),t===\"light\"?e?.classList.remove(\"hidden\"):t===\"sepia\"?d?.classList.remove(\"hidden\"):n?.classList.remove(\"hidden\")}const l=i();s(l);document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.getElementById(\"theme-toggle\"),e=document.getElementById(\"theme-menu\"),d=document.querySelectorAll(\"[data-theme]\");t?.addEventListener(\"click\",n=>{n.stopPropagation(),e?.classList.toggle(\"hidden\")}),document.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\")}),d.forEach(n=>{n.addEventListener(\"click\",c=>{const o=c.currentTarget.getAttribute(\"data-theme\");s(o),e?.classList.add(\"hidden\")})})});"],["/Users/nguyenhuuloc/Documents/blog/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts","function i(){const e=new URLSearchParams(window.location.search).get(\"lang\")||localStorage.getItem(\"locale\")||\"vi\",o=document.getElementById(\"current-lang-icon\"),t=document.getElementById(\"current-lang-text\");o&&t&&(o.textContent=e===\"vi\"?\"🇻🇳\":\"🇬🇧\",t.textContent=e.toUpperCase())}document.addEventListener(\"DOMContentLoaded\",()=>{const c=document.getElementById(\"lang-toggle\"),e=document.getElementById(\"lang-menu\"),o=document.querySelectorAll(\"[data-lang]\");i(),c?.addEventListener(\"click\",t=>{t.stopPropagation(),e?.classList.toggle(\"hidden\")}),document.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\")}),o.forEach(t=>{t.addEventListener(\"click\",r=>{const n=r.currentTarget.getAttribute(\"data-lang\");if(n){localStorage.setItem(\"locale\",n);const a=window.location.pathname;if(a.startsWith(\"/blog/\")&&a!==\"/blog\"&&a!==\"/blog/\"){const l=a.replace(\"/blog/\",\"\");let g=l;(l.endsWith(\".en\")||l.endsWith(\".vi\"))&&(g=`${l.replace(/\\.(en|vi)$/,\"\")}.${n}`),window.location.href=`/blog/${g}?lang=${n}`;return}const s=new URL(window.location.href);s.searchParams.set(\"lang\",n),window.location.href=s.toString()}})})});"]],"assets":["/_astro/about.ZFx6RUVm.css","/_astro/_slug_.WwB4ZctS.css","/favicon.svg","/images/posts/coding-journey.svg","/images/posts/first-post.svg","/images/posts/markdown-guide.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"U9Iqkw+sc5bhWTKiWT1aXHBhuiIBZqWrw94IgEsqqVI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
