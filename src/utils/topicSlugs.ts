// Danh sách topic hợp lệ. Dùng chung cho schema nội dung (src/content/config.ts)
// và định nghĩa hub (src/utils/topics.ts). Thêm topic mới: thêm slug ở đây + mục trong TOPICS.
export const TOPIC_SLUGS = ["ai", "career", "programming", "learning"] as const;

export type TopicSlugValue = (typeof TOPIC_SLUGS)[number];
