"use client";

import { useState } from "react";
import { Translation, TRANSLATIONS, type Verse } from "@/lib/bible-data";

interface ChapterContentProps {
  kjvVerses: Verse[];
  webVerses: Verse[];
  bookName: string;
  chapterNum: number;
}

export default function ChapterContent({ kjvVerses, webVerses, bookName, chapterNum }: ChapterContentProps) {
  const [translation, setTranslation] = useState<Translation>("kjv");
  const verses = translation === "kjv" ? kjvVerses : (webVerses.length > 0 ? webVerses : kjvVerses);
  const usingFallback = translation === "web" && webVerses.length === 0;

  return (
    <div>
      {/* Translation Switcher */}
      <div className="flex items-center gap-2 mb-6">
        {TRANSLATIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTranslation(t.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              translation === t.id
                ? "bg-primary text-white"
                : "bg-warm-gray border border-warm-gray-dark text-text-muted hover:border-primary"
            }`}
            title={t.fullName}
          >
            {t.name}
          </button>
        ))}
        <span className="text-xs text-text-muted ml-2">
          {TRANSLATIONS.find((t) => t.id === translation)?.fullName}
        </span>
      </div>

      {/* Chapter Header */}
      <h1 className="text-3xl font-bold text-primary mb-8">
        {bookName} {chapterNum}
      </h1>
      {usingFallback && (
        <p className="text-sm text-text-muted italic mb-4">WEB translation not available for this chapter. Showing KJV.</p>
      )}

      {/* Verse Text */}
      <div className="verse-text leading-relaxed mb-10">
        {verses.map((v) => (
          <span key={v.verse} className="inline">
            <span className="verse-num">{v.verse}</span>
            {v.text}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
