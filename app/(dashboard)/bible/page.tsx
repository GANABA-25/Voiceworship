"use client";

import { useState } from "react";
import { useBible } from "@/store/bible-context";

import SearchInput from "@/components/search-Input";
import BibleVerseCard from "@/components/bible/bible-verse-card";
import EmptyState from "@/components/empty-state";
import BiblePassageFilters from "@/features/bible/components/bible-passage-filters";
import SelectInput from "@/components/select-input";
import BibleSkeleton from "@/components/skeletons/bible-skeleton";
import { Dot } from "lucide-react";

export default function page() {
  const [translation, setTranslation] = useState("KJV");
  const { passage, isLoading } = useBible();

  console.log("checking loading", isLoading);

  return (
    <section className="space-y-4 min-h-0 overflow-y-auto scrollbar-yellow ">
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <SearchInput
          translation={translation}
          placeHolder="Enter a Bible reference, e.g. Genesis 1:2-5"
        />
        <div className="flex items-center gap-2">
          <SelectInput
            name="TRANSLATION"
            label="Version"
            value={translation}
            options={[{ value: "KJV" }]}
            onChange={setTranslation}
          />
          <BiblePassageFilters translation={translation} />
        </div>
      </header>
      {/* <main className="space-y-4 m-4">
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
      </main> */}

      <main className="space-y-4 m-4">
        {!passage && isLoading ? (
          <BibleSkeleton count={10} />
        ) : !passage ? (
          <div className="flex justify-center items-center mt-30">
            <EmptyState
              image="/illustrations/bible.svg"
              alt="Bible"
              title="No Bible Passage Selected"
              description="Search for a Bible passage or use voice recognition to display a scripture on the presentation screen."
            />
          </div>
        ) : (
          <div
            aria-busy={isLoading}
            className={`space-y-4 transition-opacity ${isLoading ? "opacity-50" : ""}`}
          >
            <div className="flex items-end gap-2">
              <div className="flex items-center gap-2 font-black">
                <h1>{passage.book}</h1>
                <p>{passage.chapter}</p>
              </div>
              <div className="flex items-center text-xs text-muted">
                <p>{passage.translation}</p>
                <Dot size={15} />
                <p>{passage.verses.length} verses</p>
              </div>
            </div>
            <BibleVerseCard data={passage} />
          </div>
        )}
      </main>
    </section>
  );
}
