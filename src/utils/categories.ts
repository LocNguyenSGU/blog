export const CATEGORIES = {
  programming: {
    name: 'Programming',
    labels: {
      en: 'Programming',
      vi: 'Lập trình',
    },
    descriptions: {
      en: 'Programming articles about building projects, technical writing, and practical software learning.',
      vi: 'Các bài viết về lập trình, xây project, viết kỹ thuật và cách học phần mềm theo hướng thực hành.',
    },
    introTitle: {
      en: 'Programming archive',
      vi: 'Kho bài viết về lập trình',
    },
    introBody: {
      en: 'This archive groups posts that help readers move from learning syntax to shipping projects, writing technical content, and building stronger engineering judgment.',
      vi: 'Trang này gom các bài giúp người đọc đi từ học syntax sang làm project thật, viết nội dung kỹ thuật và xây tư duy kỹ thuật vững hơn.',
    },
    color: 'blue',
    bgClass: 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-500/30'
  },
  lifestyle: {
    name: 'Lifestyle',
    labels: {
      en: 'Lifestyle',
      vi: 'Đời sống',
    },
    descriptions: {
      en: 'Lifestyle writing about energy management, work rhythms, and building a sustainable way of living.',
      vi: 'Các bài viết về quản lý năng lượng, nhịp làm việc và cách xây một đời sống bền vững hơn.',
    },
    introTitle: {
      en: 'Lifestyle archive',
      vi: 'Kho bài viết về đời sống',
    },
    introBody: {
      en: 'This archive focuses on energy, routines, and the practical side of staying effective without burning out.',
      vi: 'Trang này tập trung vào năng lượng, thói quen và mặt thực tế của việc duy trì hiệu suất mà không kiệt sức.',
    },
    color: 'green',
    bgClass: 'bg-green-500/20 text-green-700 dark:text-green-300',
    borderClass: 'border-green-500/30'
  },
  personal: {
    name: 'Personal',
    labels: {
      en: 'Personal',
      vi: 'Cá nhân',
    },
    descriptions: {
      en: 'Personal essays about career direction, self-navigation, and the way ideas change over time.',
      vi: 'Các bài viết cá nhân về định hướng nghề nghiệp, tự chèo lái và cách suy nghĩ thay đổi theo thời gian.',
    },
    introTitle: {
      en: 'Personal archive',
      vi: 'Kho bài viết cá nhân',
    },
    introBody: {
      en: 'This archive collects reflective essays about growth, self-direction, and making decisions before the path looks clear.',
      vi: 'Trang này gom các bài viết thiên về chiêm nghiệm, phát triển bản thân và ra quyết định khi con đường còn chưa rõ ràng.',
    },
    color: 'purple',
    bgClass: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-500/30'
  }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export function getCategoryInfo(category: CategoryKey) {
  return CATEGORIES[category];
}

export function getCategoryLabel(category: CategoryKey, locale: 'en' | 'vi') {
  return CATEGORIES[category].labels[locale];
}

export function getCategoryDescription(category: CategoryKey, locale: 'en' | 'vi') {
  return CATEGORIES[category].descriptions[locale];
}

export function getCategoryIntro(category: CategoryKey, locale: 'en' | 'vi') {
  return {
    title: CATEGORIES[category].introTitle[locale],
    body: CATEGORIES[category].introBody[locale],
  };
}

export function getCategoryUrl(category: CategoryKey, locale: 'en' | 'vi'): string {
  return `/categories/${category}?lang=${locale}`;
}
