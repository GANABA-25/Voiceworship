import Link from "next/link";

import Input from "@/components/input";
import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";

import { Pencil, PhoneCall, Mail, MoveRight } from "lucide-react";

export default function page() {
  const hasError = false;
  return (
    <div className="space-y-20 md:space-y-60 max-w-360 m-auto pt-40 px-4 lg:px-0">
      <section className="flex flex-col gap-8  lg:flex-row justify-between items-start">
        <div className="lg:flex-4 space-y-8">
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>

            <span className="uppercase">FAQ</span>
          </div>

          <h1 className="text-text text-2xl md:text-6xl font-bold">
            Talk to the VoiceWorship team.
          </h1>
          <p className="text-muted text-xl">
            Tell us how your church runs its service today and what you'd like
            to change. We read every message.
          </p>

          <div className="bg-muted w-full h-px" />
          <div className="flex flex-col items-start gap-4 text-primary">
            <Link href="/features" className="cursor-pointer">
              Feature details
            </Link>
            <Link href="pricing" className="cursor-pointer">
              Plans & pricing
            </Link>
            <Link href="/faq" className="cursor-pointer">
              Common questions
            </Link>
          </div>
        </div>

        <form className="lg:flex-6 w-full space-y-4 border border-border bg-card p-8 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              icon={<Pencil size={15} />}
              type="text"
              label="Full Name*"
              placeholder="Jane Doe"
            />
            <Input
              icon={<PhoneCall size={15} />}
              type="phone"
              label="Phone Number"
              placeholder="+233 596 498 006"
            />
          </div>
          <Input
            icon={<Mail size={15} />}
            type="email"
            label="Email"
            placeholder="you@gmail.com"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base text-muted">
              Message*
            </label>
            <textarea
              className={`w-full bg-grayDark rounded-sm border border-border bg-background
             p-2 lg:p-2 focus:outline-none focus:ring-2 focus:ring-opacity-30
             ${
               hasError
                 ? "focus:ring-red-600 border-2 border-red-600"
                 : "focus:ring-primary"
             }`}
              name=""
              id=""
              placeholder="Tell us about your church, your team, and what you'd like to do with VoiceWorship"
              rows={5}
            />
          </div>

          <Button label="Send Message" />

          <p className="text-muted text-sm text-center">
            Fields marked * are required.
          </p>
        </form>
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
