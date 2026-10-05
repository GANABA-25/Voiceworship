"use client";

import { Eye, Play, ListOrdered, Plus } from "lucide-react";

import { usePresentation } from "@/store/presentation-context";
import { biblePassage } from "@/types/bible";
import { PresentationSlide } from "@/types/presentation";

type BibleVerseCardProps = {
  data: biblePassage;
};

export default function BibleVerseCard({ data }: BibleVerseCardProps) {
  const { goLive, preview } = usePresentation();

  return (
    <div className="space-y-4">
      {data.verses.map((verse) => {
        const dataToView: PresentationSlide = {
          id: `bible-${data.book}-${data.chapter}-${verse.verse}`,
          type: "bible",
          title: `${data.book} ${data.chapter}:${verse.verse}`,
          reference: `${data.book} ${data.chapter}:${verse.verse}`,
          content: verse.text,
          metadata: {
            translation: data.translation,
            translationName: data.translationName,
            book: data.book,
            chapter: data.chapter,
            verse: verse.verse,
          },
        };

        return (
          <div
            key={verse.verse}
            className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-card-light hover:shadow-xs"
          >
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-muted transition-colors duration-200 group-hover:text-primary">
                {verse.verse}
              </h1>

              <p className="text-sm transition-colors duration-200 group-hover:text-text">
                {verse.text}
              </p>
            </div>

            <div className="flex translate-x-2 scale-95 pointer-events-none items-center gap-2 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <button
                onClick={() => preview(dataToView)}
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <Eye size={12} />
              </button>

              <button
                onClick={() => goLive(dataToView)}
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-primary text-background transition-all duration-200 hover:scale-110 hover:bg-primary-light hover:shadow-sm active:scale-95"
              >
                <Play size={12} fill="currentColor" />
              </button>

              <button
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <ListOrdered size={12} />
              </button>

              <button
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
