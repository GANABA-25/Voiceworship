"use client";

import { useActionState, useEffect, useState } from "react";
import { Search, Funnel } from "lucide-react";
import { toast } from "react-toastify";

import { getBiblePassage } from "@/features/bible/actions";
import { BiblePassageState } from "@/types/bible";
import { useBible } from "@/store/bible-context";

type SearchInputProps = {
  placeHolder: string;
};

const initialState: BiblePassageState = {
  success: false,
  message: "",
};

export default function SearchInput({ placeHolder }: SearchInputProps) {
  const { searchedPassage } = useBible();
  const [searchWord, setSearchWord] = useState("");

  const [state, formAction, isPending] = useActionState(
    getBiblePassage,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success && state.passage) {
      searchedPassage(state.passage);
    } else {
      toast.error(state.message);
    }
  }, [state, searchedPassage]);

  return (
    <form action={formAction} className="relative hidden w-100 lg:block">
      <input
        className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-20 text-sm text-text placeholder:text-muted outline-none transition focus:border-primary-light focus:ring-1 focus:ring-primary-light"
        type="text"
        name="searchWord"
        placeholder={placeHolder}
        value={searchWord}
        onChange={(event) => setSearchWord(event.target.value)}
        disabled={isPending}
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
