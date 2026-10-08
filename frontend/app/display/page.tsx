"use client";

import { useEffect, useState } from "react";

import {
  createDisplayChannel,
  type DisplayMessage,
} from "@/services/display-channel";
import type { PresentationSlide } from "@/types/presentation";

export default function DisplayPage() {
  const [liveSlide, setLiveSlide] = useState<PresentationSlide | null>(null);

  useEffect(() => {
    const channel = createDisplayChannel();

    if (!channel) {
      return;
    }

    channel.onmessage = (event: MessageEvent<DisplayMessage>) => {
      const message = event.data;

      if (message.type === "LIVE_SLIDE") {
        setLiveSlide(message.slide);
      }

      if (message.type === "CLEAR_LIVE") {
        setLiveSlide(null);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  if (!liveSlide) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-2xl font-semibold">VoiceWorship</p>
          <p className="mt-2 text-sm text-white/50">
            Waiting for live content...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <DisplayContent slide={liveSlide} />
    </main>
  );
}

function DisplayContent({ slide }: { slide: PresentationSlide }) {
  switch (slide.type) {
    case "bible":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-16 text-center">
          <p className="mb-8 text-3xl font-semibold tracking-wide text-white/60">
            {slide.reference}
          </p>

          <p className="max-w-6xl text-5xl font-semibold leading-tight">
            {slide.content}
          </p>

          {typeof slide.metadata?.translationName === "string" && (
            <p className="mt-10 text-xl text-white/50">
              {slide.metadata.translationName}
            </p>
          )}
        </div>
      );

    case "image":
      return (
        <div className="flex min-h-screen items-center justify-center">
          <img
            src={slide.source || slide.content}
            alt={slide.title}
            className="max-h-screen max-w-full object-contain"
          />
        </div>
      );

    case "video":
      return (
        <div className="flex min-h-screen items-center justify-center">
          <video
            src={slide.source || slide.content}
            autoPlay
            controls={false}
            className="h-screen w-screen object-contain"
          />
        </div>
      );

    case "text":
      return (
        <div className="flex min-h-screen items-center justify-center px-16 text-center">
          <p className="max-w-6xl text-5xl font-semibold leading-tight">
            {slide.content}
          </p>
        </div>
      );

    case "document":
      return (
        <div className="flex min-h-screen items-center justify-center px-16 text-center">
          <p className="text-3xl font-semibold">{slide.title}</p>
        </div>
      );

    case "audio":
      return (
        <div className="flex min-h-screen items-center justify-center">
          <audio
            src={slide.source || slide.content}
            autoPlay
            controls={false}
          />
        </div>
      );

    default:
      return null;
  }
}
