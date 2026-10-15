import type { LucideIcon } from "lucide-react";

type VoiceProcessCardTypes = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

export default function VoiceProcessCard({
  icon: Icon,
  step,
  title,
  description,
}: VoiceProcessCardTypes) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <h1 className="text-primary">{step}</h1>
        <div className="bg-border w-full h-px" />
        <Icon
          size={20}
          className="transition-transform duration-300 group-hover:rotate-6"
        />
      </div>

      <div className="space-y-2">
        <h1 className="font-black">{title}</h1>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}
