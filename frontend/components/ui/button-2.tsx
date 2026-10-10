import { ReactNode } from "react";

type buttonProps = {
  bg?: string;
  label: string;
  icon?: ReactNode;
  icon2?: ReactNode;
  onClick?: () => void;
};

export default function Button2({
  bg,
  onClick,
  label,
  icon: Icon,
  icon2: Icon2,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border ${bg ?? "bg-border"} : " bg-border hover:bg-hover text-text"} p-2 px-4 shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5  hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none`}
    >
      {Icon}
      {label}
      {Icon2}
    </button>
  );
}
