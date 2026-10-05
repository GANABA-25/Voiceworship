import { Eye, Play, ListOrdered, Plus } from "lucide-react";

type bibleVerseCardTypes = {
  verse: number;
  text: string;
};

export default function BibleVerseCard({ verse, text }: bibleVerseCardTypes) {
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-card-light hover:shadow-xs">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-muted transition-colors duration-200 group-hover:text-primary">
          {verse}
        </h1>

        <p className="text-sm transition-colors duration-200 group-hover:text-text">
          {text}
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-0 translate-x-2 scale-95 pointer-events-none transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
        >
          <Eye
            size={12}
            className="transition-transform duration-200 group-hover:scale-100"
          />
        </button>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-background transition-all duration-200 hover:scale-110 hover:bg-primary-light hover:shadow-sm active:scale-95 cursor-pointer"
        >
          <Play size={12} fill="currentColor" />
        </button>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
        >
          <ListOrdered size={12} />
        </button>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/30 text-muted transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
