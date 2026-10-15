import type { LucideIcon } from "lucide-react";

type flowCardTypes = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FlowCard({
  title,
  icon: Icon,
  description,
}: flowCardTypes) {
  return (
    <div className="group relative space-y-4 overflow-hidden rounded-md border border-border bg-card p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_12px_35px_-12px_color-mix(in_srgb,var(--primary)_20%,transparent)] shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:opacity-100" />

      <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-background group-hover:scale-110">
        <Icon
          size={20}
          className="transition-transform duration-300 group-hover:rotate-6"
        />
      </div>

      <div className="relative space-y-2">
        <h2 className="font-bold text-text transition-colors duration-300 group-hover:text-primary">
          {title}
        </h2>

        <p className="text-muted text-sm transition-colors duration-300 group-hover:text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}
