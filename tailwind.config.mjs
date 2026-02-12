/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        sepia: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f4ead5',
          300: '#ede0c3',
          400: '#e5d5b1',
          500: '#d4c5a0',
          600: '#c3b58f',
          700: '#b2a57e',
          800: '#8b7355',
          900: '#6b5744',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        },
        sepia: {
          css: {
            '--tw-prose-body': '#6b5744',
            '--tw-prose-headings': '#6b5744',
            '--tw-prose-lead': '#8b7355',
            '--tw-prose-links': '#6b5744',
            '--tw-prose-bold': '#6b5744',
            '--tw-prose-counters': '#8b7355',
            '--tw-prose-bullets': '#8b7355',
            '--tw-prose-hr': '#c3b58f',
            '--tw-prose-quotes': '#6b5744',
            '--tw-prose-quote-borders': '#c3b58f',
            '--tw-prose-captions': '#8b7355',
            '--tw-prose-code': '#6b5744',
            '--tw-prose-pre-code': '#f9f5eb',
            '--tw-prose-pre-bg': '#8b7355',
            '--tw-prose-th-borders': '#c3b58f',
            '--tw-prose-td-borders': '#d4c5a0',
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
