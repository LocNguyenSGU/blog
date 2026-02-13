import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "Hướng dẫn viết blog với Markdown",
  "description": "Cách viết bài blog đơn giản với Markdown",
  "pubDate": "2026-02-13T00:00:00.000Z",
  "author": "Your Name",
  "category": "programming",
  "tags": ["tutorial", "markdown"],
  "coverImage": "/images/posts/markdown-guide.svg",
  "coverAlt": "Markdown guide illustration",
  "lang": "vi",
  "translationKey": "markdown-guide"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "viết-blog-siêu-đơn-giản",
    "text": "Viết blog siêu đơn giản!"
  }, {
    "depth": 2,
    "slug": "frontmatter",
    "text": "Frontmatter"
  }, {
    "depth": 2,
    "slug": "nội-dung",
    "text": "Nội dung"
  }, {
    "depth": 2,
    "slug": "code-blocks",
    "text": "Code blocks"
  }, {
    "depth": 2,
    "slug": "danh-sách",
    "text": "Danh sách"
  }, {
    "depth": 2,
    "slug": "quote",
    "text": "Quote"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    code: "code",
    em: "em",
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
      id: "viết-blog-siêu-đơn-giản",
      children: "Viết blog siêu đơn giản!"
    }), "\n", createVNode(_components.p, {
      children: ["Bạn chỉ cần tạo file ", createVNode(_components.code, {
        children: ".mdx"
      }), " trong thư mục ", createVNode(_components.code, {
        children: "src/content/blog/"
      }), " là xong."]
    }), "\n", createVNode(_components.h2, {
      id: "frontmatter",
      children: "Frontmatter"
    }), "\n", createVNode(_components.p, {
      children: ["Phần trên cùng (giữa ", createVNode(_components.code, {
        children: "---"
      }), ") là metadata:"]
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
      "data-language": "yaml",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#85E89D"
            },
            children: "title"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"Tiêu đề bài viết\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#85E89D"
            },
            children: "description"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"Mô tả ngắn\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#85E89D"
            },
            children: "pubDate"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "2026-02-13"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#85E89D"
            },
            children: "author"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"Tên tác giả\""
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#85E89D"
            },
            children: "tags"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ": ["
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"tag1\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"tag2\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "]"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: "---"
          })
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "nội-dung",
      children: "Nội dung"
    }), "\n", createVNode(_components.p, {
      children: "Sau frontmatter, bạn viết Markdown bình thường:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.strong, {
          children: "Bold text"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.em, {
          children: "Italic text"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://example.com",
          children: "Links"
        })
      }), "\n", createVNode(_components.li, {
        children: ["Images: ", createVNode(_components.code, {
          children: "![Alt text](path/to/image.jpg)"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "code-blocks",
      children: "Code blocks"
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
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "const"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: " hello"
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: " ="
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: " \"world\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ";"
          })]
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
            children: "(hello);"
          })]
        })]
      })
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
      "data-language": "python",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "def"
          }), createVNode(_components.span, {
            style: {
              color: "#B392F0"
            },
            children: " greet"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "(name):"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "    print"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#F97583"
            },
            children: "f"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "\"Hello, "
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "{"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "name"
          }), createVNode(_components.span, {
            style: {
              color: "#79B8FF"
            },
            children: "}"
          }), createVNode(_components.span, {
            style: {
              color: "#9ECBFF"
            },
            children: "!\""
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "danh-sách",
      children: "Danh sách"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Mục 1"
      }), "\n", createVNode(_components.li, {
        children: "Mục 2"
      }), "\n", createVNode(_components.li, {
        children: "Mục 3"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "quote",
      children: "Quote"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "“Viết blog thật đơn giản với Markdown!”"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "That’s it! Không cần HTML, không cần phức tạp. 🎉"
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

const url = "src/content/blog/markdown-guide.vi.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.vi.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.vi.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
