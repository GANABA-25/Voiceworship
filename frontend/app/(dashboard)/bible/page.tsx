"use client";

import Button from "@/components/ui/button";
import SearchInput from "@/components/search-Input";
import { Play } from "lucide-react";
import BibleVerseCard from "@/components/bible/bible-verse-card";
import { SquareDot, Ellipsis, Dot } from "lucide-react";
import { useBible } from "@/store/bible-context";
import EmptyState from "@/components/empty-state";

export default function page() {
  const { passage } = useBible();

  return (
    <section className="space-y-4 min-h-0 overflow-y-auto scrollbar-yellow">
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <SearchInput />
      </header>
      <main className="space-y-4 m-4">
        {!passage ? (
          <div className="flex justify-center items-center mt-50">
            <EmptyState
              image="/illustrations/bible.svg"
              alt="Bible"
              title="No Bible Passage Selected"
              description="Search for a Bible passage or use voice recognition to display a scripture on the presentation screen."
            />
          </div>
        ) : (
          <main className="space-y-4">
            <div className="flex items-end gap-4">
              <h1 className="font-black">{passage?.book}</h1>
              <div className="flex items-center text-xs text-muted">
                <p>{passage?.translation}</p>
                <Dot size={15} />
                <p>{passage?.verses.length} verses</p>
              </div>
            </div>

            <div className="space-y-4">
              {passage?.verses.map((verse) => (
                <BibleVerseCard
                  key={verse.verse}
                  verse={verse.verse}
                  text={verse.text}
                />
              ))}
            </div>
          </main>
        )}
      </main>
    </section>
  );
}
