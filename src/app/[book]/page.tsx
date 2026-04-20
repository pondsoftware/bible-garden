import type { Metadata } from "next";
import Link from "next/link";
import { getBooks, getBook, BOOK_META } from "@/lib/bible-data";
import { BOOK_DESCRIPTIONS } from "@/lib/book-descriptions";

export function generateStaticParams() {
  return getBooks().map((book) => ({ book: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: bookSlug } = await params;
  const book = getBook(bookSlug);
  if (!book) return { title: "Book Not Found" };

  return {
    title: `${book.name} (KJV) — Read All ${book.chapterCount} Chapters`,
    description: `Read the Book of ${book.name} from the King James Version Bible. ${book.chapterCount} chapters. ${BOOK_DESCRIPTIONS[book.name] || ""}`,
    openGraph: {
      title: `${book.name} (KJV) — Bible Garden`,
      description: `Read ${book.name} online — ${book.chapterCount} chapters in the King James Version.`,
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: bookSlug } = await params;
  const book = getBook(bookSlug);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Book Not Found</h1>
        <Link href="/" className="text-primary underline mt-4 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  const bookIndex = BOOK_META.findIndex((b) => b.slug === bookSlug);
  const prevBook = bookIndex > 0 ? BOOK_META[bookIndex - 1] : null;
  const nextBook = bookIndex < BOOK_META.length - 1 ? BOOK_META[bookIndex + 1] : null;

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{book.name}</span>
        </nav>

        {/* Book Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {book.name}
          </h1>
          <div className="flex items-center gap-3 text-text-muted">
            <span className="bg-warm-gray px-2 py-0.5 rounded text-sm font-medium">
              {book.testament === "OT" ? "Old Testament" : "New Testament"}
            </span>
            <span>{book.chapterCount} Chapters</span>
          </div>
          {BOOK_DESCRIPTIONS[book.name] && (
            <p className="mt-4 text-text-muted leading-relaxed">
              {BOOK_DESCRIPTIONS[book.name]}
            </p>
          )}
        </div>

        {/* Chapter Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Chapters</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {Array.from({ length: book.chapterCount }, (_, i) => i + 1).map(
              (ch) => (
                <Link
                  key={ch}
                  href={`/${book.slug}/${ch}`}
                  className="bg-white border border-warm-gray-dark rounded px-2 py-2 text-center text-sm font-medium hover:border-primary hover:text-primary transition-all"
                >
                  {ch}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Prev/Next Navigation */}
        <div className="flex justify-between items-center border-t border-warm-gray-dark pt-6">
          {prevBook ? (
            <Link
              href={`/${prevBook.slug}`}
              className="text-primary hover:underline"
            >
              &larr; {prevBook.name}
            </Link>
          ) : (
            <span />
          )}
          {nextBook ? (
            <Link
              href={`/${nextBook.slug}`}
              className="text-primary hover:underline"
            >
              {nextBook.name} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
}
