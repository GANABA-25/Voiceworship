import PresentationActionButton from "./ui/presentation-action-button";

import { Eye, Play, Plus } from "lucide-react";

export default function AnnouncementCard() {
  return (
    <div className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:bg-card-light hover:shadow-xs">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-bold  transition-colors duration-200 group-hover:text-primary">
            Midweek Prayer
          </h1>
          <p className="text-muted text-xs">This week</p>
        </div>

        <p className="transition-colors duration-200 text-muted group-hover:text-text text-sm">
          Wednesday 7:00 PM in the Chapel
        </p>
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
  );
}
