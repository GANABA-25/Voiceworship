"use client";

import { Play } from "lucide-react";

export default function PresentationOutputPanel() {
  return (
    <section className="flex-2 min-h-0 space-y-4 overflow-y-auto scrollbar-yellow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted">Live output</p>
          <p className="text-xs text-muted">1920 × 1080</p>
        </div>

        <div className="space-y-2 rounded-md border border-border bg-card p-8 text-center shadow-xs">
          <h1 className="font-black tracking-wider text-primary">
            Genesis 1:2
          </h1>

          <p className="leading-5 tracking-wide text-text">
            And the earth was without form, and void and darkness was upon the
            face of the deep.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted">Preview / Next</p>

          <button
            type="button"
            className="text-xs text-muted transition-colors hover:text-primary"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2 rounded-md border border-border bg-card p-8 text-center shadow-xs">
          <h1 className="font-black tracking-wider text-primary">
            Genesis 1:2
          </h1>

          <p className="leading-5 tracking-wide text-text">
            And the earth was without form, and void and darkness was upon the
            face of the deep.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary p-4 text-xs font-bold text-background shadow-xs transition-all duration-200 hover:bg-primary-light hover:shadow-sm active:scale-[0.98]"
      >
        <Play size={15} fill="currentColor" />
        Go live
      </button>
    </section>
  );
}
