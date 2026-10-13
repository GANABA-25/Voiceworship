"use client";

import PresentationActionButton from "./ui/presentation-action-button";
import { Eye, Play, Plus, Trash, Video, FileHeadphone } from "lucide-react";

type MediaCardProps = {
  src: string;
  name: string;
  type: "image" | "video" | "audio";
  onDelete?: () => void;
};

export default function MediaCard({
  src,
  name,
  type,
  onDelete,
}: MediaCardProps) {
  return (
    <div className="group relative h-60 w-full overflow-hidden rounded-md border border-border bg-card">
      <div className="flex h-[84%] items-center justify-center overflow-hidden bg-linear-to-br from-primary/40 to-card">
        {type === "image" && (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        )}

        {type === "video" && (
          <video
            src={src}
            className="h-full w-full object-cover"
            muted
            preload="metadata"
          />
        )}

        {type === "audio" && (
          <div className="flex w-full flex-col items-center gap-3 px-4">
            <FileHeadphone className="h-8 w-8 text-muted" />
            <audio src={src} controls className="h-8 w-full" />
          </div>
        )}

        {type === "video" && (
          <div className="pointer-events-none absolute top-2 right-2 rounded bg-black/60 p-1 text-white">
            <Video size={14} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 z-10 flex h-[16%] w-full items-center justify-between bg-card px-4">
        <h2 className="truncate text-xs font-semibold text-text">{name}</h2>

        <p className="ml-2 text-[10px] capitalize text-muted">{type}</p>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100">
        <PresentationActionButton icon={<Eye size={14} />} label="Preview" />

        <PresentationActionButton
          bg="bg-primary text-background hover:bg-primary-light"
          icon={<Play size={14} fill="currentColor" />}
          label="Go live"
        />

        <PresentationActionButton
          icon={<Plus size={14} />}
          label="Add to queue"
        />

        <PresentationActionButton
          icon={<Trash size={14} />}
          label="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
