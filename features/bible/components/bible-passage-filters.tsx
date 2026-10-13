"use client";
import { useState } from "react";

import SelectInput from "@/components/select-input";

export default function BiblePassageFilters() {
  const [translation, setTranslation] = useState("kjv");
  return (
    <div className="flex items-center gap-4">
      <SelectInput
        name="TRANSLATION"
        label="Version"
        value={translation}
        options={[
          { value: "KJV" },
          { value: "NIV" },
          { value: "ESV" },
          { value: "NKJ" },
          { value: "NLT" },
        ]}
        onChange={setTranslation}
      />

      <SelectInput
        name="BOOK"
        label="Book"
        value={translation}
        options={[
          { value: "Genesis" },
          { value: "Exodos" },
          { value: "Psalms" },
          { value: "Proverbs" },
          { value: "Isaiah" },
        ]}
        onChange={setTranslation}
      />

      <SelectInput
        name="CHAPTER"
        label="chapter"
        value={translation}
        options={[
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
        ]}
        onChange={setTranslation}
      />

      <SelectInput
        name="VERSES"
        label="Verse"
        value={translation}
        options={[
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
        ]}
        onChange={setTranslation}
      />
    </div>
  );
}
