import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "Hành trình học lập trình của tôi",
  "description": "Những suy nghĩ và trải nghiệm từ hành trình học code",
  "pubDate": "2026-02-12T00:00:00.000Z",
  "author": "Your Name",
  "category": "lifestyle",
  "tags": ["personal", "coding", "journey"],
  "coverImage": "/images/posts/coding-journey.svg",
  "coverAlt": "My coding journey",
  "lang": "vi",
  "translationKey": "coding-journey"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "bắt-đầu-từ-đâu",
    "text": "Bắt đầu từ đâu?"
  }, {
    "depth": 2,
    "slug": "bài-học-quan-trọng-nhất",
    "text": "Bài học quan trọng nhất"
  }, {
    "depth": 2,
    "slug": "công-cụ-yêu-thích",
    "text": "Công cụ yêu thích"
  }, {
    "depth": 2,
    "slug": "lời-khuyên-cho-người-mới",
    "text": "Lời khuyên cho người mới"
  }];
}
function _createMdxContent(props) {
  const _components = {
    blockquote: "blockquote",
    code: "code",
    h1: "h1",
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "bắt-đầu-từ-đâu",
      children: "Bắt đầu từ đâu?"
    }), "\n", createVNode(_components.p, {
      children: "Tôi bắt đầu học lập trình từ năm 2020, và đây là những gì tôi đã học được."
    }), "\n", createVNode(_components.h2, {
      id: "bài-học-quan-trọng-nhất",
      children: "Bài học quan trọng nhất"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Kiên nhẫn"
        }), " - Học lập trình cần thời gian"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Thực hành"
        }), " - Code mỗi ngày, dù chỉ 30 phút"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Cộng đồng"
        }), " - Tham gia các group, forum để học hỏi"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "công-cụ-yêu-thích",
      children: "Công cụ yêu thích"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "VS Code - Editor tốt nhất"
      }), "\n", createVNode(_components.li, {
        children: "Git - Version control"
      }), "\n", createVNode(_components.li, {
        children: "Chrome DevTools - Debug hiệu quả"
      }), "\n"]
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
      "data-language": "javascript",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#6A737D"
            },
            children: "// First \"Hello World\" của tôi"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "console."
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
            children: "\"Hello, World!\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ");"
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "lời-khuyên-cho-người-mới",
      children: "Lời khuyên cho người mới"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "“Đừng so sánh tiến độ của bạn với người khác. Mỗi người có lộ trình riêng.”"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Hãy tập trung vào việc học và cải thiện mỗi ngày!"
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

const url = "src/content/blog/coding-journey.vi.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.vi.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.vi.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
