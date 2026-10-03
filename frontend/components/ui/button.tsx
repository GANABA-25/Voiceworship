import { ReactNode } from "react";

type buttonProps = {
  label: string;
  icon?: ReactNode;
};

export default function Button({ label, icon: Icon }: buttonProps) {
  return (
    <button className="flex w-full items-center justify-center text-xs gap-2 p-2 px-4 hover:bg-hover cursor-pointer font-bold bg-primary text-background rounded-md">
      {Icon} {label}
    </button>
  );
}
