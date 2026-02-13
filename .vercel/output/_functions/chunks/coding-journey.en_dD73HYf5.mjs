import { o as createVNode, F as Fragment, ay as __astro_tag_component__ } from './astro/server_CphY_etb.mjs';
import 'clsx';

const frontmatter = {
  "title": "My Coding Journey",
  "description": "Thoughts and experiences from my journey learning to code",
  "pubDate": "2026-02-12T00:00:00.000Z",
  "author": "Your Name",
  "category": "lifestyle",
  "tags": ["personal", "coding", "journey"],
  "coverImage": "/images/posts/coding-journey.svg",
  "coverAlt": "My coding journey",
  "lang": "en",
  "translationKey": "coding-journey"
};
function getHeadings() {
  return [{
    "depth": 1,
    "slug": "my-coding-journey",
    "text": "My Coding Journey"
  }, {
    "depth": 2,
    "slug": "the-beginning",
    "text": "The Beginning"
  }, {
    "depth": 2,
    "slug": "challenges-i-faced",
    "text": "Challenges I Faced"
  }, {
    "depth": 3,
    "slug": "imposter-syndrome",
    "text": "Imposter Syndrome"
  }, {
    "depth": 3,
    "slug": "information-overload",
    "text": "Information Overload"
  }, {
    "depth": 2,
    "slug": "what-helped-me",
    "text": "What Helped Me"
  }, {
    "depth": 2,
    "slug": "where-i-am-now",
    "text": "Where I Am Now"
  }, {
    "depth": 2,
    "slug": "advice-for-beginners",
    "text": "Advice for Beginners"
  }];
}
function _createMdxContent(props) {
  const _components = {
    em: "em",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "my-coding-journey",
      children: "My Coding Journey"
    }), "\n", createVNode(_components.p, {
      children: "Learning to code has been one of the most rewarding experiences of my life. Here’s my story."
    }), "\n", createVNode(_components.h2, {
      id: "the-beginning",
      children: "The Beginning"
    }), "\n", createVNode(_components.p, {
      children: "I started learning programming because I was curious about how websites and apps work. At first, it seemed overwhelming with all the different languages and frameworks."
    }), "\n", createVNode(_components.h2, {
      id: "challenges-i-faced",
      children: "Challenges I Faced"
    }), "\n", createVNode(_components.h3, {
      id: "imposter-syndrome",
      children: "Imposter Syndrome"
    }), "\n", createVNode(_components.p, {
      children: "Like many beginners, I struggled with feeling like I wasn’t “good enough.” Every time I encountered an error or bug, I doubted my abilities."
    }), "\n", createVNode(_components.h3, {
      id: "information-overload",
      children: "Information Overload"
    }), "\n", createVNode(_components.p, {
      children: "There are so many resources online – tutorials, courses, documentation. It was hard to know where to start and what to focus on."
    }), "\n", createVNode(_components.h2, {
      id: "what-helped-me",
      children: "What Helped Me"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Consistency"
        }), ": Coding a little bit every day, even just 30 minutes, made a huge difference"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Building Projects"
        }), ": Learning by doing was far more effective than just watching tutorials"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Community"
        }), ": Joining coding communities and forums helped me learn from others and stay motivated"]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "where-i-am-now",
      children: "Where I Am Now"
    }), "\n", createVNode(_components.p, {
      children: "I’m still learning every day, and I’ve come to accept that programming is a continuous journey. There’s always something new to discover and master."
    }), "\n", createVNode(_components.h2, {
      id: "advice-for-beginners",
      children: "Advice for Beginners"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Don’t be afraid to make mistakes – they’re how you learn"
      }), "\n", createVNode(_components.li, {
        children: "Start with small projects and gradually increase complexity"
      }), "\n", createVNode(_components.li, {
        children: "Find a community or study group for support"
      }), "\n", createVNode(_components.li, {
        children: "Celebrate small wins along the way"
      }), "\n"]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Keep coding, keep learning!"
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

const url = "src/content/blog/coding-journey.en.mdx";
const file = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.en.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/nguyenhuuloc/Documents/blog/src/content/blog/coding-journey.en.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
