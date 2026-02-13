import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "My First Post",
  "description": "This is my first blog post",
  "pubDate": "2026-02-13T00:00:00.000Z",
  "author": "Your Name",
  "category": "personal",
  "tags": ["welcome", "first-post"],
  "coverImage": "/images/posts/first-post.svg",
  "coverAlt": "Welcome to my blog",
  "lang": "en",
  "translationKey": "first-post"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "welcome-to-my-blog",
    "text": "Welcome to My Blog"
  }, {
    "depth": 2,
    "slug": "what-to-expect",
    "text": "What to Expect"
  }];
}
function _createMdxContent(props) {
  const _components = {
    em: "em",
    h1: "h1",
    h2: "h2",
    hr: "hr",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "welcome-to-my-blog",
      children: "Welcome to My Blog"
    }), "\n", createVNode(_components.p, {
      children: ["Hello everyone! This is my ", createVNode(_components.strong, {
        children: "first post"
      }), " on my new blog. I’m excited to share my thoughts and experiences with you."]
    }), "\n", createVNode(_components.h2, {
      id: "what-to-expect",
      children: "What to Expect"
    }), "\n", createVNode(_components.p, {
      children: "In this blog, I’ll be writing about:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Programming and technology"
      }), "\n", createVNode(_components.li, {
        children: "My personal journey in learning to code"
      }), "\n", createVNode(_components.li, {
        children: "Lifestyle tips and reflections"
      }), "\n", createVNode(_components.li, {
        children: "And much more!"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Thank you for visiting, and I hope you enjoy reading my posts!"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Stay tuned for more content!"
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/first-post.en.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.en.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.en.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
