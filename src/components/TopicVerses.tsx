"use client";

import { useState } from "react";
import Link from "next/link";
import { Translation, TRANSLATIONS } from "@/lib/bible-data";

interface VerseGroup {
  reference: string;
  slug: string;
  chapter: number;
  kjvTexts: { verse: number; text: string }[];
  webTexts: { verse: number; text: string }[];
}

interface TopicVersesProps {
  groups: VerseGroup[];
}

export default function TopicVerses({ groups }: TopicVersesProps) {
  const [translation, setTranslation] = useState<Translation>("kjv");

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

      {/* Verses */}
      <div className="space-y-6 mb-12">
        {groups.map((group, i) => {
          const texts = translation === "kjv" ? group.kjvTexts : group.webTexts;
          return (
            <div
              key={i}
              className="bg-white border border-warm-gray-dark rounded-lg p-5"
            >
              <div className="verse-text mb-3">
                {texts.map((t) => (
                  <span key={t.verse} className="inline">
                    <span className="verse-num">{t.verse}</span>
                    {t.text}{" "}
                  </span>
                ))}
              </div>
              <Link
                href={`/${group.slug}/${group.chapter}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {group.reference}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
