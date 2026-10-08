"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import ProgressBar from "@/components/progress-bar";
import { getPassage } from "@/services/https";
import { useBible } from "@/store/bible-context";
import { usePresentation } from "@/store/presentation-context";
import { useVoice } from "@/store/voice-recognition-context";
import type { PresentationSlide } from "@/types/presentation";
import { parseBibleReference } from "@/util/parse-bible-reference";
import VoiceWaveform from "./voice-waveform";

export default function VoiceCard() {
  const { volume, transcript, finalTranscript } = useVoice();
  const { searchedPassage } = useBible();
  const { presentSlides } = usePresentation();

  const lastProcessedTranscriptRef = useRef("");

  const { mutate } = useMutation({
    mutationFn: getPassage,

    onSuccess: (data) => {
      searchedPassage(data);

      const slides: PresentationSlide[] = data.verses.map((verse: any) => ({
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
    },

    onError: () => {
      toast.error("Failed to fetch Bible passage");
    },
  });

  useEffect(() => {
    const value = finalTranscript.trim();

    if (!value) {
      return;
    }

    if (lastProcessedTranscriptRef.current === value) {
      return;
    }

    const reference = parseBibleReference(value);

    if (!reference) {
      return;
    }

    lastProcessedTranscriptRef.current = value;

    mutate(reference);
  }, [finalTranscript, mutate]);

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

          <h1 className="font-black text-primary">
            "{finalTranscript || "Waiting for a Bible reference..."}"
          </h1>
        </div>

        <div className="space-y-2">
          <ProgressBar progress={0} />
        </div>
      </section>
    </div>
  );
}
