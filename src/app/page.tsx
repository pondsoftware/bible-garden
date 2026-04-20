import Link from "next/link";
import { getBooks } from "@/lib/bible-data";
import { getPopularTopics } from "@/lib/topics-data";

export default function HomePage() {
  const books = getBooks();
  const otBooks = books.filter((b) => b.testament === "OT");
  const ntBooks = books.filter((b) => b.testament === "NT");
  const popularTopics = getPopularTopics();

  const faqItems = [
    {
      question: "What is Bible Garden?",
      answer:
        "Bible Garden is a free online Bible reading tool featuring the complete King James Version (KJV) text. You can read all 66 books, search for specific verses or topics, and explore curated collections of verses organized by theme.",
    },
    {
      question: "How many books are in the Bible?",
      answer:
        "The Bible contains 66 books — 39 in the Old Testament and 27 in the New Testament. Together they contain 1,189 chapters and 31,102 verses.",
    },
    {
      question: "What Bible version does Bible Garden use?",
      answer:
        "Bible Garden uses the King James Version (KJV), first published in 1611. The KJV is in the public domain and remains one of the most widely read and quoted English translations of the Bible.",
    },
    {
      question: "Can I search for Bible verses by topic?",
      answer:
        "Yes! Bible Garden offers over 50 curated topic pages covering subjects like love, faith, prayer, forgiveness, hope, anxiety, and many more. Each topic page contains carefully selected verses with their full text.",
    },
    {
      question: "Is Bible Garden free to use?",
      answer:
        "Yes, Bible Garden is completely free. You can read, search, and explore the entire KJV Bible without any cost, registration, or subscription.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bible Garden</h1>
          <p className="text-xl text-green-100 mb-8">
            Read, Search &amp; Explore the Bible
          </p>
          <Link
            href="/search"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Search the Bible
          </Link>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Popular Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="bg-white border border-warm-gray-dark rounded-lg px-4 py-3 text-center hover:border-primary hover:shadow-sm transition-all text-sm font-medium text-text"
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Old Testament */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Old Testament</h2>
        <p className="text-text-muted mb-4">39 Books — Genesis through Malachi</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {otBooks.map((book) => (
            <Link
              key={book.slug}
              href={`/${book.slug}`}
              className="bg-white border border-warm-gray-dark rounded px-3 py-2 hover:border-primary hover:shadow-sm transition-all text-sm"
            >
              <span className="font-medium">{book.name}</span>
              <span className="text-text-muted ml-1 text-xs">({book.chapterCount})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Testament */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-primary mb-2">New Testament</h2>
        <p className="text-text-muted mb-4">27 Books — Matthew through Revelation</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {ntBooks.map((book) => (
            <Link
              key={book.slug}
              href={`/${book.slug}`}
              className="bg-white border border-warm-gray-dark rounded px-3 py-2 hover:border-primary hover:shadow-sm transition-all text-sm"
            >
              <span className="font-medium">{book.name}</span>
              <span className="text-text-muted ml-1 text-xs">({book.chapterCount})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="bg-white border border-warm-gray-dark rounded-lg"
            >
              <summary className="px-5 py-4 cursor-pointer font-medium hover:text-primary transition-colors">
                {item.question}
              </summary>
              <p className="px-5 pb-4 text-text-muted leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
