// Tên site dùng chung cho header, SEO (og:site_name, JSON-LD), RSS.
// Ghi đè được bằng biến môi trường PUBLIC_SITE_NAME.
export const SITE_NAME: string = import.meta.env.PUBLIC_SITE_NAME || 'Dev Journal';
