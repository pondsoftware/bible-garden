import kjvData from "../../data/kjv.json";
import webData from "../../data/web.json";

export type Translation = "kjv" | "web";

export const TRANSLATIONS: { id: Translation; name: string; fullName: string }[] = [
  { id: "kjv", name: "KJV", fullName: "King James Version" },
  { id: "web", name: "WEB", fullName: "World English Bible" },
];

export interface Verse {
  verse: string;
  text: string;
}

export interface Chapter {
  chapter: string;
  verses: Verse[];
}

export interface BookMeta {
  name: string;
  slug: string;
  testament: "OT" | "NT";
  abbreviation: string;
}

export interface BookData extends BookMeta {
  chapters: Chapter[];
  chapterCount: number;
}

export interface SearchResult {
  book: string;
  bookSlug: string;
  chapter: string;
  verse: string;
  text: string;
}

export const BOOK_META: BookMeta[] = [
  { name: "Genesis", slug: "genesis", testament: "OT", abbreviation: "Gen" },
  { name: "Exodus", slug: "exodus", testament: "OT", abbreviation: "Exod" },
  { name: "Leviticus", slug: "leviticus", testament: "OT", abbreviation: "Lev" },
  { name: "Numbers", slug: "numbers", testament: "OT", abbreviation: "Num" },
  { name: "Deuteronomy", slug: "deuteronomy", testament: "OT", abbreviation: "Deut" },
  { name: "Joshua", slug: "joshua", testament: "OT", abbreviation: "Josh" },
  { name: "Judges", slug: "judges", testament: "OT", abbreviation: "Judg" },
  { name: "Ruth", slug: "ruth", testament: "OT", abbreviation: "Ruth" },
  { name: "1 Samuel", slug: "1-samuel", testament: "OT", abbreviation: "1 Sam" },
  { name: "2 Samuel", slug: "2-samuel", testament: "OT", abbreviation: "2 Sam" },
  { name: "1 Kings", slug: "1-kings", testament: "OT", abbreviation: "1 Kgs" },
  { name: "2 Kings", slug: "2-kings", testament: "OT", abbreviation: "2 Kgs" },
  { name: "1 Chronicles", slug: "1-chronicles", testament: "OT", abbreviation: "1 Chr" },
  { name: "2 Chronicles", slug: "2-chronicles", testament: "OT", abbreviation: "2 Chr" },
  { name: "Ezra", slug: "ezra", testament: "OT", abbreviation: "Ezra" },
  { name: "Nehemiah", slug: "nehemiah", testament: "OT", abbreviation: "Neh" },
  { name: "Esther", slug: "esther", testament: "OT", abbreviation: "Esth" },
  { name: "Job", slug: "job", testament: "OT", abbreviation: "Job" },
  { name: "Psalms", slug: "psalms", testament: "OT", abbreviation: "Ps" },
  { name: "Proverbs", slug: "proverbs", testament: "OT", abbreviation: "Prov" },
  { name: "Ecclesiastes", slug: "ecclesiastes", testament: "OT", abbreviation: "Eccl" },
  { name: "Song of Solomon", slug: "song-of-solomon", testament: "OT", abbreviation: "Song" },
  { name: "Isaiah", slug: "isaiah", testament: "OT", abbreviation: "Isa" },
  { name: "Jeremiah", slug: "jeremiah", testament: "OT", abbreviation: "Jer" },
  { name: "Lamentations", slug: "lamentations", testament: "OT", abbreviation: "Lam" },
  { name: "Ezekiel", slug: "ezekiel", testament: "OT", abbreviation: "Ezek" },
  { name: "Daniel", slug: "daniel", testament: "OT", abbreviation: "Dan" },
  { name: "Hosea", slug: "hosea", testament: "OT", abbreviation: "Hos" },
  { name: "Joel", slug: "joel", testament: "OT", abbreviation: "Joel" },
  { name: "Amos", slug: "amos", testament: "OT", abbreviation: "Amos" },
  { name: "Obadiah", slug: "obadiah", testament: "OT", abbreviation: "Obad" },
  { name: "Jonah", slug: "jonah", testament: "OT", abbreviation: "Jonah" },
  { name: "Micah", slug: "micah", testament: "OT", abbreviation: "Mic" },
  { name: "Nahum", slug: "nahum", testament: "OT", abbreviation: "Nah" },
  { name: "Habakkuk", slug: "habakkuk", testament: "OT", abbreviation: "Hab" },
  { name: "Zephaniah", slug: "zephaniah", testament: "OT", abbreviation: "Zeph" },
  { name: "Haggai", slug: "haggai", testament: "OT", abbreviation: "Hag" },
  { name: "Zechariah", slug: "zechariah", testament: "OT", abbreviation: "Zech" },
  { name: "Malachi", slug: "malachi", testament: "OT", abbreviation: "Mal" },
  { name: "Matthew", slug: "matthew", testament: "NT", abbreviation: "Matt" },
  { name: "Mark", slug: "mark", testament: "NT", abbreviation: "Mark" },
  { name: "Luke", slug: "luke", testament: "NT", abbreviation: "Luke" },
  { name: "John", slug: "john", testament: "NT", abbreviation: "John" },
  { name: "Acts", slug: "acts", testament: "NT", abbreviation: "Acts" },
  { name: "Romans", slug: "romans", testament: "NT", abbreviation: "Rom" },
  { name: "1 Corinthians", slug: "1-corinthians", testament: "NT", abbreviation: "1 Cor" },
  { name: "2 Corinthians", slug: "2-corinthians", testament: "NT", abbreviation: "2 Cor" },
  { name: "Galatians", slug: "galatians", testament: "NT", abbreviation: "Gal" },
  { name: "Ephesians", slug: "ephesians", testament: "NT", abbreviation: "Eph" },
  { name: "Philippians", slug: "philippians", testament: "NT", abbreviation: "Phil" },
  { name: "Colossians", slug: "colossians", testament: "NT", abbreviation: "Col" },
  { name: "1 Thessalonians", slug: "1-thessalonians", testament: "NT", abbreviation: "1 Thess" },
  { name: "2 Thessalonians", slug: "2-thessalonians", testament: "NT", abbreviation: "2 Thess" },
  { name: "1 Timothy", slug: "1-timothy", testament: "NT", abbreviation: "1 Tim" },
  { name: "2 Timothy", slug: "2-timothy", testament: "NT", abbreviation: "2 Tim" },
  { name: "Titus", slug: "titus", testament: "NT", abbreviation: "Titus" },
  { name: "Philemon", slug: "philemon", testament: "NT", abbreviation: "Phlm" },
  { name: "Hebrews", slug: "hebrews", testament: "NT", abbreviation: "Heb" },
  { name: "James", slug: "james", testament: "NT", abbreviation: "Jas" },
  { name: "1 Peter", slug: "1-peter", testament: "NT", abbreviation: "1 Pet" },
  { name: "2 Peter", slug: "2-peter", testament: "NT", abbreviation: "2 Pet" },
  { name: "1 John", slug: "1-john", testament: "NT", abbreviation: "1 John" },
  { name: "2 John", slug: "2-john", testament: "NT", abbreviation: "2 John" },
  { name: "3 John", slug: "3-john", testament: "NT", abbreviation: "3 John" },
  { name: "Jude", slug: "jude", testament: "NT", abbreviation: "Jude" },
  { name: "Revelation", slug: "revelation", testament: "NT", abbreviation: "Rev" },
];

