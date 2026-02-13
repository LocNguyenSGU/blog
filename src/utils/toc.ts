export type Heading = {
  depth: 2 | 3;
  text: string;
  slug: string;
};

/**
 * Convert text to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize Unicode (handles Vietnamese chars)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd') // Handle Vietnamese đ
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

/**
 * Extract H2 and H3 headings from markdown/MDX content
 */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const slugCounts = new Map<string, number>(); // Track duplicate slugs
  
  // Regex to match markdown headings: ## or ###
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    let slug = slugify(text);

    // Handle duplicate slugs by appending a number
    if (slugCounts.has(slug)) {
      const count = slugCounts.get(slug)! + 1;
      slugCounts.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      slugCounts.set(slug, 1);
    }

    headings.push({ depth, text, slug });
  }

  return headings;
}

/**
 * Determine if TOC should be shown based on headings and frontmatter
 */
export function shouldShowTOC(
  headings: Heading[],
  showTOC?: boolean
): boolean {
  // Priority 1: Explicit false in frontmatter
  if (showTOC === false) return false;
  
  // Priority 2: Explicit true in frontmatter (even if no headings)
  if (showTOC === true) return headings.length > 0;
  
  // Priority 3: Auto-detect - show if >= 3 headings
  return headings.length >= 3;
}
