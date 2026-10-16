"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";

import { MoveRight } from "lucide-react";
import { pricingData } from "@/data/landingPage";

import PricingCard from "@/components/landingPage/pricing-card";

export default function page() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="space-y-20 md:space-y-60 max-w-360 m-auto pt-40 px-4 lg:px-0">
      <section className="space-y-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-primary">
            <div className="relative h-2 w-2 rounded-full bg-primary before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary" />
            <p className="uppercase">Pricing</p>
          </div>

          <div className="space-y-4 text-center">
            <h1 className="text-text text-2xl md:text-4xl font-bold ">
              Simple plans for every church.
            </h1>
            <p className="text-muted">
              Pricing is being finalized. Plans and features below are
              placeholders and may <br className="hidden md:block" /> change.
            </p>
          </div>
        </div>

        <div className="space-y-18">
          <div className="flex justify-center items-center gap-4">
            <h1
              className={`${!isYearly ? "text-primary font-bold" : "text-muted"}`}
            >
              Pay Monthly
            </h1>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
                isYearly ? "bg-primary-dark" : "bg-text"
              }`}
            >
              <div
                className={`w-5 h-5 bg-primary rounded-full shadow-sm transform transition ${
                  isYearly ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <div className="relative">
              <h1
                className={`flex flex-col md:flex-row md:items-center md:gap-2 ${isYearly ? "text-primary font-bold" : "test-muted"}`}
              >
                Pay Yearly
                <span className="text-xs lg:hidden">
                  Get <span className="text-success font-black">20%</span>{" "}
                  Discount
                </span>
              </h1>

              <h1 className="hidden lg:block absolute md:left-20 top-8 w-100">
                Get <span className="text-success font-black">20%</span>{" "}
                Discount
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingData.map((pricing) => (
              <PricingCard
                isYearly={isYearly}
                key={pricing.id}
                pricing={pricing}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative lg:mx-auto max-w-360 space-y-16 overflow-hidden rounded-md border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_12%,var(--card))_0%,var(--card)_50%,color-mix(in_srgb,var(--primary)_6%,var(--background))_100%)] p-8 md:p-16 shadow-sm mx-4">
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
