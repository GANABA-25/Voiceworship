import React from "react";

import { Image } from "lucide-react";

export default function MediaCard() {
  return (
    <div className="flex items-center gap-2 border border-border bg-card p-4 rounded-md shadow-xs">
      <div className="border border-border p-1 rounded-md">
        <Image size={15} color="#d9a936" />
      </div>

      <div>
        <h1 className="text-text font-bold">302</h1>
        <p className="text-muted text-sm">Media file</p>
      </div>
    </div>
  );
}
