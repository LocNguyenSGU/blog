import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "How to Write Blog Posts with Markdown",
  "description": "A simple guide to writing blog posts with Markdown",
  "pubDate": "2026-02-13T00:00:00.000Z",
  "author": "Your Name",
  "category": "programming",
  "tags": ["tutorial", "markdown"],
  "coverImage": "/images/posts/markdown-guide.svg",
  "coverAlt": "Markdown guide illustration",
  "lang": "en",
  "translationKey": "markdown-guide"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "markdown-writing-guide",
    "text": "Markdown Writing Guide"
  }, {
    "depth": 2,
    "slug": "basic-syntax",
    "text": "Basic Syntax"
  }, {
    "depth": 3,
    "slug": "headings",
    "text": "Headings"
  }, {
    "depth": 3,
    "slug": "text-formatting",
    "text": "Text Formatting"
  }, {
    "depth": 3,
    "slug": "lists",
    "text": "Lists"
  }, {
    "depth": 3,
    "slug": "links-and-images",
    "text": "Links and Images"
  }, {
    "depth": 3,
    "slug": "code",
    "text": "Code"
  }, {
    "depth": 2,
    "slug": "conclusion",
    "text": "Conclusion"
  }];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    del: "del",
    em: "em",
    h1: "h1",
    h2: "h2",
    h3: "h3",
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
      id: "markdown-writing-guide",
      children: "Markdown Writing Guide"
    }), "\n", createVNode(_components.p, {
      children: "Markdown is a lightweight markup language that makes it easy to write formatted content."
    }), "\n", createVNode(_components.h2, {
      id: "basic-syntax",
      children: "Basic Syntax"
    }), "\n", createVNode(_components.h3, {
      id: "headings",
      children: "Headings"
    }), "\n", createVNode(_components.p, {
      children: ["Use ", createVNode(_components.code, {
        children: "#"
      }), " symbols to create headings:"]
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
      "data-language": "markdown",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#79B8FF",
              fontWeight: "bold"
            },
            children: "# H1 Heading"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#79B8FF",
              fontWeight: "bold"
            },
            children: "## H2 Heading"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#79B8FF",
              fontWeight: "bold"
            },
            children: "### H3 Heading"
          })
        })]
      })
    }), "\n", createVNode(_components.h3, {
      id: "text-formatting",
      children: "Text Formatting"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Bold text"
        }), ": ", createVNode(_components.code, {
          children: "**bold**"
        }), " or ", createVNode(_components.code, {
          children: "__bold__"
        })]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.em, {
          children: "Italic text"
        }), ": ", createVNode(_components.code, {
          children: "*italic*"
        }), " or ", createVNode(_components.code, {
          children: "_italic_"
        })]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.del, {
          children: "Strikethrough"
        }), ": ", createVNode(_components.code, {
          children: "~~strikethrough~~"
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "lists",
      children: "Lists"
    }), "\n", createVNode(_components.p, {
      children: "Unordered lists:"
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
      "data-language": "markdown",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "-"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " Item 1"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "-"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " Item 2"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "  -"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " Subitem"
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Ordered lists:"
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
      "data-language": "markdown",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "1."
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " First item"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "2."
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " Second item"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFAB70"
            },
            children: "3."
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: " Third item"
          })]
        })]
      })
    }), "\n", createVNode(_components.h3, {
      id: "links-and-images",
      children: "Links and Images"
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
      "data-language": "markdown",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "["
          }), createVNode(_components.span, {
            style: {
              color: "#DBEDFF",
              textDecoration: "underline"
            },
            children: "Link text"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "]("
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8",
              textDecoration: "underline"
            },
            children: "https://example.com"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "!["
          }), createVNode(_components.span, {
            style: {
              color: "#DBEDFF",
              textDecoration: "underline"
            },
            children: "Alt text"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: "]("
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8",
              textDecoration: "underline"
            },
            children: "image-url.jpg"
          }), createVNode(_components.span, {
            style: {
              color: "#E1E4E8"
            },
            children: ")"
          })]
        })]
      })
    }), "\n", createVNode(_components.h3, {
      id: "code",
      children: "Code"
    }), "\n", createVNode(_components.p, {
      children: "Inline code: `code`"
    }), "\n", createVNode(_components.p, {
      children: "Code blocks:\n```javascript\nconst greeting = “Hello, world!”;\nconsole.log(greeting);\n```"
    }), "\n", createVNode(_components.h2, {
      id: "conclusion",
      children: "Conclusion"
    }), "\n", createVNode(_components.p, {
      children: "Markdown makes writing blog posts simple and enjoyable. Give it a try!"
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

const url = "src/content/blog/markdown-guide.en.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.en.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/markdown-guide.en.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
