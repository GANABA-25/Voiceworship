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
      className="flex w-full items-center justify-center text-xs gap-2 p-2 px-4 hover:bg-primary-light cursor-pointer font-bold bg-primary text-background shadow-xs rounded-md"
    >
      {Icon} {label}
    </button>
  );
}
