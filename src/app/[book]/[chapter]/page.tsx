import type { Metadata } from "next";
import Link from "next/link";
import { getBooks, getBook, getChapter, BOOK_META } from "@/lib/bible-data";
import ChapterContent from "@/components/ChapterContent";

export function generateStaticParams() {
  const params: { book: string; chapter: string }[] = [];
  const books = getBooks();
  for (const book of books) {
    for (let i = 1; i <= book.chapterCount; i++) {
      params.push({ book: book.slug, chapter: String(i) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const chapterNum = parseInt(chapterStr, 10);
  const result = getChapter(bookSlug, chapterNum);
  if (!result) return { title: "Chapter Not Found" };

  const { book } = result;
  return {
    title: `${book.name} Chapter ${chapterNum} — KJV & WEB Bible Text`,
    description: `Read ${book.name} Chapter ${chapterNum} in the King James Version (KJV) and World English Bible (WEB). Full text with verse numbers.`,
    openGraph: {
      title: `${book.name} Chapter ${chapterNum} — Bible Garden`,
      description: `Read ${book.name} ${chapterNum} in KJV and WEB translations.`,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const chapterNum = parseInt(chapterStr, 10);
  const result = getChapter(bookSlug, chapterNum);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Chapter Not Found</h1>
        <Link href="/" className="text-primary underline mt-4 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  const { book, chapter, totalChapters } = result;

  // Get WEB verses for translation switcher
  const webResult = getChapter(bookSlug, chapterNum, "web");
  const webVerses = webResult?.chapter.verses ?? [];

  const bookIndex = BOOK_META.findIndex((b) => b.slug === bookSlug);

  // Determine prev/next chapter
  let prevLink: { href: string; label: string } | null = null;
  let nextLink: { href: string; label: string } | null = null;

  if (chapterNum > 1) {
    prevLink = {
      href: `/${book.slug}/${chapterNum - 1}`,
      label: `${book.name} ${chapterNum - 1}`,
    };
  } else if (bookIndex > 0) {
    const prevBook = BOOK_META[bookIndex - 1];
    const prevBookData = getBook(prevBook.slug);
    if (prevBookData) {
      prevLink = {
        href: `/${prevBook.slug}/${prevBookData.chapterCount}`,
        label: `${prevBook.name} ${prevBookData.chapterCount}`,
      };
    }
  }

  if (chapterNum < totalChapters) {
    nextLink = {
      href: `/${book.slug}/${chapterNum + 1}`,
      label: `${book.name} ${chapterNum + 1}`,
    };
  } else if (bookIndex < BOOK_META.length - 1) {
    const nextBook = BOOK_META[bookIndex + 1];
    nextLink = {
      href: `/${nextBook.slug}/1`,
      label: `${nextBook.name} 1`,
    };
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://biblegarden.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: book.name,
        item: `https://biblegarden.net/${book.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Chapter ${chapterNum}`,
        item: `https://biblegarden.net/${book.slug}/${chapterNum}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${book.slug}`} className="hover:text-primary">{book.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-text">Chapter {chapterNum}</span>
        </nav>

        {/* Chapter Content with Translation Switcher */}
        <ChapterContent
          kjvVerses={chapter.verses}
          webVerses={webVerses}
          bookName={book.name}
          chapterNum={chapterNum}
        />

        {/* Chapter Navigation */}
        <div className="flex justify-between items-center border-t border-warm-gray-dark pt-6">
          {prevLink ? (
            <Link
              href={prevLink.href}
              className="text-primary hover:underline text-sm"
            >
              &larr; {prevLink.label}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={`/${book.slug}`}
            className="text-text-muted hover:text-primary text-sm"
          >
            All Chapters
          </Link>
          {nextLink ? (
            <Link
              href={nextLink.href}
              className="text-primary hover:underline text-sm"
            >
              {nextLink.label} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
}
