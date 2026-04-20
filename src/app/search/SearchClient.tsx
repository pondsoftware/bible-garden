"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface SearchResult {
  book: string;
  bookSlug: string;
  chapter: string;
  verse: string;
  text: string;
}

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [bibleData, setBibleData] = useState<Record<string, { chapter: string; verses: { verse: string; text: string }[] }[]> | null>(null);

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

  const loadBibleData = useCallback(async () => {
    if (bibleData) return bibleData;
    const response = await fetch("/data/kjv.json");
    const data = await response.json();
    setBibleData(data);
    return data;
  }, [bibleData]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const data = await loadBibleData();
      const lowerQuery = query.toLowerCase();
      const searchResults: SearchResult[] = [];

      for (const meta of BOOK_META) {
        const chapters = data[meta.name];
        if (!chapters) continue;
        for (const chapter of chapters) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(lowerQuery)) {
              searchResults.push({
                book: meta.name,
                bookSlug: meta.slug,
                chapter: chapter.chapter,
                verse: verse.verse,
                text: verse.text,
              });
              if (searchResults.length >= 100) break;
            }
          }
          if (searchResults.length >= 100) break;
        }
        if (searchResults.length >= 100) break;
      }

      setResults(searchResults);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a word or phrase..."
            className="flex-1 px-4 py-3 border border-warm-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8 text-text-muted">
          <p>Searching 31,102 verses...</p>
        </div>
      )}

      {searched && !loading && (
        <div>
          <p className="text-sm text-text-muted mb-4">
            {results.length === 0
              ? "No results found."
              : results.length >= 100
                ? "Showing first 100 results."
                : `Found ${results.length} result${results.length === 1 ? "" : "s"}.`}
          </p>

          <div className="space-y-4">
            {results.map((result, i) => (
              <div
                key={i}
                className="bg-white border border-warm-gray-dark rounded-lg p-4"
              >
                <div className="verse-text text-base mb-2">
                  {highlightText(result.text, query)}
                </div>
                <Link
                  href={`/${result.bookSlug}/${result.chapter}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {result.book} {result.chapter}:{result.verse}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {!searched && (
        <div className="text-center py-12 text-text-muted">
          <p className="text-lg mb-2">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["love", "faith", "peace", "hope", "grace", "mercy"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                }}
                className="bg-warm-gray border border-warm-gray-dark rounded-full px-4 py-1.5 text-sm hover:border-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
