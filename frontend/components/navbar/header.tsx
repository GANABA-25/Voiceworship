import { MicAudioLines, Mic, Settings, Bell } from "lucide-react";
import ThemeToggle from "../theme-toggle";
import SearchInput from "../search-Input";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-background px-4">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-1 overflow-hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary font-bold text-white">
            <MicAudioLines size={15} />
          </div>

          <h1 className="whitespace-nowrap font-bold text-text">
            VoiceWorship
          </h1>
        </div>

        <div className="h-5 w-0.5 bg-border" />
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex gap-4">
          <span>
            <h1 className="text-sm font-medium text-text">Sunday Service</h1>
            <p className="text-xs text-muted">House of Faith Ministries FIC</p>
          </span>

          <div className="flex h-8 items-center gap-2 rounded-md border border-danger/40 bg-danger/5 px-3 text-danger">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute h-full w-full animate-pulse rounded-full bg-danger/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-danger" />
            </span>

            <span className="text-xs uppercase tracking-wide">Live</span>
          </div>

          <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-danger/5 px-3 text-primary">
            <Mic size={14} />
            <span className="text-xs tracking-wide">Listening</span>
          </div>
        </div>

        <span className="flex items-center gap-4">
          <SearchInput />

          <Settings size={15} />

          <span className="relative flex h-8 w-8 items-center justify-center">
            <Bell size={17} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </span>
          <ThemeToggle />
        </span>
      </div>
    </div>
  );
}
