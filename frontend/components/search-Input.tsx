"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Search, Funnel } from "lucide-react";
import { toast } from "react-toastify";

import { getPassage } from "@/services/https";
import { parseBibleReference } from "@/util/parse-bible-reference";
import { useBible } from "@/store/bible-context";

type searchInputType = {
  placeHolder: string;
};

export default function SearchInput({ placeHolder }: searchInputType) {
  const { searchedPassage } = useBible();
  const [searchWord, setSearchWord] = useState("");

  const { mutate } = useMutation({
    mutationFn: getPassage,
    onSuccess: (data) => {
      searchedPassage(data);
    },
    onError: () => {
      toast.error("Failed to fetch Bible passage");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reference = parseBibleReference(searchWord);

    if (!reference) {
      toast.error("Invalid Bible reference");
      return;
    }

    mutate(reference);
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden w-100 lg:block">
      <input
        className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-20 text-sm text-text placeholder:text-muted outline-none transition focus:border-primary-light focus:ring-1 focus:ring-primary-light"
        type="text"
        placeholder={placeHolder}
        value={searchWord}
        onChange={(event) => setSearchWord(event.target.value)}
      />

      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        <Search size={15} />
      </div>

      <button
        type="button"
        className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-primary-light hover:text-text"
      >
        <Funnel size={10} />
        <span>Filter</span>
      </button>
    </form>
  );
}
