export type Locale = 'en' | 'vi';

export const defaultLocale: Locale = 'vi';

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.books': 'Books',
    'nav.about': 'About',

    // Homepage
    'home.title': 'Welcome to My Blog',
    'home.subtitle': 'Sharing knowledge about programming, technology and life',
    'home.readBlog': 'Read Blog',
    'home.aboutMe': 'About Me',
    'home.featured': 'Featured Post',
    'home.recent': 'Recent Posts',
    'home.viewAll': 'View all →',
    'home.pillarTitle': 'Start with Pillar Articles',
    'home.pillarLink': 'See topic architecture →',
    'home.readPillar': 'Read pillar article →',
    'home.browseByCategory': 'Browse by Category',
    'home.viewCategoryArchives': 'View category archives →',
    'home.browseByTopic': 'Explore by Topic',
    'home.viewTopicHubs': 'View topic hubs →',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Thoughts, tutorials, and stories',
    'blog.allPosts': 'All Posts',
    'blog.archive': 'Blog Archive',
    'blog.archiveTitle': 'Blog Archive | Loc Nguyen',
    'blog.filterByCategory': 'Filter by category',
    'blog.allCategories': 'All categories',
    'blog.filterByTopic': 'Filter by topic',
    'blog.allTopics': 'All topics',
    'blog.filteredPosts': 'Filtered posts',
    'blog.clearFilters': 'Clear filters →',
    'blog.noPostsMatch': 'No posts match the current category/topic filters.',
    'blog.noPostsEn': 'No posts available in English yet.',
    'blog.noPostsVi': 'Chưa có bài viết bằng tiếng Việt.',
    'blog.categoryArchives': 'Category Archives',
    'blog.browseCategories': 'Browse all categories →',
    'blog.topicHubs': 'Topic Hubs',
    'blog.browseTopics': 'Browse all topics →',
    'blog.openTopicHub': 'Open canonical topic hub →',
    'blog.openCategoryArchive': 'Open canonical category archive →',
    'blog.topicFilter': 'Topic filter preview',
    'blog.categoryFilter': 'Category filter preview',
    'blog.archiveSubtitle': 'Browse all blog posts about programming, AI, learning, and personal growth.',
    'blog.archiveTopicSubtitle': 'Browse blog posts related to {topic}, including the core article cluster and supporting essays.',
    'blog.archiveCategorySubtitle': 'Browse {category} posts from Loc Nguyen\'s blog.',

    // Books
    'books.title': 'Books I\'ve Read',
    'books.subtitle': '{count} books completed',
    'books.categories.tech': 'Technology',
    'books.categories.fiction': 'Fiction',
    'books.categories.business': 'Business',
    'books.categories.self-help': 'Self-Help',
    'books.categories.other': 'Other',
    'books.noBooks': 'No books yet.',
    'books.backToList': 'Back to list',
    'books.readFrom': 'Read from:',
    'books.review': 'Book review',
    'books.errorLoading': 'Unable to load books. Please try again later.',
    'books.listSubtitle': 'Reading list',

    // Post
    'post.readTime': 'min read',
    'post.views': 'views',
    'post.comments': 'Comments',
    'post.updated': 'Updated {date}',
    'post.relatedReading': 'Related reading',
    'post.exploreTopics': 'Explore related topics',

    // Categories
    'category.programming': 'Programming',
    'category.lifestyle': 'Lifestyle',
    'category.personal': 'Personal',
    'category.archives': 'Category Archives',
    'category.archive': 'Category archive',
    'category.featured': 'Featured in this category',
    'category.more': 'More in this category',
    'category.relatedHubs': 'Related topic hubs',
    'category.archivesTitle': 'Category Archives | Loc Nguyen',
    'category.archivesSubtitle': 'Browse blog archives by category: programming, lifestyle, and personal.',
    'category.archivesDescription': 'Use category pages when you want a cleaner archive by intent, not just a long reverse-chronological list.',
    'category.singleTitle': '{name} | Category Archive',

    // Topics
    'topic.hub': 'Topic Hub',
    'topic.hubs': 'Topic Hubs',
    'topic.pillar': 'Pillar article',
    'topic.startHere': 'Start here',
    'topic.moreInTopic': 'More in this topic',
    'topic.exploreOther': 'Explore other topics',
    'topic.howToUse': 'How to use this topic hub',
    'topic.whatHubsFor': 'What these hubs are for',
    'topic.hubsTitle': 'Topic Hubs | Loc Nguyen',
    'topic.hubsSubtitle': 'Browse topic hubs for AI, career, programming, and learning.',
    'topic.hubsDescription': 'Use these hub pages to explore connected posts by topic instead of reading articles one by one.',
    'topic.singleTitle': '{name} | Topic Hub',
    'topic.cluster': 'topic cluster',

    // Breadcrumbs
    'breadcrumb.home': 'Home',
    'breadcrumb.books': 'Books',
    'breadcrumb.topics': 'Topics',
    'breadcrumb.categories': 'Categories',

    // Footer
    'footer.copyright': 'My Blog. Built with Astro & Tailwind CSS.',
    'footer.pillarArticles': 'Pillar articles',
    'footer.topicHubs': 'Topic hubs',
    'footer.categoryArchives': 'Category archives',
    'footer.browseAllTopicHubs': 'Browse all topic hubs',
    'footer.browseAllCategories': 'Browse all categories',

    // Language
    'lang.switch': 'Switch to Vietnamese',
    'lang.current': 'English',

    // Errors
    'error.loadPosts': 'Unable to load blog posts. Please try again later.',
    'error.loadBooks': 'Unable to load books. Please try again later.',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.blog': 'Blog',
    'nav.books': 'Sách',
    'nav.about': 'Giới thiệu',

    // Homepage
    'home.title': 'Chào mừng đến với Blog của tôi',
    'home.subtitle': 'Chia sẻ kiến thức về lập trình, công nghệ và cuộc sống',
    'home.readBlog': 'Đọc Blog',
    'home.aboutMe': 'Về Tôi',
    'home.featured': 'Bài viết nổi bật',
    'home.recent': 'Bài viết gần đây',
    'home.viewAll': 'Xem tất cả →',
    'home.pillarTitle': 'Bắt đầu với bài trụ cột',
    'home.pillarLink': 'Xem cấu trúc chủ đề →',
    'home.readPillar': 'Đọc bài trụ cột →',
    'home.browseByCategory': 'Đọc Theo Category',
    'home.viewCategoryArchives': 'Xem kho category →',
    'home.browseByTopic': 'Đọc Theo Chủ Đề',
    'home.viewTopicHubs': 'Xem các hub chủ đề →',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Suy nghĩ, hướng dẫn và câu chuyện',
    'blog.allPosts': 'Tất cả bài viết',
    'blog.archive': 'Kho bài viết',
    'blog.archiveTitle': 'Kho bài viết | Lộc Nguyễn',
    'blog.filterByCategory': 'Lọc theo category',
    'blog.allCategories': 'Tất cả category',
    'blog.filterByTopic': 'Lọc theo topic',
    'blog.allTopics': 'Tất cả topic',
    'blog.filteredPosts': 'Bài theo bộ lọc',
    'blog.clearFilters': 'Xóa bộ lọc →',
    'blog.noPostsMatch': 'Không có bài nào khớp với bộ lọc category/topic hiện tại.',
    'blog.noPostsEn': 'No posts available in English yet.',
    'blog.noPostsVi': 'Chưa có bài viết bằng tiếng Việt.',
    'blog.categoryArchives': 'Kho Category',
    'blog.browseCategories': 'Xem tất cả category →',
    'blog.topicHubs': 'Hub Chủ Đề',
    'blog.browseTopics': 'Xem tất cả chủ đề →',
    'blog.openTopicHub': 'Mở topic hub chính thức →',
    'blog.openCategoryArchive': 'Mở category archive chính thức →',
    'blog.topicFilter': 'Bản xem trước theo topic',
    'blog.categoryFilter': 'Bản xem trước theo category',
    'blog.archiveSubtitle': 'Xem toàn bộ bài viết về lập trình, AI, học tập và phát triển bản thân.',
    'blog.archiveTopicSubtitle': 'Xem các bài viết thuộc cụm {topic}, gồm bài trụ cột và các bài vệ tinh liên quan.',
    'blog.archiveCategorySubtitle': 'Xem các bài thuộc nhóm {category} trên blog của Lộc Nguyễn.',

    // Books
    'books.title': 'Sách Tôi Đã Đọc',
    'books.subtitle': '{count} cuốn sách đã hoàn thành',
    'books.categories.tech': 'Công nghệ',
    'books.categories.fiction': 'Tiểu thuyết',
    'books.categories.business': 'Kinh doanh',
    'books.categories.self-help': 'Phát triển bản thân',
    'books.categories.other': 'Khác',
    'books.noBooks': 'Chưa có sách nào.',
    'books.backToList': 'Quay lại danh sách',
    'books.readFrom': 'Đọc từ:',
    'books.review': 'Đánh giá sách',
    'books.errorLoading': 'Không thể tải sách. Vui lòng thử lại sau.',
    'books.listSubtitle': 'Danh sách sách đã đọc',

    // Post
    'post.readTime': 'phút đọc',
    'post.views': 'lượt xem',
    'post.comments': 'Bình luận',
    'post.updated': 'Cập nhật {date}',
    'post.relatedReading': 'Đọc tiếp',
    'post.exploreTopics': 'Khám phá theo cụm chủ đề',

    // Categories
    'category.programming': 'Lập trình',
    'category.lifestyle': 'Đời sống',
    'category.personal': 'Cá nhân',
    'category.archives': 'Kho Category',
    'category.archive': 'Kho category',
    'category.featured': 'Bài nổi bật trong category này',
    'category.more': 'Đọc thêm trong category này',
    'category.relatedHubs': 'Hub chủ đề liên quan',
    'category.archivesTitle': 'Kho category | Lộc Nguyễn',
    'category.archivesSubtitle': 'Duyệt blog theo category: lập trình, đời sống và cá nhân.',
    'category.archivesDescription': 'Dùng các trang category khi bạn muốn duyệt nội dung theo ý định đọc, thay vì chỉ xem danh sách bài theo thời gian.',
    'category.singleTitle': '{name} | Kho category',

    // Topics
    'topic.hub': 'Hub chủ đề',
    'topic.hubs': 'Cụm chủ đề',
    'topic.pillar': 'Bài trụ cột',
    'topic.startHere': 'Nên bắt đầu từ đây',
    'topic.moreInTopic': 'Đọc thêm trong cụm này',
    'topic.exploreOther': 'Khám phá cụm khác',
    'topic.howToUse': 'Cách dùng hub chủ đề này',
    'topic.whatHubsFor': 'Các hub này dùng để làm gì',
    'topic.hubsTitle': 'Cụm chủ đề | Lộc Nguyễn',
    'topic.hubsSubtitle': 'Khám phá các cụm chủ đề về AI, nghề nghiệp, lập trình và học tập.',
    'topic.hubsDescription': 'Dùng các trang hub này để đọc theo cụm chủ đề thay vì đi từng bài rời rạc.',
    'topic.singleTitle': '{name} | Hub chủ đề',
    'topic.cluster': 'cụm chủ đề',

    // Breadcrumbs
    'breadcrumb.home': 'Trang chủ',
    'breadcrumb.books': 'Sách',
    'breadcrumb.topics': 'Chủ đề',
    'breadcrumb.categories': 'Category',

    // Footer
    'footer.copyright': 'My Blog. Được xây dựng với Astro & Tailwind CSS.',
    'footer.pillarArticles': 'Bài trụ cột',
    'footer.topicHubs': 'Hub chủ đề',
    'footer.categoryArchives': 'Kho category',
    'footer.browseAllTopicHubs': 'Xem tất cả hub chủ đề',
    'footer.browseAllCategories': 'Xem tất cả category',

    // Language
    'lang.switch': 'Chuyển sang tiếng Anh',
    'lang.current': 'Tiếng Việt',

    // Errors
    'error.loadPosts': 'Không thể tải bài viết. Vui lòng thử lại sau.',
    'error.loadBooks': 'Không thể tải sách. Vui lòng thử lại sau.',
  }
};

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key as keyof typeof translations['en']] || key;
}

export function t(key: string, locale: Locale = defaultLocale): string {
  return getTranslation(locale, key);
}
