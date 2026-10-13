"use client";

import PresentationActionButton from "./ui/presentation-action-button";
import { ImageIcon, Eye, Play, Plus, Trash } from "lucide-react";

export default function MediaCard() {
  return (
    <div className="group relative h-60 w-80 overflow-hidden rounded-md border border-border bg-[#101715]">
      <div className="flex h-[84%] items-center justify-center bg-linear-to-br from-[#12251f] to-[#171a1a]">
        <ImageIcon className="h-6 w-6 text-gray-500" />
      </div>

      <div className="absolute bottom-0 flex h-[16%] w-full items-center justify-between bg-[#090909] px-2">
        <h1 className="text-xs font-semibold text-white">Baptism Sunday</h1>

        <p className="text-[10px] text-gray-400">Image</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100">
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

        <PresentationActionButton icon={<Trash size={14} />} label="Delete" />
      </div>
    </div>
  );
}
