import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Load KJV data
const kjvData = JSON.parse(
  readFileSync(resolve(projectRoot, "data/kjv.json"), "utf8")
);

const DOMAIN = "https://biblegarden.net";

// Book metadata
const BOOK_META = [
  { name: "Genesis", slug: "genesis" }, { name: "Exodus", slug: "exodus" },
  { name: "Leviticus", slug: "leviticus" }, { name: "Numbers", slug: "numbers" },
  { name: "Deuteronomy", slug: "deuteronomy" }, { name: "Joshua", slug: "joshua" },
  { name: "Judges", slug: "judges" }, { name: "Ruth", slug: "ruth" },
  { name: "1 Samuel", slug: "1-samuel" }, { name: "2 Samuel", slug: "2-samuel" },
  { name: "1 Kings", slug: "1-kings" }, { name: "2 Kings", slug: "2-kings" },
  { name: "1 Chronicles", slug: "1-chronicles" }, { name: "2 Chronicles", slug: "2-chronicles" },
  { name: "Ezra", slug: "ezra" }, { name: "Nehemiah", slug: "nehemiah" },
  { name: "Esther", slug: "esther" }, { name: "Job", slug: "job" },
  { name: "Psalms", slug: "psalms" }, { name: "Proverbs", slug: "proverbs" },
  { name: "Ecclesiastes", slug: "ecclesiastes" }, { name: "Song of Solomon", slug: "song-of-solomon" },
  { name: "Isaiah", slug: "isaiah" }, { name: "Jeremiah", slug: "jeremiah" },
  { name: "Lamentations", slug: "lamentations" }, { name: "Ezekiel", slug: "ezekiel" },
  { name: "Daniel", slug: "daniel" }, { name: "Hosea", slug: "hosea" },
  { name: "Joel", slug: "joel" }, { name: "Amos", slug: "amos" },
  { name: "Obadiah", slug: "obadiah" }, { name: "Jonah", slug: "jonah" },
  { name: "Micah", slug: "micah" }, { name: "Nahum", slug: "nahum" },
  { name: "Habakkuk", slug: "habakkuk" }, { name: "Zephaniah", slug: "zephaniah" },
  { name: "Haggai", slug: "haggai" }, { name: "Zechariah", slug: "zechariah" },
  { name: "Malachi", slug: "malachi" }, { name: "Matthew", slug: "matthew" },
  { name: "Mark", slug: "mark" }, { name: "Luke", slug: "luke" },
  { name: "John", slug: "john" }, { name: "Acts", slug: "acts" },
  { name: "Romans", slug: "romans" }, { name: "1 Corinthians", slug: "1-corinthians" },
  { name: "2 Corinthians", slug: "2-corinthians" }, { name: "Galatians", slug: "galatians" },
  { name: "Ephesians", slug: "ephesians" }, { name: "Philippians", slug: "philippians" },
  { name: "Colossians", slug: "colossians" }, { name: "1 Thessalonians", slug: "1-thessalonians" },
  { name: "2 Thessalonians", slug: "2-thessalonians" }, { name: "1 Timothy", slug: "1-timothy" },
  { name: "2 Timothy", slug: "2-timothy" }, { name: "Titus", slug: "titus" },
  { name: "Philemon", slug: "philemon" }, { name: "Hebrews", slug: "hebrews" },
  { name: "James", slug: "james" }, { name: "1 Peter", slug: "1-peter" },
  { name: "2 Peter", slug: "2-peter" }, { name: "1 John", slug: "1-john" },
  { name: "2 John", slug: "2-john" }, { name: "3 John", slug: "3-john" },
  { name: "Jude", slug: "jude" }, { name: "Revelation", slug: "revelation" },
];

const TOPICS = [
  "faith", "prayer", "salvation", "grace", "holy-spirit", "worship",
  "repentance", "baptism", "heaven", "eternal-life", "gods-love",
  "trust-in-god", "spiritual-growth", "love", "hope", "peace", "joy",
  "patience", "courage", "strength", "comfort", "gratitude", "humility",
  "wisdom", "kindness", "forgiveness", "compassion", "marriage", "family",
  "children", "friendship", "leadership", "work", "money", "generosity",
  "justice", "healing", "suffering", "death", "grief", "anxiety", "fear",
  "anger", "capital-punishment", "gender-relations", "women-in-the-bible",
  "genocide", "slavery", "war", "divorce", "homosexuality", "alcohol",
  "wealth-and-poverty",
];

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

// Book pages
for (const book of BOOK_META) {
  urls.push({ loc: `/${book.slug}`, priority: "0.8", changefreq: "monthly" });

  // Chapter pages
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
console.log(`Sitemap generated: ${urls.length} URLs`);
