import Button from "@/components/ui/button";
import SearchInput from "@/components/search-Input";
import { Play } from "lucide-react";
import BibleVerseCard from "@/components/bible/bible-verse-card";
import { SquareDot, Ellipsis, Dot } from "lucide-react";

export default function page() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
      <section className="space-y-4 flex-8 min-h-0 overflow-y-auto scrollbar-yellow pb-60">
        <header className="flex items-center justify-between border-b border-border bg-card p-4">
          <SearchInput />
        </header>

        <main className="space-y-4 m-4">
          <div className="flex items-end gap-4">
            <h1 className="font-black">Genesis 1</h1>
            <div className="flex items-center text-xs text-muted">
              <p>KJV</p>
              <Dot size={15} />
              <p>8 verses</p>
            </div>
          </div>
          <BibleVerseCard />
        </main>
      </section>

      <section className="space-y-4 flex-2 min-h-0 scrollbar-yellow p-4 border-l border-border"></section>
    </div>
  );
}
