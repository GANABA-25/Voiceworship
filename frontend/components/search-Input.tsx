"use client";

import { Search, Funnel } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchWord.trim();

    if (!search) {
      router.push("/browse");
      return;
    }

    router.push(`/browse?keyword=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden w-100 lg:block">
      <input
        className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-20 text-sm text-text placeholder:text-text outline-none transition focus:border-primary-light focus:ring-1 focus:ring-primary-light"
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
