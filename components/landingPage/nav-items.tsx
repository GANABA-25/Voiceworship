"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center justify-center gap-6 text-muted md:flex">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`group relative py-2 transition-colors duration-300 hover:text-primary ${
                isActive ? "font-semibold text-primary" : ""
              }`}
            >
              {item.label}

              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
