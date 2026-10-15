"use client";

import Image from "next/image";
import VideoPlayer from "../media/video-player";
import { usePresentation } from "@/store/presentation-context";

export default function PreviewOutput() {
  const { previewSlide } = usePresentation();

  console.log("checking in preview", previewSlide);

  return (
    <div
      className={`relative h-56 overflow-hidden rounded-md border border-border bg-background ${previewSlide?.type === "image" || "video" ? "p-0" : "p-8"}  text-center shadow-xs`}
    >
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

            {previewSlide?.type === "image" && (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={previewSlide.media.src}
                  alt={previewSlide.media.name || previewSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            )}

            {previewSlide?.type === "video" && (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <VideoPlayer src={previewSlide.media.src} controller />
              </div>
            )}

            {previewSlide?.type === "audio" && (
              <div className="flex h-full w-full items-center justify-center rounded-md p-4">
                <audio
                  key={previewSlide.media.src}
                  src={previewSlide.media.src}
                  controls
                  preload="metadata"
                  className="w-full"
                />
              </div>
            )}
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
