#!/usr/bin/env node
/**
 * Kiểm tra nội dung blog trước khi build/merge.
 * Schema từng field do Astro (zod) lo; script này kiểm tra những luật xuyên file mà zod không thấy:
 * cặp song ngữ, topic, ảnh, mô tả, bài nháp.
 *
 * Chạy: npm run validate:content        (lỗi → exit 1, cảnh báo → exit 0)
 *       npm run validate:content -- --strict   (cảnh báo cũng làm fail)
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, basename } from "node:path";

const ROOT = process.cwd();
const BLOG = join(ROOT, "src/content/blog");
const PUBLIC = join(ROOT, "public");
const STRICT = process.argv.includes("--strict");

const IMAGE_WARN_KB = 500;
const IMAGE_ERROR_KB = 3072;
const DESC_MIN = 50;
const DESC_MAX = 170;
const PLACEHOLDER = "_placeholder-cover.svg";
const FILE_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.(vi|en)\.mdx?$/;

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// ---------------------------------------------------------------- helpers
function unquote(v) {
  const s = v.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  )
    return s.slice(1, -1);
  return s;
}

/** Đọc các field cấp 1 trong frontmatter (đủ cho các luật ở đây; zod kiểm phần còn lại). */
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z_][\w]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    if (raw === "") {
      const items = [];
      while (
        i + 1 < lines.length &&
        /^\s+-\s/.test(lines[i + 1]) &&
        !/^\s+-\s+\w+:/.test(lines[i + 1])
      ) {
        items.push(unquote(lines[++i].replace(/^\s+-\s+/, "")));
      }
      data[key] = items.length ? items : "";
    } else if (raw.trim().startsWith("[")) {
      data[key] = raw
        .trim()
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((x) => unquote(x))
        .filter(Boolean);
    } else {
      data[key] = unquote(raw);
    }
  }
  data.__body = text.slice(m[0].length);
  return data;
}

function topicSlugs() {
  const src = readFileSync(join(ROOT, "src/utils/topicSlugs.ts"), "utf-8");
  const m = src.match(/TOPIC_SLUGS\s*=\s*\[([^\]]*)\]/);
  return m
    ? m[1]
        .split(",")
        .map((x) => unquote(x))
        .filter(Boolean)
    : [];
}

function pillarKeys() {
  const src = readFileSync(join(ROOT, "src/utils/topics.ts"), "utf-8");
  const out = {};
  for (const slug of topicSlugs()) {
    const start = src.indexOf(`\n  ${slug}: {`);
    if (start === -1) continue;
    const m = src.slice(start).match(/pillarTranslationKey:\s*'([^']+)'/);
    if (m) out[slug] = m[1];
  }
  return out;
}

function checkImage(file, ref, mdDir) {
  const target = ref.startsWith("/") ? join(PUBLIC, ref) : resolve(mdDir, ref);
  if (!existsSync(target)) {
    err(file, `ảnh không tồn tại: ${ref}`);
    return;
  }
  const kb = Math.round(statSync(target).size / 1024);
  if (kb > IMAGE_ERROR_KB)
    err(file, `ảnh quá nặng (${kb} KB > ${IMAGE_ERROR_KB} KB): ${ref}`);
  else if (kb > IMAGE_WARN_KB)
    warn(file, `ảnh nặng ${kb} KB (nên ≤ ${IMAGE_WARN_KB} KB): ${ref}`);
}

// ---------------------------------------------------------------- per file
const TOPICS = topicSlugs();
const posts = [];

