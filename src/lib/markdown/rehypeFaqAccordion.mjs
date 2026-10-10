/**
 * Biến mục "Câu hỏi thường gặp" / "Frequently asked questions" trong bài thành các khối đóng/mở.
 *
 *   <h2>Câu hỏi thường gặp</h2>          <section class="faq">
 *   <h3>Câu hỏi?</h3>              →       <h2>Câu hỏi thường gặp</h2>
 *   <p>Trả lời…</p>                         <div class="faq-list">
 *                                             <details class="faq-item" id="cau-hoi">
 *                                               <summary>Câu hỏi?</summary>
 *                                               <div class="faq-answer"><p>Trả lời…</p></div>
 *
 * Dùng <details>/<summary> có sẵn của trình duyệt: không cần JS, dùng được bằng bàn phím.
 * Chạy SAU rehype-slug (để giữ id cho link #cau-hoi) và TRƯỚC rehype-autolink-headings.
 * Nội dung FAQ trong frontmatter (dữ liệu có cấu trúc cho SEO) không bị ảnh hưởng.
 */
const FAQ_TITLE = /^(câu hỏi thường gặp|frequently asked questions|faq)$/i;

const isEl = (node, tag) =>
  node && node.type === "element" && (!tag || node.tagName === tag);

function text(node) {
  if (!node) return "";
  if (node.type === "text") return node.value;
  return (node.children || []).map(text).join("");
}

export default function rehypeFaqAccordion() {
  return (tree) => {
    const kids = tree.children || [];
    for (let i = 0; i < kids.length; i++) {
      const h2 = kids[i];
      if (!isEl(h2, "h2") || !FAQ_TITLE.test(text(h2).trim())) continue;

      let end = i + 1;
      while (end < kids.length && !isEl(kids[end], "h2")) end++;
      const section = kids.slice(i + 1, end);

      const intro = [];
      const items = [];
      for (const node of section) {
        if (isEl(node, "h3")) {
          items.push({ heading: node, body: [] });
        } else if (items.length) {
          items[items.length - 1].body.push(node);
        } else {
          intro.push(node);
        }
      }
      if (!items.length) continue;

      const details = items.map(({ heading, body }) => ({
        type: "element",
        tagName: "details",
        properties: {
          className: ["faq-item"],
          ...(heading.properties?.id ? { id: heading.properties.id } : {}),
        },
        children: [
          {
            type: "element",
            tagName: "summary",
            properties: {},
            children: heading.children,
          },
          {
            type: "element",
            tagName: "div",
            properties: { className: ["faq-answer"] },
            children: body.filter(
              (n) => !(n.type === "text" && !n.value.trim()),
            ),
          },
        ],
      }));

      const wrapper = {
        type: "element",
        tagName: "section",
        properties: { className: ["faq"] },
        children: [
          h2,
          ...intro,
          {
            type: "element",
            tagName: "div",
            properties: { className: ["faq-list"] },
            children: details,
          },
        ],
      };
      kids.splice(i, end - i, wrapper);
    }
  };
}
