"use client";

import Image from "next/image";
import VideoPlayer from "../media/video-player";
import { usePresentation } from "@/store/presentation-context";

export default function LiveOutput() {
  const { liveSlide, isOnAir, isBlocked } = usePresentation();

  return (
    <div
      className={`relative h-56 overflow-hidden rounded-md border border-border to-background ${liveSlide?.type === "image" || "video" ? "p-0" : "p-8"} text-center shadow-xs`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.12),transparent_45%)]" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {isBlocked ? (
          <p className="text-sm font-medium uppercase tracking-wider text-muted">
            Output blocked
          </p>
        ) : !isOnAir ? (
          <p className="text-sm font-medium uppercase tracking-wider text-muted">
            Output offline
          </p>
        ) : liveSlide ? (
          <>
            {liveSlide.type === "bible" && (
              <div className="space-y-4 flex w-full max-w-xl flex-col items-center">
                <h1 className="shrink-0 font-black tracking-wider text-primary">
                  {liveSlide.reference || liveSlide.title}
                </h1>

                <p className="line-clamp-5 overflow-hidden leading-6 tracking-wide text-text">
                  {liveSlide.content}
                </p>

                <p className="text-xs font-medium">
                  {liveSlide?.metadata?.translation}
                </p>
              </div>
            )}

            {liveSlide.type === "song" && (
              <div className="flex w-full flex-col items-center space-y-3">
                <p className="text-xs font-medium text-muted">
                  {liveSlide.reference}
                  {liveSlide.singer ? `· ${liveSlide.singer}` : ""}
                </p>

                <h1 className="font-black tracking-wider text-primary">
                  {liveSlide.title}
                </h1>

                <p className="line-clamp-5 whitespace-pre-line text-text leading-6 tracking-wide">
                  {liveSlide.lyrics || liveSlide.content}
                </p>
              </div>
            )}

            {liveSlide?.type === "image" && (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={liveSlide.media.src}
                  alt={liveSlide.media.name || liveSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            )}

            {liveSlide?.type === "video" && (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <VideoPlayer src={liveSlide.media.src} />
              </div>
            )}

            {liveSlide?.type === "audio" && (
              <div className="flex h-full w-full items-center justify-center rounded-md p-4">
                <audio
                  key={liveSlide.media.src}
                  src={liveSlide.media.src}
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
              alt="Nothing is live"
              width={208}
              height={208}
              className="h-10 w-10"
            />

            <div>
              <h1 className="font-semibold text-text">Nothing is live</h1>

              <p className="text-sm leading-6 text-muted">
                Send a preview live to display it on the screen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
