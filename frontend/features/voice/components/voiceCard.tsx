"use client";

import ProgressBar from "@/components/progress-bar";
import { useVoice } from "@/store/voice-recognition-context";
import VoiceWaveform from "./voice-waveform";

export default function VoiceCard() {
  const { volume, transcript } = useVoice();

  return (
    <div className="flex items-start gap-4">
      <section className="flex flex-6 flex-col justify-between space-y-2 rounded-md border border-border shadow-xs bg-card p-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Heard</p>
          <h1 className="font-bold text-text">
            "{transcript || "Say a Bible reference..."}"
          </h1>
        </div>

        <VoiceWaveform volume={volume} />
      </section>

      <section className="flex h-30 flex-4 flex-col justify-between rounded-md border border-border shadow-xs bg-card p-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">
            Interpreted
          </p>

          <h1 className="font-black text-primary">
            "{transcript || "Genesis 1:1"}"
          </h1>
        </div>

        <div className="space-y-2">
          <ProgressBar progress={95} />
        </div>
      </section>
    </div>
  );
}
