"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import { Play } from "lucide-react";

type PresentationActionButtonProps = {
  bg?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

export default function PresentationActionButton({
  bg,
  icon,
  label,
  onClick,
}: PresentationActionButtonProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClick?.();
            }}
            type="button"
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-primary/30 ${bg ?? "text-muted hover:bg-primary/10 hover:text-primary"}  transition-all duration-200 hover:scale-110 hover:border-primary active:scale-95`}
          >
            {icon}
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="z-50 rounded-sm bg-white px-2.5 py-1.5 text-xs font-medium text-gray-500 shadow-lg"
          >
            {label}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
