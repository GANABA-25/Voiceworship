import { Dot } from "lucide-react";
import PresentationActionButton from "../ui/presentation-action-button";

import { Eye, Play, ListOrdered, Plus } from "lucide-react";

export default function SongCard() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="font-black">Great Is Thy Faithfulness</h1>
        <div className="flex items-center gap-2 text-sm text-muted">
          <p>Thomas Chisholm</p>
          <Dot size={15} />
          <p>4 slides</p>
        </div>
      </div>

      <div className="flex justify-between items-start group cursor-pointer space-y-2 rounded-md border border-border bg-card p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-primary/5 hover:shadow-md">
        <div className="">
          <p className="text-sm font-black text-primary transition-colors duration-200 group-hover:text-primary-light">
            Verse 1
          </p>
          <h1 className="transition-colors duration-200">
            Great is Thy faithfulness, O God my Father There is no shadow of
            turning with Thee
          </h1>
        </div>

        <div className="flex translate-x-2 scale-95 pointer-events-none items-center gap-2 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
          <PresentationActionButton icon={<Eye size={12} />} label="Preview" />

          <PresentationActionButton
            bg="bg-primary text-background hover:bg-primary-light"
            icon={<Play size={12} fill="currentColor" />}
            label="Go live"
          />

          <PresentationActionButton
            icon={<Plus size={12} />}
            label="Add to queue"
          />
        </div>
      </div>
    </section>
  );
}
