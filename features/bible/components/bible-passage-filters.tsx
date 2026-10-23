"use client";

import { useEffect, useState } from "react";
import SelectInput from "@/components/select-input";
import { filterBible } from "@/actions/bible/filter-bible";
import type { BibleFilterOption } from "@/types/bible";
import { useBible } from "@/store/bible-context";
import { toast } from "react-toastify";

type BiblePassageFiltersProps = {
  translation?: string;
};

export default function BiblePassageFilters({
  translation,
}: BiblePassageFiltersProps) {
  const { searchedPassage, setIsLoading } = useBible();
  const [books, setBooks] = useState<BibleFilterOption[]>([]);
  const [chapters, setChapters] = useState<BibleFilterOption[]>([]);
  const [verses, setVerses] = useState<BibleFilterOption[]>([]);
  const [filterPassage, setFilterPassage] = useState({
    book: "",
    chapter: "",
    verse: "",
  });

  function applyPassageResult(result: Awaited<ReturnType<typeof filterBible>>) {
    if (!result.success || !result.passage) {
      toast.error(result.message ?? "Unable to load Bible passage.");
      return;
    }

    searchedPassage(result.passage);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      setFilterPassage({ book: "", chapter: "", verse: "" });
      setChapters([]);
      setVerses([]);
      setBooks([]);
      if (!translation) {
        return;
      }

      try {
        const result = await filterBible({ translation });

        if (cancelled) return;

        if (!result.success) {
          const errorMsg = result.message ?? "Unable to load Bible books.";
          toast.error(errorMsg);
          return;
        }

        setBooks(result.books);
      } catch {
        if (!cancelled) {
          const errorMsg = "Unable to load Bible books. Please try again.";
          toast.error(errorMsg);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadBooks();

    return () => {
      cancelled = true;
    };
  }, [translation]);

  async function handleBookChange(book: string) {
    setFilterPassage({
      book,
      chapter: "1",
      verse: "",
    });

    setChapters([]);
    setVerses([]);

    if (!translation || !book) return;

    setIsLoading(true);

    try {
      const result = await filterBible({ translation, book });

      if (!result.success) {
        toast.error(result.message ?? "Unable to load chapters.");
        return;
      }

      setChapters(result.chapters);
      setVerses(result.verses);
      applyPassageResult(result);
    } catch {
      toast.error("Unable to load Bible passage.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChapterChange(chapter: string) {
    setFilterPassage((previous) => ({
      ...previous,
      chapter,
      verse: "",
    }));

    setVerses([]);

    if (!translation || !filterPassage.book || !chapter) return;

    setIsLoading(true);

    try {
      const result = await filterBible({
        translation,
        book: filterPassage.book,
        chapter: Number(chapter),
      });

      if (!result.success) {
        toast.error(result.message ?? "Unable to load chapter.");
        return;
      }

      setVerses(result.verses);
      applyPassageResult(result);
    } catch {
      toast.error("Unable to load Bible chapter.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerseChange(verse: string) {
    setFilterPassage((previous) => ({
      ...previous,
      verse,
    }));

    if (
      !translation ||
      !filterPassage.book ||
      !filterPassage.chapter ||
      !verse
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await filterBible({
        translation,
        book: filterPassage.book,
        chapter: Number(filterPassage.chapter),
        verse: Number(verse),
      });

      applyPassageResult(result);
    } catch {
      toast.error("Unable to load Bible verse.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <SelectInput
          width="w-40"
          name="BOOK"
          label="Book"
          value={filterPassage.book}
          options={books}
          onChange={handleBookChange}
        />

        <SelectInput
          width="w-22"
          name="CHAPTER"
          label="Chapter"
          value={filterPassage.chapter}
          options={chapters}
          onChange={handleChapterChange}
        />

        <SelectInput
          width="w-22"
          name="VERSES"
          label="Verse"
          value={filterPassage.verse}
          options={verses}
          onChange={handleVerseChange}
        />
      </div>
    </div>
  );
}
