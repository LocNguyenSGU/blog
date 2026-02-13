const contentModules = new Map([
["src/content/blog/coding-journey.en.mdx", () => import('./coding-journey.en_DeWppimp.mjs')],
["src/content/blog/first-post.en.mdx", () => import('./first-post.en_zmTeGrvB.mjs')],
["src/content/blog/coding-journey.vi.mdx", () => import('./coding-journey.vi_CNCDt5aw.mjs')],
["src/content/blog/markdown-guide.en.mdx", () => import('./markdown-guide.en_CuEyo1iX.mjs')],
["src/content/blog/markdown-guide.vi.mdx", () => import('./markdown-guide.vi_2XSeFBxP.mjs')],
["src/content/blog/first-post.vi.mdx", () => import('./first-post.vi_CJxDPhi4.mjs')]]);

export { contentModules as default };
