import type { Metadata } from "next";
import Link from "next/link";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search the Bible (KJV)",
  description:
    "Search all 31,102 verses in the King James Version Bible. Find any word or phrase across all 66 books.",
  openGraph: {
    title: "Search the Bible — Bible Garden",
    description: "Search all 31,102 verses in the King James Version Bible.",
  },
};

export default function SearchPage() {
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
        name: "Search",
        item: "https://biblegarden.net/search",
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
          <span className="text-text">Search</span>
        </nav>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Search the Bible
        </h1>
        <p className="text-text-muted mb-8">
          Search all 31,102 verses in the King James Version. Enter a word or phrase below.
        </p>

        <SearchClient />
      </div>
    </>
  );
}
