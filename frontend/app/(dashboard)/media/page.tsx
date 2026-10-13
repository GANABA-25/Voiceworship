import Button2 from "@/components/ui/button-2";
import MediaCard from "@/components/media-card";

import { ImageIcon } from "lucide-react";

export default function page() {
  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black">Media Library</h1>

          <p className="text-sm text-muted">
            Sunday Worship · 10:30 AM · Main Auditorium
          </p>
        </div>
      </header>

      <main className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <Button2 label="All" />
          <Button2 label="Image" />
          <Button2 label="Video" />
          <Button2 label="Audio" />
          <Button2 label="Background" />
        </div>

        <MediaCard />
      </main>
    </div>
  );
}
