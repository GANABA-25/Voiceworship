"use client";

import { useState } from "react";

import SelectInput from "@/components/select-input";

type biblePassageFilterProps = {
  translation?: string;
};

export default function BiblePassageFilters({
  translation,
}: biblePassageFilterProps) {
  const [filterPassage, setFilterPassage] = useState({
    book: "",
    chapter: "",
    verse: "",
  });
  return (
    <div className="flex items-center gap-2">
      <SelectInput
        name="BOOK"
        label="Book"
        value={filterPassage.book}
        options={[
          { value: "Genesis" },
          { value: "Exodos" },
          { value: "Psalms" },
          { value: "Proverbs" },
          { value: "Isaiah" },
        ]}
        // onChange={() => setFilterPassage(else.valuye)}
      />

      <SelectInput
        name="CHAPTER"
        label="chapter"
        value={filterPassage.chapter}
        options={[
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
        ]}
        // onChange={setTranslation}
      />

      <SelectInput
        name="VERSES"
        label="Verse"
        value={filterPassage.verse}
        options={[
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
        ]}
        // onChange={setTranslation}
      />
    </div>
  );
}
