import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "Bài viết đầu tiên",
  "description": "Đây là bài viết đầu tiên trên blog của tôi",
  "pubDate": "2026-02-13T00:00:00.000Z",
  "author": "Your Name",
  "category": "personal",
  "tags": ["welcome", "first-post"],
  "coverImage": "/images/posts/first-post.svg",
  "coverAlt": "Welcome to my blog",
  "lang": "vi",
  "translationKey": "first-post"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "chào-mừng-đến-với-blog-của-tôi",
    "text": "Chào mừng đến với blog của tôi!"
  }, {
    "depth": 2,
    "slug": "tính-năng-nổi-bật",
    "text": "Tính năng nổi bật"
  }, {
    "depth": 2,
    "slug": "ví-dụ-về-code",
    "text": "Ví dụ về code"
  }, {
    "depth": 2,
    "slug": "kết-luận",
    "text": "Kết luận"
  }];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h1: "h1",
    h2: "h2",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "chào-mừng-đến-với-blog-của-tôi",
      children: "Chào mừng đến với blog của tôi!"
    }), "\n", createVNode(_components.p, {
      children: ["Đây là bài viết đầu tiên được viết bằng ", createVNode(_components.strong, {
        children: "Markdown/MDX"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "tính-năng-nổi-bật",
      children: "Tính năng nổi bật"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "✨ Viết bài bằng Markdown"
      }), "\n", createVNode(_components.li, {
        children: "🎨 Giao diện đẹp với Tailwind CSS"
      }), "\n", createVNode(_components.li, {
        children: "🚀 Rất nhanh nhờ Astro"
      }), "\n", createVNode(_components.li, {
        children: "💬 Comment với Giscus"
      }), "\n", createVNode(_components.li, {
        children: "📝 Code highlighting tuyệt vời"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "ví-dụ-về-code",
      children: "Ví dụ về code"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      "data-language": "typescript",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "function"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " greet"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "name"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " string"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " void"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "  console."
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "log"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "`Hello, ${"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "name"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "}!`"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ");"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "}"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "greet"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"World\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ");"
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "kết-luận",
      children: "Kết luận"
    }), "\n", createVNode(_components.p, {
      children: "Bắt đầu viết blog thôi! 🎉"
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

const url = "src/content/blog/first-post.vi.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.vi.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/first-post.vi.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
