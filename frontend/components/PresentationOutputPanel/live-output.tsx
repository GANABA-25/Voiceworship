"use client";

import Image from "next/image";

import { usePresentation } from "@/store/presentation-context";

export default function LiveOutput() {
  const { liveSlide, isOnAir, isBlocked } = usePresentation();

  return (
    <div className="relative h-56 overflow-hidden rounded-md border border-border bg-linear-to-br from-[#171717] via-[#0d0d0d] to-black p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.12),transparent_45%)]" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {isBlocked ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Output blocked
          </p>
        ) : !isOnAir ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Output offline
          </p>
        ) : liveSlide ? (
          <div className="flex w-full max-w-xl flex-col items-center">
            <h1 className="shrink-0 font-black tracking-wider text-primary">
              {liveSlide.reference || liveSlide.title}
            </h1>

            <p className="mt-2 line-clamp-5 overflow-hidden leading-6 tracking-wide text-white">
              {liveSlide.content}
            </p>
          </div>
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
              <h1 className="text-sm font-semibold text-text">
                Nothing is live
              </h1>

              <p className="text-xs leading-6 text-muted">
                Send a preview live to display it on the screen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
