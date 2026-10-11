import { Star, X } from "lucide-react";
import type { SongTypes } from "@/types/songs-types";
import PresentationActionButton from "../ui/presentation-action-button";

type SongListCardProps = {
  song: SongTypes;
  selectedSong: SongTypes | null;
  onClick: () => void;
};

export default function SongListCard({
  song,
  selectedSong,
  onClick,
}: SongListCardProps) {
  const isSelected = selectedSong?.id === song.id;

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer space-y-2 rounded-md border p-4 pr-10 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:shadow-sm ${
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border bg-card hover:bg-primary/5"
      }`}
    >
      <div className="absolute right-3 top-3 rounded-md p-1 text-muted hover:bg-destructive/10 hover:text-destructive opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 cursor-pointer">
        <PresentationActionButton icon={<X size={12} />} label="Remove Song" />
      </div>

      <div className="flex items-center gap-4">
        <h1 className="font-black truncate">{song.title}</h1>
        <Star
          size={15}
          fill="#f3be47"
          color="#f3be47"
          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        />
      </div>

      <p className="text-sm text-muted">{song.singer}</p>

      <div className="flex gap-4 text-xs text-muted">
        <p>{song.lyrics.length} slides</p>
        <p>{song.createdAt.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
