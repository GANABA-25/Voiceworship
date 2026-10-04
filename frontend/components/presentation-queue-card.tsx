import React from "react";

export default function PresentationQueueCard() {
  return (
    <div className="flex h-40 w-50 flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm">
      <div className="flex h-25 items-center justify-center bg-black p-4">
        <p className="text-center text-xs font-medium leading-5 tracking-wide text-white">
          And the earth was without form, and void; and darkness was upon the
          face of the deep.
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 border-t border-border bg-card px-2">
        <p className="truncate text-sm font-semibold text-text">
          Sunday Worship
        </p>

        <p className="truncate text-xs text-muted">Title Slide</p>
      </div>
    </div>
  );
}
