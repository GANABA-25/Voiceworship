"use client";

import { useVoice } from "@/store/voice-recognition-context";

import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";
import VoiceCard from "@/features/voice/components/voiceCard";
import PresentationCard from "@/components/presentation-card";
import PresentationQueueCard from "@/components/presentation-queue-card";
import MediaCard from "@/components/media-card";

import { Play, MicOff, Mic, X } from "lucide-react";
import BibleHistoryCard from "@/components/bible/bible-history-card";

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
      <section className="space-y-4 flex-8 min-h-0 overflow-y-auto scrollbar-yellow pb-60">
        <header className="flex items-center justify-between border-b border-border bg-card p-4">
          <div className="flex flex-col gap-1">
            <h1>Service Dashboard</h1>

            <p className="text-xs text-muted">
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
          <div className="space-y-4 flex-7">
            <div className="flex flex-col gap-4 border border-border bg-card rounded-md">
              <div className="flex justify-between items-center p-2 border-b border-border">
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

              <span className="px-4">
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

            <div className="border border-border bg-card rounded-md">
              <div className="flex justify-between items-center py-2 px-4 border-b border-border">
                <p className="font-black text-muted">Current Presentation</p>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-3">
                    <PresentationCard />
                  </div>
                  <div className="flex-6 space-y-4">
                    <div className="space-y-1">
                      <h1>Genesis 1:2</h1>
                      <p className="text-xs text-muted">
                        6 items queued for this service · Genesis reading,
                        worship set, announcements.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button2 label="Open Bible" />
                      <Button2 label="Edit slides" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <MediaCard />
              <MediaCard />
              <MediaCard />
            </div>
          </div>

          <div className="flex-3 space-y-4">
            <div className="border border-border rounded-md bg-card">
              <div className="border-b border-border p-2 text-muted uppercase">
                <p className="text-sm">Recent Bible References</p>
              </div>

              <div className="">
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
              </div>
            </div>

            <div className="border border-border rounded-md bg-card">
              <div className="border-b border-border p-2 text-muted uppercase">
                <p className="text-sm">Recent Presentations</p>
              </div>

              <div className="">
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
                <BibleHistoryCard />
              </div>
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-[20%] z-20 border-t border-border bg-card lg:ml-52">
          <div className="space-y-4 p-4">
            <h1 className="text-sm text-muted uppercase">
              Presentation Queue 8 items
            </h1>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <PresentationQueueCard />
              <PresentationQueueCard />
              <PresentationQueueCard />
              <PresentationQueueCard />
              <PresentationQueueCard />
              <PresentationQueueCard />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 flex-2 min-h-0 scrollbar-yellow p-4 border-l border-border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted text-xs">Live output</p>
            <p className="text-muted text-xs">1920 × 1080</p>
          </div>

          <div className="border border-border rounded-md shadow-xs space-y-2 text-center p-8 bg-card">
            <h1 className="font-black tracking-wider text-primary">
              Genesis 1:2
            </h1>

            <p className="leading-5 tracking-wide text-text">
              And the earth was without form, and void and darkness was upon the
              face of the deep.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted text-xs">Preview / Next</p>
            <p className="text-muted text-xs">clear</p>
          </div>

          <div className="border border-border rounded-md shadow-xs space-y-2 text-center p-8 bg-card">
            <h1 className="font-black tracking-wider text-primary">
              Genesis 1:2
            </h1>

            <p className="leading-5 tracking-wide text-text">
              And the earth was without form, and void and darkness was upon the
              face of the deep.
            </p>
          </div>
        </div>

        <button className="flex w-full items-center justify-center text-xs gap-2 p-4 hover:bg-primary-light cursor-pointer font-bold bg-primary text-background shadow-xs rounded-md">
          <Play size={15} fill="black" color="black" />
          Go live
        </button>
      </section>
    </div>
  );
}
