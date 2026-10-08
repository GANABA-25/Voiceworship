import { BookOpenText, BookOpen } from "lucide-react";

export default function BibleHistoryCard() {
  return (
    <div className="flex justify-between items-center border-b border-border bg-card p-2">
      <div className="flex items-center gap-4">
        <BookOpen size={15} color="#737373" />
        <p className="text-text font-medium">Genesis 1:1</p>
      </div>

      <p className="text-sm text-muted">10:41:22</p>
    </div>
  );
}
