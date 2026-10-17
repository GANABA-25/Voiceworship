import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import NavItems from "./nav-items";
import Button from "@/components/ui/button";

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
          <button>Sign in</button>
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
