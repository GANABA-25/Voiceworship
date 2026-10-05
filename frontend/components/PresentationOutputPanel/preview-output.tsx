"use client";

import { usePresentation } from "@/store/presentation-context";

export default function PreviewOutput() {
  const { previewSlide } = usePresentation();

  return (
    <div className="relative min-h-40 overflow-hidden rounded-md border border-border bg-linear-to-br from-[#171717] via-[#111111] to-[#080808] p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.08),transparent_45%)]" />

      <div className="relative flex min-h-24 flex-col items-center justify-center">
        {previewSlide ? (
          <>
            <h1 className="font-black tracking-wider text-primary">
              {previewSlide.reference || previewSlide.title}
            </h1>

            <p className="mt-2 leading-6 tracking-wide text-white">
              {previewSlide.content}
            </p>
          </>
        ) : (
          <p className="text-xs text-muted">No preview selected</p>
        )}
      </div>
    </div>
  );
}
