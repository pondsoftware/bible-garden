import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS, TOPIC_CATEGORIES } from "@/lib/topics-data";

export const metadata: Metadata = {
  title: "Bible Topics — Verses by Subject",
  description:
    "Explore over 50 Bible topics with curated KJV verses. Find scriptures about love, faith, prayer, hope, forgiveness, anxiety, and more.",
  openGraph: {
    title: "Bible Topics — Bible Garden",
    description:
      "Explore over 50 Bible topics with curated verses from the King James Version.",
  },
};

export default function TopicsIndexPage() {
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
        name: "Topics",
        item: "https://biblegarden.net/topics",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text">Topics</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Bible Topics
        </h1>
        <p className="text-text-muted mb-10">
          Explore the Bible by topic. Each page contains curated verses from the King James Version.
        </p>

        {TOPIC_CATEGORIES.map((category) => {
          const topics = TOPICS.filter((t) => t.category === category);
          return (
            <section key={category} className="mb-10">
              <h2 className="text-xl font-bold text-primary-light mb-4 border-b border-warm-gray-dark pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="bg-white border border-warm-gray-dark rounded-lg px-4 py-3 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <span className="font-medium text-sm">{topic.name}</span>
                    <span className="block text-xs text-text-muted mt-0.5">
                      {topic.verses.length} verses
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
