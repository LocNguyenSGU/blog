import typography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Mọi class `gray-*` có sẵn trong code dùng tông zinc (trung tính, hơi lạnh).
        gray: colors.zinc,
        // Màu theo vai trò, đổi theo theme qua biến CSS trong src/styles/global.css
        bg: v("bg"),
        surface: v("surface"),
        "surface-2": v("surface-2"),
        ink: v("ink"),
        "ink-muted": v("ink-muted"),
        line: v("line"),
        accent: {
          DEFAULT: v("accent"),
          strong: v("accent-strong"),
          soft: v("accent-soft"),
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        // Tiêu đề dùng cùng họ chữ với thân bài (không trộn serif).
        serif: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--ink) / 0.88)",
            "--tw-prose-headings": "rgb(var(--ink))",
            "--tw-prose-lead": "rgb(var(--ink-muted))",
            "--tw-prose-links": "rgb(var(--accent))",
            "--tw-prose-bold": "rgb(var(--ink))",
            "--tw-prose-counters": "rgb(var(--ink-muted))",
            "--tw-prose-bullets": "rgb(var(--accent) / 0.7)",
            "--tw-prose-hr": "rgb(var(--line))",
            "--tw-prose-quotes": "rgb(var(--ink))",
            "--tw-prose-quote-borders": "rgb(var(--accent))",
            "--tw-prose-captions": "rgb(var(--ink-muted))",
            "--tw-prose-code": "rgb(var(--ink))",
            "--tw-prose-pre-code": "#e4e4e7",
            "--tw-prose-pre-bg": "#18181b",
            "--tw-prose-th-borders": "rgb(var(--line))",
            "--tw-prose-td-borders": "rgb(var(--line))",
            // dark: dùng chung biến, không cần bộ prose-invert riêng
            "--tw-prose-invert-body": "rgb(var(--ink) / 0.88)",
            "--tw-prose-invert-headings": "rgb(var(--ink))",
            "--tw-prose-invert-lead": "rgb(var(--ink-muted))",
            "--tw-prose-invert-links": "rgb(var(--accent))",
            "--tw-prose-invert-bold": "rgb(var(--ink))",
            "--tw-prose-invert-counters": "rgb(var(--ink-muted))",
            "--tw-prose-invert-bullets": "rgb(var(--accent) / 0.7)",
            "--tw-prose-invert-hr": "rgb(var(--line))",
            "--tw-prose-invert-quotes": "rgb(var(--ink))",
            "--tw-prose-invert-quote-borders": "rgb(var(--accent))",
            "--tw-prose-invert-captions": "rgb(var(--ink-muted))",
            "--tw-prose-invert-code": "rgb(var(--ink))",
            "--tw-prose-invert-pre-code": "#e4e4e7",
            "--tw-prose-invert-pre-bg": "#111113",
            "--tw-prose-invert-th-borders": "rgb(var(--line))",
            "--tw-prose-invert-td-borders": "rgb(var(--line))",
            lineHeight: "1.8",
            a: {
              fontWeight: "500",
              textDecorationThickness: "1px",
              textUnderlineOffset: "0.2em",
              textDecorationColor: "rgb(var(--accent) / 0.4)",
              "&:hover": { textDecorationColor: "rgb(var(--accent))" },
            },
            "h1, h2, h3, h4": { fontWeight: "600", letterSpacing: "-0.02em" },
            h2: {
              marginTop: "2.2em",
              marginBottom: "0.7em",
              lineHeight: "1.3",
            },
            h3: {
              marginTop: "1.8em",
              marginBottom: "0.5em",
              lineHeight: "1.4",
            },
            "ul > li::marker": { color: "var(--tw-prose-bullets)" },
            li: { marginTop: "0.35em", marginBottom: "0.35em" },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "500",
              borderLeftWidth: "3px",
              backgroundColor: "rgb(var(--surface-2))",
              borderRadius: "0 0.5rem 0.5rem 0",
              padding: "0.6em 1.1em",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            code: {
              fontWeight: "500",
              backgroundColor: "rgb(var(--surface-2))",
              border: "1px solid rgb(var(--line))",
              borderRadius: "0.375rem",
              padding: "0.1em 0.35em",
              fontSize: "0.86em",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            "pre code": {
              backgroundColor: "transparent",
              border: "0",
              padding: "0",
              fontWeight: "400",
            },
            pre: {
              borderRadius: "0.75rem",
              border: "1px solid rgb(var(--line))",
            },
            table: { fontSize: "0.92em" },
            "thead th": { fontWeight: "600" },
            img: { borderRadius: "0.75rem" },
            hr: { marginTop: "2.5em", marginBottom: "2.5em" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
