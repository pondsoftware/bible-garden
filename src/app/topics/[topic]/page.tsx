import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS, getTopic } from "@/lib/topics-data";
import { getVerse, getBookSlug } from "@/lib/bible-data";
import TopicVerses from "@/components/TopicVerses";

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopic(topicSlug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `Bible Verses About ${topic.name} — ${topic.verses.length} KJV Scriptures`,
    description: topic.description,
    openGraph: {
      title: `Bible Verses About ${topic.name} — Bible Garden`,
      description: topic.description,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopic(topicSlug);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Topic Not Found</h1>
        <Link href="/topics" className="text-primary underline mt-4 inline-block">
          View All Topics
        </Link>
      </div>
    );
  }

  // Resolve verse texts for both translations
  const versesWithText = topic.verses.map((ref) => {
    const slug = getBookSlug(ref.book);
    const kjvText = getVerse(slug, ref.chapter, ref.verse, "kjv");
    const webText = getVerse(slug, ref.chapter, ref.verse, "web");
    return {
      ...ref,
      slug,
      kjvText: kjvText || "",
      webText: webText || kjvText || "",
      reference: `${ref.book} ${ref.chapter}:${ref.verse}`,
    };
  });

  // Group consecutive verses from same chapter for display
  const groupedVerses: {
    reference: string;
    slug: string;
    chapter: number;
    kjvTexts: { verse: number; text: string }[];
    webTexts: { verse: number; text: string }[];
  }[] = [];

  for (const v of versesWithText) {
    const last = groupedVerses[groupedVerses.length - 1];
    if (
      last &&
      last.slug === v.slug &&
      last.chapter === v.chapter &&
      v.verse === last.kjvTexts[last.kjvTexts.length - 1].verse + 1
    ) {
      last.kjvTexts.push({ verse: v.verse, text: v.kjvText });
      last.webTexts.push({ verse: v.verse, text: v.webText });
      // Update reference range
      last.reference = `${v.book} ${last.chapter}:${last.kjvTexts[0].verse}-${v.verse}`;
    } else {
      groupedVerses.push({
        reference: v.reference,
        slug: v.slug,
        chapter: v.chapter,
        kjvTexts: [{ verse: v.verse, text: v.kjvText }],
        webTexts: [{ verse: v.verse, text: v.webText }],
      });
    }
  }

  // Related topics
  const relatedTopics = topic.relatedTopics
    .map((slug) => TOPICS.find((t) => t.slug === slug))
    .filter(Boolean);

  // JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faq.map((item) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Topics",
        item: "https://biblegarden.net/topics",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topic.name,
        item: `https://biblegarden.net/topics/${topic.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/topics" className="hover:text-primary">Topics</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{topic.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Bible Verses About {topic.name}
        </h1>
        <p className="text-text-muted mb-8 leading-relaxed">{topic.description}</p>

        {/* Verses with Translation Switcher */}
        <TopicVerses groups={groupedVerses} />

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Related Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map((rt) => (
                <Link
                  key={rt!.slug}
                  href={`/topics/${rt!.slug}`}
                  className="bg-warm-gray border border-warm-gray-dark rounded-full px-4 py-1.5 text-sm hover:border-primary transition-colors"
                >
                  {rt!.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {topic.faq.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {topic.faq.map((item) => (
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
        )}
      </div>
    </>
  );
}
