"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getPassage } from "@/services/https";
import { parseBibleReference } from "@/util/parse-bible-reference";
import { Search, Funnel } from "lucide-react";
import { toast } from "react-toastify";
import { useBible } from "@/store/bible-context";

export default function SearchInput() {
  const { searchedPassage } = useBible();
  const [searchWord, setSearchWord] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: getPassage,
    onSuccess: (data) => {
      searchedPassage(data);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reference = parseBibleReference(searchWord);

    if (!reference) {
      console.log("Invalid Bible reference");
      toast.error("Invalid Bible reference");
      return;
    }

    mutate(reference);
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden w-100 lg:block">
      <input
        className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-20 text-sm text-text placeholder:text-text outline-none transition focus:border-primary-light focus:ring-1 focus:ring-primary-light"
        type="text"
        placeholder="Search library..."
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
