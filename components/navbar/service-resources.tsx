import React from "react";
import { LucideIcon } from "lucide-react";

type ListItemProps = {
  label: string;
  icon: LucideIcon;
  item: string;
  number: number;
};

export default function ServiceResources({
  label,
  icon: Icon,
  item,
  number,
}: ListItemProps) {
  return (
    <div className="flex items-center justify-between text-muted p-2 px-4 text-xs hover:bg-hover cursor-pointer">
      <div className="flex items-center gap-2">
        <Icon size={12} />
        <p>{label}</p>
      </div>

      <p>
        {number} {item}
      </p>
    </div>
  );
}
