import { getLanguageTargetUrl, persistLocale } from '../utils/languageSwitch';

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  let previousFocus: HTMLElement | null = null;

  const getFocusableElements = (): HTMLElement[] =>
    Array.from(mobileMenuSidebar?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) ?? []);

  const openMenu = () => {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    mobileMenuSidebar?.classList.remove('translate-x-full');
    mobileMenuOverlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    mobileMenuToggle?.setAttribute('aria-expanded', 'true');
    mobileMenuClose?.focus();
  };

  const closeMenu = () => {
    mobileMenuSidebar?.classList.add('translate-x-full');
    mobileMenuOverlay?.classList.add('hidden');
    document.body.style.overflow = '';
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    previousFocus?.focus?.();
  };

  mobileMenuToggle?.addEventListener('click', openMenu);
  mobileMenuClose?.addEventListener('click', closeMenu);
  mobileMenuOverlay?.addEventListener('click', closeMenu);

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenuSidebar?.querySelectorAll('a');
  mobileMenuLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key, trap focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }

    if (e.key === 'Tab' && mobileMenuSidebar && !mobileMenuSidebar.classList.contains('translate-x-full')) {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Language switching in mobile menu
  const mobileLangButtons = document.querySelectorAll('[data-mobile-lang]');

  mobileLangButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const lang = btn.getAttribute('data-mobile-lang');

      if (lang === 'en' || lang === 'vi') {
        persistLocale(lang);
        window.location.href = getLanguageTargetUrl(lang);
      }
    });
  });

  // Theme switching in mobile menu
  const mobileThemeButtons = document.querySelectorAll('[data-mobile-theme]');

  mobileThemeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const theme = btn.getAttribute('data-mobile-theme');

      if (theme) {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.remove('light', 'sepia', 'dark');
        document.documentElement.classList.add(theme);
        updateMobileControls();
      }
    });
  });

  // Highlight active selections
  function updateMobileControls() {
    const currentLang = document.documentElement.lang === 'en'
      ? 'en'
      : document.documentElement.lang === 'vi'
        ? 'vi'
        : localStorage.getItem('locale') || 'vi';
    const currentTheme = localStorage.getItem('theme') || 'sepia';

    // Highlight language
    mobileLangButtons.forEach(btn => {
      const lang = btn.getAttribute('data-mobile-lang');
      btn.classList.remove('bg-blue-600', 'text-white', 'dark:text-white');

      if (lang === currentLang) {
        btn.classList.add('bg-blue-600', 'text-white', 'dark:text-white');
      }
    });

    // Highlight theme
    mobileThemeButtons.forEach(btn => {
      const theme = btn.getAttribute('data-mobile-theme');
      btn.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-600', 'text-white', 'dark:text-white');

      if (theme === currentTheme) {
        btn.classList.add('bg-blue-600', 'text-white', 'dark:text-white');
      }
    });
  }

  updateMobileControls();
});
