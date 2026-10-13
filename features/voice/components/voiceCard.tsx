"use client";

import { useEffect, useRef, useTransition } from "react";
import { toast } from "react-toastify";

import type { PresentationSlide } from "@/types/presentation";
import { getBiblePassageByReference } from "@/features/bible/actions";
import { useBible } from "@/store/bible-context";
import { usePresentation } from "@/store/presentation-context";
import { useVoice } from "@/store/voice-recognition-context";
import { parseBibleReference } from "@/util/parse-bible-reference";

import ProgressBar from "@/components/progress-bar";
import VoiceWaveform from "./voice-waveform";

export default function VoiceCard() {
  const { volume, transcript, finalTranscript } = useVoice();
  const { searchedPassage } = useBible();
  const { presentSlides } = usePresentation();
  const lastProcessedTranscriptRef = useRef("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const value = finalTranscript.trim();

    if (!value || lastProcessedTranscriptRef.current === value) {
      return;
    }

    const reference = parseBibleReference(value);

    if (!reference) {
      return;
    }

    lastProcessedTranscriptRef.current = value;

    startTransition(async () => {
      try {
        const result = await getBiblePassageByReference(reference);

        if (!result.success || !result.passage) {
          toast.error(result.message || "Failed to fetch Bible passage");
          return;
        }

        const data = result.passage;

        searchedPassage(data);

        const slides: PresentationSlide[] = data.verses.map((verse) => ({
          id: `bible-${data.book}-${data.chapter}-${verse.verse}`,
          type: "bible",
          title: `${data.book} ${data.chapter}:${verse.verse}`,
          reference: `${data.book} ${data.chapter}:${verse.verse}`,
          content: verse.text,
          metadata: {
            translation: data.translation,
            translationName: data.translationName,
            book: data.book,
            chapter: data.chapter,
            verse: verse.verse,
          },
        }));

        presentSlides(slides);
      } catch {
        toast.error("Failed to fetch Bible passage");
      }
    });
  }, [finalTranscript, searchedPassage, presentSlides]);

  return (
    <div className="flex items-start gap-4">
      <section className="flex flex-6 flex-col justify-between space-y-2 rounded-md border border-border bg-background p-3 shadow-xs">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-wide text-muted">Heard</p>

          <h1 className="font-bold text-text">
            "{transcript || "Say a Bible reference..."}"
          </h1>
        </div>

        <VoiceWaveform volume={volume} />
      </section>

      <section className="flex h-30 flex-4 flex-col justify-between rounded-md border border-border bg-background p-3 shadow-xs">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-wide text-muted">
            Interpreted
          </p>

          <h1 className="truncate font-black text-primary">
            "{finalTranscript || "Waiting for a Bible reference..."}"
          </h1>
        </div>

        <div className="space-y-2">
          <ProgressBar progress={isPending ? 50 : 0} />
        </div>
      </section>
    </div>
  );
}
