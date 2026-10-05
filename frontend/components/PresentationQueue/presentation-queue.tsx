"use client";

import PresentationQueueCard from "@/components/presentation-queue-card";

export default function PresentationQueue() {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-medium uppercase text-muted">
          Presentation Queue
        </h1>

        <span className="text-xs text-muted">8 items</span>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <PresentationQueueCard />
        <PresentationQueueCard />
        <PresentationQueueCard />
        <PresentationQueueCard />
        <PresentationQueueCard />
        <PresentationQueueCard />
      </div>
    </div>
  );
}
