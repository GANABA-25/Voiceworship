"use client";

import { getBiblePassageByReference } from "@/actions/bible/bible-actions";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import SelectInput from "./select-input";
import { parseBibleReference } from "@/util/parse-bible-reference";
import { useBible } from "@/store/bible-context";

type SearchInputProps = {
  placeHolder: string;
  translation?: string;
};

export default function SearchInput({
  placeHolder,
  translation,
}: SearchInputProps) {
  const { searchedPassage, setIsLoading } = useBible();
  const [searchWord, setSearchWord] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchWord.trim()) return;

    const reference = parseBibleReference(searchWord.trim());

    if (!reference) {
      toast.error("Invalid Bible reference.");
      return;
    }

    startTransition(async () => {
      setIsLoading(true);
      const result = await getBiblePassageByReference({
        ...reference,
        translation,
      });

      if (result.success && result.passage) {
        setIsLoading(false);
        searchedPassage(result.passage);
      } else {
        setIsLoading(false);
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden w-100 lg:block">
      <input
        className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-20 text-sm text-text placeholder:text-muted outline-none transition focus:border-primary-light focus:ring-1 focus:ring-primary-light"
        type="text"
        placeholder={placeHolder}
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        readOnly={isPending}
      />

      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        <Search size={15} />
      </div>
    </form>
  );
}
