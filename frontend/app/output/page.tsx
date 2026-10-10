"use client";

import { useEffect, useRef, useState } from "react";
import type { PresentationSlide } from "@/types/presentation";
import EmptyState from "@/components/empty-state";

type OutputState = {
  liveSlide: PresentationSlide | null;
  isOnAir: boolean;
  isBlocked: boolean;
};

export default function OutputPage() {
  const [fontSize, setFontSize] = useState(48);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<OutputState>({
    liveSlide: null,
    isOnAir: true,
    isBlocked: false,
  });

  const { liveSlide, isOnAir, isBlocked } = state;

  useEffect(() => {
    const channel = new BroadcastChannel("projection");

    channel.onmessage = (event) => {
      if (event.data?.type === "state") {
        setState(event.data.state);
      }
    };

    channel.postMessage({ type: "hello" });

    return () => channel.close();
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    const text = textRef.current;

    if (!container || !text || !liveSlide?.content) {
      return;
    }

    let animationFrame = 0;

    const fitText = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;
        const isBible = liveSlide.type === "bible";

        let size = Math.min(
          isBible ? 52 : 68,
          Math.max(
            18,
            Math.floor(window.innerHeight * (isBible ? 0.055 : 0.07)),
          ),
        );

        text.style.fontSize = `${size}px`;
        text.style.lineHeight = isBible ? "1.35" : "1.25";

        while (
          size > 16 &&
          (text.scrollHeight > availableHeight ||
            text.scrollWidth > availableWidth)
        ) {
          size -= 1;
          text.style.fontSize = `${size}px`;
        }

        setFontSize(size);
      });
    };

    fitText();

    const observer = new ResizeObserver(fitText);
    observer.observe(container);

    window.addEventListener("resize", fitText);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", fitText);
    };
  }, [liveSlide?.content, liveSlide?.type, liveSlide?.id]);

  const isImage = liveSlide?.type === "image" && liveSlide.source;
  const isVideo = liveSlide?.type === "video" && liveSlide.source;
  const isBible = liveSlide?.type === "bible";

  return (
    <main
      onDoubleClick={() => {
        if (!document.fullscreenElement) {
          void document.documentElement.requestFullscreen?.();
        }
      }}
      className="flex h-dvh w-screen items-center justify-center overflow-hidden bg-black text-white"
      style={{ cursor: "none" }}
    >
      {!isOnAir || isBlocked ? (
        <EmptyState
          image="/illustrations/blocked.svg"
          alt="Output blocked"
          title="Live output is blocked"
          description="Your audience display is temporarily hidden. Unblock the output to resume projecting your live presentation."
        />
      ) : isImage ? (
        <img
          src={liveSlide.source}
          alt={liveSlide.title || "Presentation slide"}
          className="h-full w-full object-contain"
        />
      ) : isVideo ? (
        <video
          key={liveSlide.source}
          src={liveSlide.source}
          autoPlay
          playsInline
          className="h-full w-full object-contain"
        />
      ) : liveSlide ? (
        <section
          ref={contentRef}
          className="flex h-full w-full items-center justify-center overflow-hidden px-6 py-6 sm:px-10 sm:py-8 md:px-16 md:py-10"
        >
          <div className="flex max-h-full w-full max-w-7xl flex-col items-center justify-center gap-5 overflow-hidden text-center sm:gap-7">
            {(liveSlide.reference || liveSlide.title) && (
              <h1 className="max-w-full shrink-0 wrap-break-word text-[clamp(1.25rem,3vw,3rem)] font-bold tracking-wide text-primary">
                {liveSlide.reference || liveSlide.title}
              </h1>
            )}

            {liveSlide.content && (
              <div className="flex min-h-0 w-full items-center justify-center overflow-hidden">
                <p
                  ref={textRef}
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: isBible ? 1.35 : 1.25,
                  }}
                  className="w-full whitespace-pre-line wrap-break-word font-medium"
                >
                  {liveSlide.content}
                </p>
              </div>
            )}

            {typeof liveSlide.metadata?.translation === "string" && (
              <p className="shrink-0 text-sm text-white/60 sm:text-base">
                {liveSlide.metadata.translation}
              </p>
            )}
          </div>
        </section>
      ) : (
        <div className="flex h-full w-full items-center justify-center px-8 text-center">
          <p className="text-2xl text-white/40">Waiting for presentation</p>
        </div>
      )}
    </main>
  );
}
