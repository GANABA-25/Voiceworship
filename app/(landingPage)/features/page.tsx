import Image from "next/image";

import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";

import { MoveRight } from "lucide-react";

import FeaturesCard from "@/components/landingPage/features-card";
import { featuresData, workFlowData } from "@/data/landingPage";

export default function Features() {
  return (
    <div className="space-y-20 md:space-y-60 max-w-360 m-auto pt-40 px-4 lg:px-0">
      <section className="space-y-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
            <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
            <p className="uppercase">Features</p>
          </div>
        </div>
        <h1 className="text-text text-2xl md:text-4xl font-bold text-center">
          Everything your service needs. <br /> One workspace.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuresData.map((features) => (
            <FeaturesCard
              key={features.id}
              icon={features.icon}
              title={features.title}
              description={features.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8 relative isolate overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-130 w-212.5 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="flex flex-col gap-8 items-center justify-center text-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
            <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
            <p className="uppercase">The workspace</p>
          </div>

          <h1 className="text-text text-2xl md:text-4xl font-bold">
            One screen for the entire <br />
            service.
          </h1>

          <p className="text-muted">
            Voice input, verse preview, and live output — side by side, the way
            operators <br /> actually work.
          </p>
        </div>

        <Image
          src="https://res.cloudinary.com/dkjlpfa1q/image/upload/v1792072434/Screenshot_2026-10-15_14-01-08_tczx5r.png"
          alt="VoiceWorship"
          width={1920}
          height={1080}
          priority
          unoptimized
          className="block h-auto rounded-md object-cover border border-border"
        />
      </section>

      <section className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between items-start">
        <div className="space-y-8 md:space-y-12">
          <div className="flex items-center w-50 gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
            <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
            <p className="uppercase">Why VoiceWorship</p>
          </div>

          <h1 className="text-text text-2xl md:text-6xl font-black">
            Built around the way churches actually work.
          </h1>
          <p className="text-muted text-xl">
            Live services don't pause. VoiceWorship is shaped by that <br /> one
            constraint.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-0 md:grid-cols-2">
          {workFlowData.map((features) => (
            <FeaturesCard
              key={features.id}
              icon={features.icon}
              title={features.title}
              description={features.description}
            />
          ))}
        </div>
      </section>

      <section className="relative lg:mx-auto max-w-360 space-y-16 overflow-hidden rounded-md border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_12%,var(--card))_0%,var(--card)_50%,color-mix(in_srgb,var(--primary)_6%,var(--background))_100%)] p-8 md:p-16  shadow-sm">
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
    </div>
  );
}
