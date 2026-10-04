import { ReactNode } from "react";

type buttonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function Button2({ onClick, label, icon: Icon }: buttonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-xs gap-2 p-2 px-4 hover:bg-hover cursor-pointer border border-border shadow-xs text-text rounded-md"
    >
      {Icon} {label}
    </button>
  );
}
