"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-muted transition-all duration-200 hover:border-primary/40 hover:bg-hover hover:text-text cursor-pointer"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-hover text-primary">
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </span>

      <span className="text-xs font-medium uppercase tracking-wide">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
