import Link from "next/link";
import { LucideIcon } from "lucide-react";

type ListItemProps = {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
};

export default function ListItem({
  label,
  icon: Icon,
  href,
  isActive = false,
}: ListItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 px-4 gap-2 hover:bg-hover cursor-pointer  ${isActive ? "text-primary bg-hover" : "text-text hover:bg-hover hover:text-text"}`}
    >
      <Icon size={15} />
      <h1>{label}</h1>
    </Link>
  );
}
