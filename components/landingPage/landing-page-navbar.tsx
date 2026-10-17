import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import NavItems from "./nav-items";
import Button from "@/components/ui/button";
import Link from "next/link";

import { Menu } from "lucide-react";

export default function LandingPageNavbar() {
  return (
    <div className="fixed w-full z-10 border-y border-border rounded-md bg-background/90 shadow-sm">
      <div className="max-w-360 m-auto flex justify-between items-center gap-4 p-4 lg:px-0">
        <Logo />
        <NavItems />

        <div className="border border-border p-2 rounded-md md:hidden">
          <Menu size={20} />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth?mode=signin"
            className="group inline-flex items-center justify-center px-5 py-2.5 font-semibold text-text transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="transition-transform duration-300 group-hover:scale-[1.03]">
              Sign in
            </span>
          </Link>
          <span>
            <Button label="Get Started" />
          </span>
          <span className="md:hidden lg:block">
            <ThemeToggle />
          </span>
        </div>
      </div>
    </div>
  );
}