const translationData: Record<Translation, Record<string, Chapter[]>> = {
  kjv: kjvData as Record<string, Chapter[]>,
  web: webData as unknown as Record<string, Chapter[]>,
};

function getData(translation: Translation = "kjv"): Record<string, Chapter[]> {
  return translationData[translation];
}

const slugToName: Record<string, string> = {};
const nameToSlug: Record<string, string> = {};
BOOK_META.forEach((b) => {
  slugToName[b.slug] = b.name;
  nameToSlug[b.name] = b.slug;
});

export function getBooks(translation: Translation = "kjv"): (BookMeta & { chapterCount: number })[] {
  const data = getData(translation);
  return BOOK_META.map((meta) => ({
    ...meta,
    chapterCount: data[meta.name]?.length ?? 0,
  }));
}

export function getBook(slug: string, translation: Translation = "kjv"): BookData | null {
  const name = slugToName[slug];
  if (!name) return null;
  const data = getData(translation);
  const chapters = data[name];
  if (!chapters) return null;
  const meta = BOOK_META.find((b) => b.slug === slug)!;
  return {
    ...meta,
    chapters,
    chapterCount: chapters.length,
  };
}

export function getChapter(bookSlug: string, chapterNum: number, translation: Translation = "kjv"): { book: BookMeta; chapter: Chapter; totalChapters: number } | null {
  const name = slugToName[bookSlug];
  if (!name) return null;
  const data = getData(translation);
  const chapters = data[name];
  if (!chapters) return null;
  const chapter = chapters.find((c) => String(c.chapter) === String(chapterNum));
  if (!chapter) return null;
  const meta = BOOK_META.find((b) => b.slug === bookSlug)!;
  return { book: meta, chapter, totalChapters: chapters.length };
}

export function getVerse(bookSlug: string, chapterNum: number, verseNum: number, translation: Translation = "kjv"): string | null {
  const result = getChapter(bookSlug, chapterNum, translation);
  if (!result) return null;
  const verse = result.chapter.verses.find((v) => String(v.verse) === String(verseNum));
  return verse?.text ?? null;
}

export function searchVerses(query: string, limit = 100, translation: Translation = "kjv"): SearchResult[] {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();
  const data = getData(translation);

  for (const meta of BOOK_META) {
    const chapters = data[meta.name];
    if (!chapters) continue;
    for (const chapter of chapters) {
      for (const verse of chapter.verses) {
        if (verse.text.toLowerCase().includes(lowerQuery)) {
          results.push({
            book: meta.name,
            bookSlug: meta.slug,
            chapter: chapter.chapter,
            verse: verse.verse,
            text: verse.text,
          });
          if (results.length >= limit) return results;
        }
      }
    }
  }
  return results;
}

export function getBookSlug(bookName: string): string {
  return nameToSlug[bookName] ?? bookName.toLowerCase().replace(/\s+/g, "-");
}
