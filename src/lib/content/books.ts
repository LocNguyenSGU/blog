import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/utils/i18n';
import { toPublicSlug } from '@/utils/slugs';

export type BookEntry = CollectionEntry<'books'>;

export async function getAllBooks(): Promise<BookEntry[]> {
  return getCollection('books');
}

export async function getBooksByLocale(locale: Locale): Promise<BookEntry[]> {
  const books = await getCollection('books', ({ data }) => data.lang === locale);
  return books.sort((a, b) => b.data.addedDate.valueOf() - a.data.addedDate.valueOf());
}

export async function getBookByLocalizedSlug(
  slug: string,
  locale: Locale
): Promise<BookEntry | undefined> {
  const books = await getAllBooks();
  const publicSlug = toPublicSlug(slug, locale);

  return books.find((book) => {
    return toPublicSlug(book.slug, locale) === publicSlug && book.data.lang === locale;
  });
}
