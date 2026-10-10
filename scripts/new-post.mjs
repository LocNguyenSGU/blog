#!/usr/bin/env node
/**
 * Tạo khung một bài mới: cặp <slug>.vi.mdx + <slug>.en.mdx, luôn draft: true.
 *
 * npm run new-post -- <slug> [--category personal|programming|lifestyle] [--topics ai,career]
 *                            [--key <translationKey>] [--title-vi "..."] [--title-en "..."] [--date YYYY-MM-DD]
 *
 * Ví dụ: npm run new-post -- bo-nao-thu-hai --category programming --topics ai,learning \
 *          --title-vi "Bộ não thứ hai" --title-en "My Second Brain"
 */
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BLOG = join(ROOT, "src/content/blog");
const CATEGORIES = ["programming", "lifestyle", "personal"];
const PLACEHOLDER = "./_images/_placeholder-cover.svg";

class FailError extends Error {}
// Không dùng process.exit(): trên macOS output qua pipe có thể bị cắt.
process.on("uncaughtException", (e) => {
  if (!(e instanceof FailError)) console.error(e);
  process.exitCode = 1;
});

function fail(msg) {
  console.error(`✗ ${msg}`);
  throw new FailError(msg);
}

const args = process.argv.slice(2);
const slug = args.find(
  (a) => !a.startsWith("--") && !args[args.indexOf(a) - 1]?.startsWith("--"),
);
const opt = (name, fallback = "") => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--")
    ? args[i + 1]
    : fallback;
};

if (!slug)
  fail("thiếu slug. Ví dụ: npm run new-post -- bo-nao-thu-hai --topics ai");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
  fail(`slug "${slug}" chỉ được chữ thường không dấu, số, gạch nối`);

const category = opt("category", "personal");
if (!CATEGORIES.includes(category))
  fail(`category phải là một trong: ${CATEGORIES.join(", ")}`);

const topicSrc = readFileSync(join(ROOT, "src/utils/topicSlugs.ts"), "utf-8");
const allowed = (topicSrc.match(/TOPIC_SLUGS\s*=\s*\[([^\]]*)\]/)?.[1] || "")
  .split(",")
  .map((x) => x.trim().replace(/['"]/g, ""))
  .filter(Boolean);
const topics = opt("topics")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);
for (const t of topics)
  if (!allowed.includes(t))
    fail(`topic "${t}" không có (có: ${allowed.join(", ")})`);

const key = opt("key", slug);
const today = new Date();
const date = opt(
  "date",
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail("--date phải dạng YYYY-MM-DD");

const files = {
  vi: join(BLOG, `${slug}.vi.mdx`),
  en: join(BLOG, `${slug}.en.mdx`),
};
for (const f of Object.values(files))
  if (existsSync(f)) fail(`đã có file ${f.replace(ROOT + "/", "")}`);

const q = (s) => JSON.stringify(s);
const topicLine = `[${topics.map((t) => q(t)).join(", ")}]`;

const T = {
  vi: {
    title: opt("title-vi", "[[VIẾT tiêu đề]]"),
    desc: "[[VIẾT mô tả 50–170 ký tự: nói rõ người đọc nhận được gì]]",
    alt: "[[VIẾT mô tả ảnh bìa]]",
    body: `[[VIẾT mở bài: 2–4 đoạn ngắn, một tình huống thật, xưng "tôi", nói với người đọc là "bạn"]]

## Câu trả lời ngắn

**[[VIẾT một câu trả lời thẳng, in đậm.]]** [[VIẾT 1–2 câu giải thích.]]

## [[VIẾT phần 1]]

## [[VIẾT phần 2]]

## [[VIẾT phần 3]]

## [[VIẾT kết: một hành động nhỏ người đọc làm được ngay]]

## Câu hỏi thường gặp

### [[Câu hỏi 1, giống faqs[0].question]]

[[Trả lời, giống faqs[0].answer]]
`,
    faq: [
      ["[[Câu hỏi 1]]", "[[Trả lời 1]]"],
      ["[[Câu hỏi 2]]", "[[Trả lời 2]]"],
      ["[[Câu hỏi 3]]", "[[Trả lời 3]]"],
    ],
  },
  en: {
    title: opt("title-en", "[[WRITE title]]"),
    desc: "[[WRITE a 50–170 character description: what the reader gets]]",
    alt: "[[WRITE cover image description]]",
    body: `[[WRITE opening: 2–4 short paragraphs, a real situation, first person]]

## Short answer

**[[WRITE one direct answer, in bold.]]** [[WRITE 1–2 sentences of context.]]

## [[WRITE section 1]]

## [[WRITE section 2]]

## [[WRITE section 3]]

## [[WRITE closing: one small action the reader can take today]]

## Frequently asked questions

### [[Question 1, same as faqs[0].question]]

[[Answer, same as faqs[0].answer]]
`,
    faq: [
      ["[[Question 1]]", "[[Answer 1]]"],
      ["[[Question 2]]", "[[Answer 2]]"],
      ["[[Question 3]]", "[[Answer 3]]"],
    ],
  },
};

for (const lang of ["vi", "en"]) {
  const t = T[lang];
  const faqs = t.faq
    .map(([qq, a]) => `  - question: ${q(qq)}\n    answer: ${q(a)}`)
    .join("\n");
  const content = `---
title: ${q(t.title)}
description: ${q(t.desc)}
coverImage: ${q(PLACEHOLDER)}
coverAlt: ${q(t.alt)}
pubDate: ${date}
faqs:
${faqs}
category: ${q(category)}
topics: ${topicLine}
author: "Loc Nguyen"
lang: ${q(lang)}
translationKey: ${q(key)}
draft: true
---

${t.body}`;
  writeFileSync(files[lang], content);
}

console.log(`✓ Đã tạo (draft: true):
  src/content/blog/${slug}.vi.mdx
  src/content/blog/${slug}.en.mdx
Tiếp theo: viết nội dung, thay ảnh bìa trong src/content/blog/_images/, chạy npm run validate:content.
Khi duyệt xong mới đổi draft: false ở CẢ HAI file.`);
