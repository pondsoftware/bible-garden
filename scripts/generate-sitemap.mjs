import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Load KJV data (source of truth for book/chapter structure)
const kjvData = JSON.parse(
  readFileSync(resolve(projectRoot, "data/kjv.json"), "utf8")
);

// Read BOOK_META from bible-data.ts to get slugs (matches generateStaticParams)
const bibleDataSource = readFileSync(
  resolve(projectRoot, "src/lib/bible-data.ts"),
  "utf8"
);

const bookMetaMatches = [
  ...bibleDataSource.matchAll(/\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g),
];
const BOOK_META = bookMetaMatches.map((m) => ({ name: m[1], slug: m[2] }));

if (BOOK_META.length === 0) {
  throw new Error("Failed to extract BOOK_META from src/lib/bible-data.ts");
}

// Read topic slugs from topics-data.ts (matches generateStaticParams)
const topicsSource = readFileSync(
  resolve(projectRoot, "src/lib/topics-data.ts"),
  "utf8"
);

// Extract topic slugs - they appear as `slug: "topic-slug"` inside TOPICS array
const topicsArrayMatch = topicsSource.match(
  /export const TOPICS[\s\S]*?:\s*Topic\[\]\s*=\s*\[([\s\S]*)\];/
);
const topicsContent = topicsArrayMatch ? topicsArrayMatch[1] : topicsSource;
const topicSlugMatches = [...topicsContent.matchAll(/slug:\s*"([^"]+)"/g)];
const TOPICS = topicSlugMatches.map((m) => m[1]);

if (TOPICS.length === 0) {
  throw new Error("Failed to extract TOPICS from src/lib/topics-data.ts");
}

const DOMAIN = "https://biblegarden.net";

const urls = [];

// Homepage
urls.push({ loc: "/", priority: "1.0", changefreq: "weekly" });

// Search
urls.push({ loc: "/search", priority: "0.7", changefreq: "monthly" });

// Topics index
urls.push({ loc: "/topics", priority: "0.8", changefreq: "weekly" });

// Topic pages
for (const topic of TOPICS) {
  urls.push({ loc: `/topics/${topic}`, priority: "0.7", changefreq: "monthly" });
}

// Book pages and chapter pages
for (const book of BOOK_META) {
  urls.push({ loc: `/${book.slug}`, priority: "0.8", changefreq: "monthly" });

  // Chapter pages — read from actual KJV data
  const chapters = kjvData[book.name];
  if (chapters) {
    for (const chapter of chapters) {
      urls.push({
        loc: `/${book.slug}/${chapter.chapter}`,
        priority: "0.6",
        changefreq: "monthly",
      });
    }
  }
}

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync(resolve(projectRoot, "public/sitemap.xml"), xml);
console.log(`Sitemap generated: ${urls.length} URLs (${BOOK_META.length} books, ${TOPICS.length} topics, ${urls.length - BOOK_META.length - TOPICS.length - 3} chapters)`);
