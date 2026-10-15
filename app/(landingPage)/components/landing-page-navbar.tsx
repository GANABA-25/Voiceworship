import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import NavItems from "./nav-items";
import Button from "@/components/ui/button";
import Button2 from "@/components/ui/button-2";

export default function LandingPageNavbar() {
  return (
    <div className="border-y border-border rounded-md bg-background shadow-sm">
      <div className="max-w-360 m-auto flex justify-between items-center gap-4  p-4">
        <Logo />
        <NavItems />

        <div className="flex items-center gap-4">
          <button>Sign in</button>
          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 px-4 font-bold text-background shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none">
            Get Started
          </button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
