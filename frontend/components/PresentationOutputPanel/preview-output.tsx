"use client";

import Image from "next/image";

import { usePresentation } from "@/store/presentation-context";

export default function PreviewOutput() {
  const { previewSlide } = usePresentation();

  return (
    <div className="relative h-56 overflow-hidden rounded-md border border-border bg-linear-to-br from-[#171717] via-[#111111] to-[#080808] p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.08),transparent_45%)]" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {previewSlide ? (
          <div className="flex w-full max-w-xl flex-col items-center">
            <h1 className="shrink-0 font-black tracking-wider text-primary">
              {previewSlide.reference || previewSlide.title}
            </h1>

            <p className="mt-2 line-clamp-5 overflow-hidden leading-6 tracking-wide text-white">
              {previewSlide.content}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Image
              src="/illustrations/Empty.svg"
              alt="No preview selected"
              width={208}
              height={208}
              className="h-10 w-10"
            />

            <div>
              <h1 className="text-sm font-semibold text-text">
                No preview selected
              </h1>

              <p className="text-xs leading-6 text-muted">
                Select an item to preview it before going live.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
