import { BookOpenText, BookOpen } from "lucide-react";

export default function BibleHistoryCard() {
  return (
    <div className="flex justify-between items-center border-b border-border bg-card p-2">
      <div className="flex items-center gap-2">
        <BookOpen size={10} color="#737373" />
        <p className="text-text text-sm">Genesis 1:1</p>
      </div>

      <p className="text-xs text-muted">10:41:22</p>
    </div>
  );
}
