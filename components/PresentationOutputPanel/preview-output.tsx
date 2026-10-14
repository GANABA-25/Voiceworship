"use client";

import Image from "next/image";

import { usePresentation } from "@/store/presentation-context";

export default function PreviewOutput() {
  const { previewSlide } = usePresentation();

  console.log("checking in preview", previewSlide);

  return (
    <div className="relative h-56 overflow-hidden rounded-md border border-border bg-background p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.08),transparent_45%)]" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {previewSlide ? (
          <>
            {previewSlide?.type === "bible" && (
              <div className="space-y-4 flex w-full max-w-xl flex-col items-center">
                <h1 className="shrink-0 font-black tracking-wider text-primary">
                  {previewSlide.reference || previewSlide.title}
                </h1>

                <p className="line-clamp-5 overflow-hidden leading-6 tracking-wide text-text">
                  {previewSlide.content}
                </p>

                <p className="text-xs font-medium">
                  {previewSlide?.metadata?.translation}
                </p>
              </div>
            )}

            {previewSlide?.type === "song" && (
              <div className="flex w-full flex-col items-center space-y-3">
                <p className="text-xs font-medium text-muted">
                  {previewSlide.reference}
                  {previewSlide.singer ? `· ${previewSlide.singer}` : ""}
                </p>

                <h1 className="font-black tracking-wider text-primary">
                  {previewSlide.title}
                </h1>

                <p className="line-clamp-5 whitespace-pre-line text-text leading-6 tracking-wide">
                  {previewSlide.lyrics || previewSlide.content}
                </p>
              </div>
            )}

            {previewSlide?.type === "image" && <h1>Preview Image</h1>}

            {previewSlide?.type === "video" && <h1>Preview video</h1>}

            {previewSlide?.type === "audio" && <h1>Preview audio</h1>}
          </>
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
              <h1 className="font-semibold text-text">No preview selected</h1>

              <p className="text-sm leading-6 text-muted">
                Select an item to preview it before going live.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
