import { ReactNode } from "react";

type buttonProps = {
  label: string;
  icon?: ReactNode;
};

export default function Button2({ label, icon: Icon }: buttonProps) {
  return (
    <button className="flex items-center justify-center text-xs font-bold gap-2 p-2 px-4 hover:bg-hover cursor-pointer border border-border text-text rounded-md">
      {Icon} {label}
    </button>
  );
}
