import { Check, Sparkles } from "lucide-react";
import { pricingTypes } from "@/types/pricing";

import { formatPrice } from "@/util/format-price";

type pricingCardTypes = {
  isYearly: boolean;
  pricing: pricingTypes;
};

export default function PricingCard({ isYearly, pricing }: pricingCardTypes) {
  return (
    <div
      className={`group relative mt-4 space-y-8 overflow-visible rounded-xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 ${
        pricing.popular
          ? "border-primary bg-[linear-gradient(145deg,color-mix(in_srgb,var(--primary)_10%,var(--card)),var(--card)_55%)] shadow-[0_0_35px_-15px_var(--primary)] hover:shadow-[0_16px_45px_-12px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
          : "border-border bg-card hover:border-primary/50 hover:shadow-[0_16px_40px_-15px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
      }`}
    >
      {pricing.popular && (
        <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/50 bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-950 shadow-[0_4px_20px_-5px_var(--primary)]">
            <Sparkles size={14} className="animate-pulse" />
            Most Popular
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full blur-[80px] transition-opacity duration-500 ${
          pricing.popular
            ? "bg-primary/15 opacity-100 group-hover:bg-primary/25"
            : "bg-primary/10 opacity-0 group-hover:opacity-100"
        }`}
      />

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-text">{pricing.name}</h2>

          {pricing.popular && (
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              Best value
            </span>
          )}
        </div>

        <p className="text-sm leading-6 text-muted">{pricing.description}</p>
      </div>

      <div className="relative border-b border-border pb-8">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-black tracking-tight text-text">
            GH₵{" "}
            {isYearly
              ? formatPrice(pricing.yearlyPrice)
              : formatPrice(pricing.monthlyPrice)}
          </span>

          <span className="text-sm text-muted">
            / {isYearly ? "Year" : "Month"}
          </span>
        </div>

        <p className="mt-2 text-sm text-muted">{pricing.billing}</p>
      </div>

      <div className="relative space-y-5">
        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
          What's included
        </p>

        {pricing.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                pricing.popular
                  ? "bg-primary text-neutral-950"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </div>

            <p className="text-sm text-muted transition-colors duration-300 group-hover:text-text-secondary">
              {feature}
            </p>
          </div>
        ))}
      </div>

      <button
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4 text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
          pricing.popular
            ? "border border-primary bg-primary text-neutral-950 shadow-sm hover:bg-primary-light hover:shadow-[0_4px_20px_-5px_var(--primary)]"
            : "border border-border bg-background text-text hover:border-primary hover:bg-primary hover:text-neutral-950"
        }`}
      >
        {pricing.buttonLabel}
      </button>

      <p className="relative text-center text-xs text-muted">
        Simple tools. More meaningful services.
      </p>
    </div>
  );
}