for (const name of readdirSync(BLOG).sort()) {
  if (!/\.mdx?$/.test(name)) continue;
  const file = `src/content/blog/${name}`;
  const fm = frontmatter(readFileSync(join(BLOG, name), "utf-8"));
  if (!fm) {
    err(file, "thiếu frontmatter");
    continue;
  }
  const m = name.match(FILE_RE);
  if (!m) {
    err(
      file,
      "tên file phải dạng <slug>.vi.mdx / <slug>.en.mdx (chữ thường, gạch nối)",
    );
    continue;
  }
  const [, base, suffix] = m;
  const lang = fm.lang || "vi";
  const draft = fm.draft === "true";
  const topics = Array.isArray(fm.topics) ? fm.topics : [];

  if (lang !== suffix)
    err(file, `lang: "${lang}" không khớp đuôi file .${suffix}`);
  if (!fm.translationKey)
    err(file, "thiếu translationKey (dùng để nối bản vi/en)");
  for (const t of topics)
    if (!TOPICS.includes(t))
      err(file, `topic không hợp lệ "${t}" (có: ${TOPICS.join(", ")})`);
  if (!draft && topics.length === 0 && base !== "first-post")
    warn(file, "chưa gắn topics, bài sẽ không xuất hiện ở trang chủ đề nào");

  const desc = fm.description || "";
  if (!desc)
    (draft ? warn : err)(file, "thiếu description (meta description cho SEO)");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    warn(
      file,
      `description dài ${desc.length} ký tự (nên ${DESC_MIN}–${DESC_MAX})`,
    );

  if (!fm.coverImage) err(file, "thiếu coverImage");
  else {
    checkImage(file, fm.coverImage, BLOG);
    if (fm.coverImage.includes(PLACEHOLDER) && !draft)
      err(file, "đang dùng ảnh bìa tạm, thay ảnh thật trước khi bỏ draft");
  }
  if (!fm.coverAlt || fm.coverAlt === "Cover image")
    warn(file, "coverAlt chưa mô tả ảnh (cần cho accessibility)");

  for (const im of fm.__body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (/^https?:/.test(im[1])) continue;
    checkImage(file, im[1], BLOG);
  }
  if (/TODO|\[\[VIẾT|\[\[WRITE/.test(fm.__body) && !draft)
    err(file, "còn đánh dấu TODO / [[VIẾT…]] trong bài đã bỏ draft");

  if (!draft && fm.pubDate && new Date(fm.pubDate) > new Date())
    warn(file, `pubDate ${fm.pubDate} ở tương lai`);

  posts.push({
    file,
    base,
    lang,
    draft,
    topics,
    key: fm.translationKey,
    category: fm.category,
    pubDate: fm.pubDate,
    cover: fm.coverImage,
  });
}

// ---------------------------------------------------------------- cặp song ngữ
const byKey = new Map();
for (const p of posts) {
  if (!p.key) continue;
  if (!byKey.has(p.key)) byKey.set(p.key, []);
  byKey.get(p.key).push(p);
}
for (const [key, group] of byKey) {
  const vi = group.filter((p) => p.lang === "vi");
  const en = group.filter((p) => p.lang === "en");
  const where = `translationKey "${key}"`;
  if (vi.length !== 1 || en.length !== 1) {
    err(
      where,
      `cần đúng 1 bản vi và 1 bản en, đang có vi=${vi.length}, en=${en.length} (${group.map((p) => basename(p.file)).join(", ")})`,
    );
    continue;
  }
  const [a, b] = [vi[0], en[0]];
  if (a.base !== b.base)
    warn(where, `hai bản khác tên file gốc: ${a.base} / ${b.base}`);
  if (a.draft !== b.draft)
    err(where, "một bản draft, một bản không: bỏ draft cả hai cùng lúc");
  if (a.category !== b.category)
    err(where, `category lệch: vi=${a.category}, en=${b.category}`);
  if ([...a.topics].sort().join() !== [...b.topics].sort().join())
    err(where, `topics lệch: vi=[${a.topics}], en=[${b.topics}]`);
  if (a.pubDate !== b.pubDate)
    err(where, `pubDate lệch: vi=${a.pubDate}, en=${b.pubDate}`);
  if (a.cover !== b.cover) warn(where, "hai bản dùng ảnh bìa khác nhau");
}

// ---------------------------------------------------------------- bài trụ cột của topic
for (const [slug, key] of Object.entries(pillarKeys())) {
  const group = byKey.get(key) || [];
  const live = group.filter((p) => !p.draft);
  if (live.length === 0)
    err(
      `topic "${slug}"`,
      `pillarTranslationKey "${key}" không trỏ tới bài đã xuất bản nào`,
    );
  else if (!live.every((p) => p.topics.includes(slug)))
    err(
      `topic "${slug}"`,
      `bài trụ cột "${key}" chưa khai báo topics: ["${slug}"]`,
    );
}

// ---------------------------------------------------------------- report
const live = posts.filter((p) => !p.draft).length;
console.log(
  `Blog: ${posts.length} file (${live} đã xuất bản, ${posts.length - live} nháp), ${byKey.size} cặp song ngữ`,
);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} cảnh báo`);
  for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length) {
  console.log(`\n✗ ${errors.length} lỗi`);
  for (const e of errors) console.log(`  - ${e}`);
}
if (!errors.length && !warnings.length)
  console.log("✓ Không có lỗi hay cảnh báo");
else if (!errors.length) console.log("\n✓ Không có lỗi");

// exitCode thay cho process.exit(): để output qua pipe in đủ trước khi thoát
process.exitCode = errors.length || (STRICT && warnings.length) ? 1 : 0;
