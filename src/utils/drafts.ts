/**
 * Bài nháp (draft: true) hiện ở `npm run dev` và ở bản preview của Vercel (mỗi PR),
 * để Lộc đọc thử trước khi duyệt. Production luôn ẩn. RSS luôn ẩn (xem src/pages/rss.xml.ts).
 * Ép hiện ở môi trường khác: đặt PUBLIC_SHOW_DRAFTS=true.
 */
export const SHOW_DRAFTS: boolean =
  import.meta.env.DEV === true ||
  import.meta.env.VERCEL_ENV === "preview" ||
  import.meta.env.PUBLIC_SHOW_DRAFTS === "true";

export function isVisiblePost(data: { draft?: boolean }): boolean {
  return !data.draft || SHOW_DRAFTS;
}
