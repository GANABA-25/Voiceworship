"use client";

import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";
import { Play, MicOff, Mic, X } from "lucide-react";
import VoiceCard from "@/features/voice/components/voiceCard";
import { useVoice } from "@/store/voice-recognition-context";

export default function page() {
  const {
    isListening,
    startListening,
    stopListening,
    muteMicrophone,
    unmuteMicrophone,
    setMicrophoneStatus,
    isMuted,
  } = useVoice();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
      <section className="space-y-4 flex-8 min-h-0 scrollbar-yellow">
        <header className="flex items-center justify-between border-b border-border p-4">
          <div className="flex flex-col gap-1">
            <h1>Service Dashboard</h1>

            <p className="text-sm text-muted">
              Sunday Worship · 10:30 AM · Main Auditorium
            </p>
          </div>

          <span>
            <Button
              label="Start Service"
              icon={<Play size={15} stroke="black" fill="black" />}
            />
          </span>
        </header>

        <main className="flex items-start px-4 gap-4">
          <div className="flex-7 flex flex-col gap-4 border border-border rounded-md">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 p-1 text-primary rounded-md">
                  <Mic size={15} />
                </span>
                <p className="font-black">Voice Control</p>
              </div>

              <div>
                {!isListening ? (
                  <Button onClick={startListening} label="Start Listening" />
                ) : (
                  <Button onClick={stopListening} label="Stop Listening" />
                )}
              </div>
            </div>

            <span className="p-4">
              <VoiceCard />
            </span>

            <div className="flex justify-between items-center p-4 border-t border-border">
              <span className="flex items-center gap-2">
                <Button label="Project" />
                <Button2 label="Preview" />
                <Button2 label="Dismiss" icon={<X size={15} />} />
              </span>

              <span className="flex items-center gap-2">
                {isMuted ? (
                  <Button2
                    icon={<MicOff size={15} />}
                    onClick={unmuteMicrophone}
                    label="Muted"
                  />
                ) : (
                  <Button2
                    icon={<Mic size={15} />}
                    onClick={muteMicrophone}
                    label="Mute mic"
                  />
                )}

                <Button2 label="Simulate command" icon={<X size={15} />} />
              </span>
            </div>
          </div>

          <div className="flex-3 p-4 border border-border rounded-md">
            <p>side 2</p>
          </div>
        </main>
      </section>

      <section className="flex-2 min-h-0 scrollbar-yellow p-4 border-l border-border">
        <p>Live output</p>
      </section>
    </div>
  );
}
