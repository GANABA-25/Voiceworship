"use client";

import { useBible } from "@/store/bible-context";

import SearchInput from "@/components/search-Input";
import BibleVerseCard from "@/components/bible/bible-verse-card";
import EmptyState from "@/components/empty-state";
import BiblePassageFilters from "@/features/bible/components/bible-passage-filters";

import { Dot } from "lucide-react";

export default function page() {
  const { passage } = useBible();

  return (
    <section className="space-y-4 min-h-0 overflow-y-auto scrollbar-yellow ">
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <SearchInput placeHolder="Enter a Bible reference, e.g. Genesis 1:2-5" />
        <BiblePassageFilters />
      </header>
      <main className="space-y-4 m-4">
        {!passage ? (
          <div className="flex justify-center items-center mt-30">
            <EmptyState
              image="/illustrations/bible.svg"
              alt="Bible"
              title="No Bible Passage Selected"
              description="Search for a Bible passage or use voice recognition to display a scripture on the presentation screen."
            />
          </div>
        ) : (
          <main className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="flex items-center gap-2 font-black">
                <h1>{passage?.book}</h1>
                <p>{passage.chapter}</p>
              </div>
              <div className="flex items-center text-xs text-muted">
                <p>{passage?.translation}</p>
                <Dot size={15} />
                <p>{passage?.verses.length} verses</p>
              </div>
            </div>

            <div className="space-y-4">
              <BibleVerseCard data={passage} />
            </div>
          </main>
        )}
      </main>
    </section>
  );
}
