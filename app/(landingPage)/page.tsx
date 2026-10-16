import Image from "next/image";

import LandingPageNavbar from "./components/landing-page-navbar";
import FlowCard from "@/components/landingPage/flow-card";
import VoiceProcessCard from "@/components/landingPage/voice-process-card";
import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";

import {
  worshipFlowData,
  voiceProcessData,
  clientData,
} from "@/data/landingPage";

import {
  CirclePlay,
  MoveRight,
  Church,
  Users,
  TvMinimalPlay,
  BookOpen,
  Clapperboard,
  Mic,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="space-y-60 min-h-screen overflow-hidden text-text">
      <header className="space-y-20">
        <LandingPageNavbar />

        <section className="relative isolate min-h-[calc(100vh-56px)] overflow-hidden border-t border-border">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 dark:hidden bg-[linear-gradient(color-mix(in_srgb,var(--text)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--text)_6%,transparent)_1px,transparent_1px)] bg-size-[60px_60px] mask-[linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]" />

            <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(color-mix(in_srgb,var(--primary)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--primary)_6%,transparent)_1px,transparent_1px)] bg-size-[60px_60px] mask-[linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]" />

            <div className="absolute left-1/2 top-0 h-130 w-212.5 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
          </div>

          <div className="relative mx-auto flex w-full max-w-360 flex-col items-center gap-14 px-4 pt-40 text-center">
            <div className="flex items-center gap-2 border border-border rounded-full bg-card text-primary py-1 px-4 text-sm">
              <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
              <p className="text-xs md:text-base uppercase">
                Voice-controlled church presentation
              </p>
            </div>
            <h1 className="max-w-190 text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl">
              Your worship
              <br />
              presentation,
              <br />
              <span className="text-primary">controlled by your</span>
              <br />
              <span className="text-primary">voice.</span>
            </h1>

            <p className="max-w-165 text-muted">
              VoiceWorship helps churches project Bible verses, worship lyrics,
              media, and presentations in real time — so your team can stay
              focused on the service instead of the software.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <span>
                <Button icon2={<MoveRight size={15} />} label="Start Free" />
              </span>
              <Button2
                label="See how it works"
                icon={<CirclePlay size={15} />}
              />
            </div>

            <Image
              src="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1792072434/Screenshot_2026-10-15_14-01-08_tczx5r.png"
              alt="VoiceWorship"
              width={1920}
              height={1080}
              priority
              unoptimized
              className="block h-auto w-300 rounded-md object-cover border border-border"
            />
          </div>
        </section>

        <section className="space-y-16 border-y border-border p-8 text-center bg-card">
          <p className="text-muted">
            Built for the people behind the worship experience.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Church size={15} className="text-primary" />
              <p className="md:text-sm lg:text-base text-text">Churches</p>
            </div>
            <div className="flex items-center gap-2">
              <Users size={15} className="text-primary" />
              <p className="md:text-sm lg:text-base text-text">Worship Teams</p>
            </div>
            <div className="flex items-center gap-2">
              <TvMinimalPlay size={15} className="text-primary" />
              <p className="md:text-sm lg:text-base text-text">Media Teams</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" />
              <p className="md:text-sm lg:text-base text-text">Pastors</p>
            </div>
            <div className="flex items-center gap-2">
              <Clapperboard size={15} className="text-primary" />
              <p className="md:text-sm lg:text-base text-text">
                Church Production Teams
              </p>
            </div>
          </div>
        </section>
      </header>

      <section className="space-y-16 mx-auto max-w-360 px-4 lg:px-0">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-center space-y-8 text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
              <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
              <p className="uppercase">The problem</p>
            </div>
          </div>

          <h1 className="text-text text-2xl md:text-4xl font-bold">
            Stop breaking the flow <br className="md:hidden" /> of
            <br className="hidden md:block" />
            worship.
          </h1>

          <p className="mx-auto max-w-165 text-center text-muted">
            Presentation teams carry a lot during a live service. Small delays
            become visible moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {worshipFlowData.map((flow) => (
            <FlowCard
              key={flow.id}
              icon={flow.icon}
              title={flow.title}
              description={flow.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-16 mx-auto max-w-360 px-4 lg:px-0">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-center space-y-8 text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
              <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
              <p className="uppercase">The problem</p>
            </div>
          </div>

          <h1 className="text-text text-2xl md:text-4xl font-bold">
            Just speak. <br className="md:hidden" /> VoiceWorship{" "}
            <br className="hidden md:block" /> handles the rest.
          </h1>
        </div>

        <div className="space-y-12 border border-border bg-card rounded-md p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary">
              <Mic size={20} />
            </div>

            <div className="flex h-10 items-center justify-center gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-primary animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 24}px`,
                    animationDelay: `${i * 80}ms`,
                    animationDuration: "600ms",
                  }}
                />
              ))}
            </div>

            <h1 className="font-black text-muted">
              “Open John chapter 3 verse 16”
            </h1>

            <div className="flex items-center gap-2 border border-primary/50 bg-primary/10 text-primary py-2 px-4 rounded-md">
              <MoveRight size={15} />
              <h1>John 3:16</h1>
            </div>
          </div>

          <div className="bg-border w-full h-px" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {voiceProcessData.map((process) => (
              <VoiceProcessCard
                key={process.id}
                step={process.step}
                icon={process.icon}
                title={process.title}
                description={process.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-16 mx-auto max-w-360 px-4 lg:px-0">
        <div className="mx-auto flex max-w-360 flex-col items-center justify-center space-y-8 text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
              <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
              <p className="uppercase">Who it's for</p>
            </div>
          </div>

          <h1 className="text-text text-2xl md:text-4xl font-bold">
            Designed for the <br className="md:hidden" /> people{" "}
            <br className="hidden md:block" /> serving behind the scenes.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientData.map((client) => (
            <div
              key={client.id}
              className="group relative space-y-4 overflow-hidden rounded-md border border-border border-l-2 border-l-primary bg-card p-4 py-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/50 hover:border-l-primary hover:shadow-[0_12px_35px_-12px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:opacity-100" />

              <p className="relative text-sm font-bold uppercase text-primary transition-transform duration-300 group-hover:translate-x-1">
                {client.user}
              </p>

              <h2 className="relative text-text transition-colors duration-300 group-hover:text-primary">
                {client.description}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="relative lg:mx-auto max-w-360 space-y-16 overflow-hidden rounded-md border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_12%,var(--card))_0%,var(--card)_50%,color-mix(in_srgb,var(--primary)_6%,var(--background))_100%)] p-16 shadow-sm mx-4">
        <div className="relative flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold leading-[1.08] tracking-tight text-text">
            Bring a smarter workflow to
            <br className="hidden md:block" />
            your next service.
          </h1>

          <p className="text-muted">
            Spend less time searching through software and more time supporting
            the people on stage.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>
              <Button icon2={<MoveRight size={15} />} label="Start Free" />
            </span>
            <Button2 label="Explore VoiceWorship" />
          </div>
        </div>
      </section>
    </main>
  );
}
