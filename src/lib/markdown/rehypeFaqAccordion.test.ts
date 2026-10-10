import { describe, expect, it } from "vitest";
import rehypeFaqAccordion from "./rehypeFaqAccordion.mjs";

type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};
const el = (
  tagName: string,
  children: Node[] = [],
  properties: Record<string, unknown> = {},
): Node => ({ type: "element", tagName, properties, children });
const t = (value: string): Node => ({ type: "text", value });

describe("rehypeFaqAccordion", () => {
  it("biến các H3 dưới mục FAQ thành <details>, giữ id và dừng ở H2 kế tiếp", () => {
    const tree: Node = {
      type: "root",
      children: [
        el("p", [t("mở bài")]),
        el("h2", [t("Câu hỏi thường gặp")]),
        el("h3", [t("Hỏi 1?")], { id: "hoi-1" }),
        el("p", [t("Đáp 1")]),
        el("h3", [t("Hỏi 2?")], { id: "hoi-2" }),
        el("p", [t("Đáp 2a")]),
        el("p", [t("Đáp 2b")]),
        el("h2", [t("Nguồn tham khảo")]),
      ],
    };
    rehypeFaqAccordion()(tree);
    const kids = tree.children!;
    expect(kids.map((k) => k.tagName)).toEqual(["p", "section", "h2"]);
    const list = kids[1].children!.find((c) =>
      (c.properties?.className as string[] | undefined)?.includes("faq-list"),
    )!;
    expect(list.children!.map((d) => d.properties?.id)).toEqual([
      "hoi-1",
      "hoi-2",
    ]);
    expect(list.children![1].children![1].children!.length).toBe(2);
  });

  it("không đụng tới bài không có mục FAQ", () => {
    const tree: Node = {
      type: "root",
      children: [el("h2", [t("Kết luận")]), el("h3", [t("Ý 1")])],
    };
    rehypeFaqAccordion()(tree);
    expect(tree.children!.map((k) => k.tagName)).toEqual(["h2", "h3"]);
  });
});
