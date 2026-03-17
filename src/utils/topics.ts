import type { CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';
import { getLocalizedTopicUrl } from './routing';

interface TopicDefinition {
  en: {
    name: string;
    description: string;
    pillarDescription: string;
    intro: string;
  };
  vi: {
    name: string;
    description: string;
    pillarDescription: string;
    intro: string;
  };
  translationKeys: string[];
  pillarTranslationKey: string;
}

export const TOPICS: Record<'ai' | 'career' | 'programming' | 'learning', TopicDefinition> = {
  ai: {
    en: {
      name: 'AI',
      description: 'AI workflows, automation, and how AI changes building, learning, and work.',
      pillarDescription: 'The pillar article in this cluster explains how AI reshapes work structure, not just individual tasks or side projects.',
      intro: 'Use this hub if you want to understand AI as a systems change: how it affects personal projects, learning habits, and team-level work design.',
    },
    vi: {
      name: 'AI',
      description: 'Workflow với AI, tự động hóa và cách AI thay đổi việc học, xây dựng sản phẩm và công việc.',
      pillarDescription: 'Bài trụ cột của cụm này giải thích cách AI tái cấu trúc công việc ở quy mô lớn, không chỉ tăng tốc từng tác vụ riêng lẻ.',
      intro: 'Hub này phù hợp nếu bạn muốn nhìn AI như một thay đổi mang tính hệ thống: từ project cá nhân, cách học, tới cách tổ chức công việc.',
    },
    translationKeys: ['building-blog-with-ai', 'ai-phong-ban-ao', 'learning-in-ai-era'],
    pillarTranslationKey: 'ai-phong-ban-ao',
  },
  career: {
    en: {
      name: 'Career',
      description: 'Career growth, self-navigation, discipline, and learning how to operate without waiting.',
      pillarDescription: 'This pillar article frames career growth around self-navigation instead of waiting for ideal guidance.',
      intro: 'This hub focuses on career growth for people who have to move before they feel fully ready, fully guided, or fully certain.',
    },
    vi: {
      name: 'Career',
      description: 'Phát triển nghề nghiệp, tự chèo lái, kỷ luật cá nhân và cách tiến lên mà không chờ ai cứu.',
      pillarDescription: 'Bài trụ cột của cụm này đặt nền cho chuyện phát triển nghề nghiệp bằng tự chèo lái thay vì chờ điều kiện hoàn hảo.',
      intro: 'Cụm này dành cho người phải tiến lên trước khi có đủ chỉ dẫn, đủ tự tin hoặc đủ điều kiện hoàn hảo.',
    },
    translationKeys: ['self-mentored-young-developer', 'quan-ly-nang-luong-sau-8-tieng-van-phong', 'learning-in-ai-era'],
    pillarTranslationKey: 'self-mentored-young-developer',
  },
  programming: {
    en: {
      name: 'Programming',
      description: 'Programming practice, writing technical content, and building useful projects.',
      pillarDescription: 'This pillar article shows programming as shipping real projects, not only studying syntax in isolation.',
      intro: 'Start here if you care about programming as practice: building things, documenting them well, and learning through shipment.',
    },
    vi: {
      name: 'Programming',
      description: 'Thực hành lập trình, viết nội dung kỹ thuật và xây các project có ích.',
      pillarDescription: 'Bài trụ cột của cụm này cho thấy lập trình nên gắn với việc build và ship project thật, không chỉ học syntax riêng lẻ.',
      intro: 'Hãy đọc cụm này nếu bạn quan tâm tới lập trình như một quá trình thực hành: xây thứ thật, viết lại rõ ràng và học qua việc ship.',
    },
    translationKeys: ['coding-journey', 'markdown-guide', 'building-blog-with-ai', 'self-mentored-young-developer'],
    pillarTranslationKey: 'building-blog-with-ai',
  },
  learning: {
    en: {
      name: 'Learning',
      description: 'Learning systems, learning curves, self-study, and how to improve with depth.',
      pillarDescription: 'The pillar article here defines the core argument: learning still matters because it transforms the learner, not just the output.',
      intro: 'This hub is for readers trying to learn with depth in an era where AI can generate outputs faster than people can understand them.',
    },
    vi: {
      name: 'Learning',
      description: 'Hệ thống học tập, learning curve, tự học và cách tiến bộ có chiều sâu.',
      pillarDescription: 'Bài trụ cột ở đây nêu luận điểm nền: học vẫn quan trọng vì nó biến đổi chính người học, không chỉ tạo ra đầu ra.',
      intro: 'Cụm này dành cho người muốn học có chiều sâu trong thời đại AI có thể tạo output nhanh hơn tốc độ con người thật sự hiểu vấn đề.',
    },
    translationKeys: ['coding-journey', 'learning-in-ai-era', 'self-mentored-young-developer', 'markdown-guide'],
    pillarTranslationKey: 'learning-in-ai-era',
  },
};

export type TopicSlug = keyof typeof TOPICS;

export function isTopicSlug(value: string): value is TopicSlug {
  return value in TOPICS;
}

export function getTopicInfo(slug: TopicSlug, locale: Locale) {
  return TOPICS[slug][locale];
}

export function getTopicUrl(slug: TopicSlug, locale: Locale): string {
  return getLocalizedTopicUrl(locale, slug);
}

export function getTopicPosts(
  posts: CollectionEntry<'blog'>[],
  slug: TopicSlug,
  locale: Locale
): CollectionEntry<'blog'>[] {
  const keys = new Set(TOPICS[slug].translationKeys);

  return posts
    .filter((post) => !post.data.draft && post.data.lang === locale && !!post.data.translationKey && keys.has(post.data.translationKey))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getTopicPillarPost(
  posts: CollectionEntry<'blog'>[],
  slug: TopicSlug,
  locale: Locale
): CollectionEntry<'blog'> | undefined {
  const pillarTranslationKey = TOPICS[slug].pillarTranslationKey;

  return posts.find(
    (post) =>
      !post.data.draft &&
      post.data.lang === locale &&
      post.data.translationKey === pillarTranslationKey
  );
}

export function getTopicsForTranslationKey(translationKey?: string): TopicSlug[] {
  if (!translationKey) {
    return [];
  }

  return (Object.keys(TOPICS) as TopicSlug[]).filter((slug) =>
    TOPICS[slug].translationKeys.includes(translationKey)
  );
}
