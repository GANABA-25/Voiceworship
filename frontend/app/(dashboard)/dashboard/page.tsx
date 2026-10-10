"use client";

import { useVoice } from "@/store/voice-recognition-context";
import { usePresentation } from "@/store/presentation-context";

import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";
import VoiceCard from "@/features/voice/components/voiceCard";
import MediaCard from "@/components/media-card";
import EmptyState from "@/components/empty-state";
import ProgressBar from "@/components/progress-bar";
import ServiceOrderCard from "@/components/service-order-card";

import { Airplay, MicOff, Mic, X, Power, Clock } from "lucide-react";
import BibleHistoryCard from "@/components/bible/bible-history-card";

import { ServiceOrder } from "@/data/dummy";

export default function page() {
  const {
    isListening,
    startListening,
    stopListening,
    muteMicrophone,
    unmuteMicrophone,
    isMuted,
  } = useVoice();
  const { history, openOutput } = usePresentation();

  return (
    <section className="space-y-4 min-h-0 overflow-y-auto scrollbar-yellow">
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black">Service Dashboard</h1>

          <p className="text-sm text-muted">
            Sunday Worship · 10:30 AM · Main Auditorium
          </p>
        </div>

        <span>
          <Button
            onClick={openOutput}
            label="Start Projection"
            icon={<Airplay size={15} stroke="black" fill="black" />}
          />
        </span>
      </header>

      <main className="flex items-start px-4 gap-4">
        <div className="space-y-4 flex-6">
          <div className="flex flex-col gap-4 border border-border bg-card rounded-md">
            <div className="flex justify-between items-center p-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="bg-primary/20 p-1 text-primary rounded-md">
                  <Mic size={15} />
                </span>
                <p className="font-black">Voice Control</p>
              </div>
            </div>

            <span className="px-4">
              <VoiceCard />
            </span>

            <div className="flex justify-between items-center p-4 border-t border-border">
              <span className="flex items-center gap-2">
                <div>
                  {!isListening ? (
                    <Button
                      icon={<Power size={15} />}
                      onClick={startListening}
                      label="Start Listening"
                    />
                  ) : (
                    <Button onClick={stopListening} label="Stop Listening" />
                  )}
                </div>
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
              <div className="flex items-center gap-2">
                <Clock size={15} color="#f3be47" />
                <p className="font-black">Service Order</p>
                <p className="text-xs">7 segments · 1h 25m</p>
              </div>

              <p className="text-sm">10:33 Pm</p>
            </div>

            <div className="space-y-4 p-4">
              <div className="space-y-4">
                <p>Through the service</p>
                <ProgressBar progress={50} />
              </div>

              {ServiceOrder.map((order) => (
                <ServiceOrderCard key={order.id} {...order} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MediaCard />
            <MediaCard />
            <MediaCard />
          </div>
        </div>

        <div className="flex-4 space-y-4">
          <div className="border border-border rounded-md bg-card">
            <div className="border-b border-border p-2 text-muted uppercase">
              <p className="">Recent Bible References</p>
            </div>

            <div className="">
              {history.length === 0 ? (
                <EmptyState
                  image="/illustrations/bible-history.svg"
                  alt="Bible history"
                  title="Bible history"
                  description="Bible verses you project live will appear here."
                />
              ) : (
                <>
                  {history.map((item) => (
                    <BibleHistoryCard key={item.slide.id} item={item} />
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="border border-border rounded-md bg-card">
            <div className="border-b border-border p-2 text-muted uppercase">
              <p className="">Recent Presentations</p>
            </div>

            <div className="">
              <EmptyState
                image="/illustrations/history.svg"
                alt="Projection history"
                title="Projection history"
                description="Content you project live will appear here."
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
