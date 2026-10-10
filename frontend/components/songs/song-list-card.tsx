import { Star } from "lucide-react";
import type { SongTypes } from "@/types/songs-types";

type SongListCardProps = {
  song: SongTypes;
  selectedSong: number | null;
  onClick: () => void;
};

export default function SongListCard({
  song,
  selectedSong,
  onClick,
}: SongListCardProps) {
  const isSelected = selectedSong === song.id;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer space-y-2 rounded-md border p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:shadow-sm ${
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border bg-card hover:bg-primary/5"
      }`}
    >
      <div className="flex items-center gap-4">
        <h1 className="font-black">{song.title}</h1>
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
