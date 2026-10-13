import { BookOpen } from "lucide-react";

import type { BibleHistoryItem } from "@/types/presentation";

type BibleHistoryCardProps = {
  item: BibleHistoryItem;
};

export default function BibleHistoryCard({ item }: BibleHistoryCardProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card p-2">
      <div className="flex items-center gap-4">
        <BookOpen size={15} className="text-muted" />

        <p className="font-medium text-text">{item.slide.reference}</p>
      </div>

      <p className="text-sm text-muted">{item.timestamp}</p>
    </div>
  );
}
