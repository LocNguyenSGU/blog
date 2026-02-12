export type Locale = 'en' | 'vi';

export const defaultLocale: Locale = 'vi';

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    
    // Homepage
    'home.title': 'Welcome to My Blog',
    'home.subtitle': 'Sharing knowledge about programming, technology and life',
    'home.readBlog': 'Read Blog',
    'home.aboutMe': 'About Me',
    'home.featured': 'Featured Post',
    'home.recent': 'Recent Posts',
    'home.viewAll': 'View all →',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Thoughts, tutorials, and stories',
    'blog.allPosts': 'All Posts',
    
    // Post
    'post.readTime': 'min read',
    'post.views': 'views',
    'post.comments': 'Comments',
    
    // Categories
    'category.programming': 'Programming',
    'category.lifestyle': 'Lifestyle',
    'category.personal': 'Personal',
    
    // Footer
    'footer.copyright': 'My Blog. Built with Astro & Tailwind CSS.',
    
    // Language
    'lang.switch': 'Switch to Vietnamese',
    'lang.current': 'English'
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.blog': 'Blog',
    'nav.about': 'Giới thiệu',
    
    // Homepage
    'home.title': 'Chào mừng đến với Blog của tôi',
    'home.subtitle': 'Chia sẻ kiến thức về lập trình, công nghệ và cuộc sống',
    'home.readBlog': 'Đọc Blog',
    'home.aboutMe': 'Về Tôi',
    'home.featured': 'Bài viết nổi bật',
    'home.recent': 'Bài viết gần đây',
    'home.viewAll': 'Xem tất cả →',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Suy nghĩ, hướng dẫn và câu chuyện',
    'blog.allPosts': 'Tất cả bài viết',
    
    // Post
    'post.readTime': 'phút đọc',
    'post.views': 'lượt xem',
    'post.comments': 'Bình luận',
    
    // Categories
    'category.programming': 'Lập trình',
    'category.lifestyle': 'Đời sống',
    'category.personal': 'Cá nhân',
    
    // Footer
    'footer.copyright': 'My Blog. Được xây dựng với Astro & Tailwind CSS.',
    
    // Language
    'lang.switch': 'Chuyển sang tiếng Anh',
    'lang.current': 'Tiếng Việt'
  }
};

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key as keyof typeof translations['en']] || key;
}

export function t(key: string, locale: Locale = defaultLocale): string {
  return getTranslation(locale, key);
}
