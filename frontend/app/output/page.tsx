"use client";

import { useEffect, useState } from "react";
import type { PresentationSlide } from "@/types/presentation";

type OutputState = {
  liveSlide: PresentationSlide | null;
  isOnAir: boolean;
  isBlocked: boolean;
};

export default function OutputPage() {
  const [state, setState] = useState<OutputState>({
    liveSlide: null,
    isOnAir: true,
    isBlocked: false,
  });

  useEffect(() => {
    const ch = new BroadcastChannel("projection");
    ch.onmessage = (e) => {
      if (e.data?.type === "state") setState(e.data.state);
    };
    ch.postMessage({ type: "hello" });
    return () => ch.close();
  }, []);

  const { liveSlide, isOnAir, isBlocked } = state;
  const show = isOnAir && !isBlocked && liveSlide;

  const len = liveSlide?.content?.length ?? 0;
  const fontSize =
    len > 400 ? "3vw" : len > 250 ? "3.8vw" : len > 120 ? "4.6vw" : "5.5vw";

  return (
    <main
      onClick={() => document.documentElement.requestFullscreen?.()}
      className="h-screen w-screen overflow-hidden bg-black text-white"
      style={{ cursor: "none" }}
    >
      {show &&
        (liveSlide.type === "image" && liveSlide.source ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={liveSlide.source}
            alt=""
            className="h-full w-full object-contain"
          />
        ) : liveSlide.type === "video" && liveSlide.source ? (
          <video
            src={liveSlide.source}
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-[2vw] px-[6vw] text-center">
            <p
              className="font-black tracking-wider text-[#f3be47]"
              style={{ fontSize: "3.5vw" }}
            >
              {liveSlide.reference || liveSlide.title}
            </p>
            <p
              className="whitespace-pre-line leading-[1.35]"
              style={{ fontSize }}
            >
              {liveSlide.content}
            </p>
            {liveSlide.metadata?.translation && (
              <p className="opacity-70" style={{ fontSize: "2vw" }}>
                {liveSlide.metadata.translation}
              </p>
            )}
          </div>
        ))}
    </main>
  );
}
