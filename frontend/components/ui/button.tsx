import { ReactNode } from "react";

type buttonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function Button({ label, icon: Icon, onClick }: buttonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 px-4 font-bold text-background shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none"
    >
      {Icon}
      {label}
    </button>
  );
}
