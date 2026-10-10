"use client";

import { Eye, Play, ListOrdered, Plus } from "lucide-react";

import { usePresentation } from "@/store/presentation-context";
import { biblePassage } from "@/types/bible";
import { PresentationSlide } from "@/types/presentation";
import PresentationActionButton from "../ui/presentation-action-button";

type BibleVerseCardProps = {
  data: biblePassage;
};

export default function BibleVerseCard({ data }: BibleVerseCardProps) {
  const { goLive, preview, addToQueue } = usePresentation();

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
            onClick={() => preview(dataToView)}
            className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-card-light hover:shadow-xs"
          >
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-muted transition-colors duration-200 group-hover:text-primary">
                {verse.verse}
              </h1>

              <p className="transition-colors duration-200 group-hover:text-text">
                {verse.text}
              </p>
            </div>

            <div className="flex translate-x-2 scale-95 pointer-events-none items-center gap-2 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <PresentationActionButton
                onClick={() => preview(dataToView)}
                icon={<Eye size={12} />}
                label="Preview"
              />

              <PresentationActionButton
                bg="bg-primary text-background hover:bg-primary-light"
                onClick={() => goLive(dataToView)}
                icon={<Play size={12} fill="currentColor" />}
                label="Go live"
              />

              <PresentationActionButton
                onClick={() => addToQueue(dataToView)}
                icon={<Plus size={12} />}
                label="Add to queue"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
