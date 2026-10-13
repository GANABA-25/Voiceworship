import { Dot } from "lucide-react";
import PresentationActionButton from "../ui/presentation-action-button";
import { SongTypes } from "@/types/songs-types";

import { Eye, Play, Plus } from "lucide-react";

type SongCardProps = {
  song: SongTypes;
  selectedLyric: string | null;
  onClick: (lyricId: string) => void;
};

export default function SongCard({
  song,
  selectedLyric,
  onClick,
}: SongCardProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="font-black">{song.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted">
          <p>{song.singer}</p>
          <Dot size={15} />
          <p>{song.lyrics.length} slides</p>
        </div>
      </div>

      {song.lyrics.map((lyric) => {
        const isSelected = selectedLyric === lyric.id;

        return (
          <div
            key={lyric.id}
            onClick={() => onClick(lyric.id)}
            className={`group flex cursor-pointer items-start justify-between space-y-2 rounded-md border p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-light hover:shadow-md ${
              isSelected
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border bg-card hover:bg-primary/5"
            }`}
          >
            <div>
              <p className="text-sm font-black text-primary transition-colors duration-200 group-hover:text-primary-light">
                {lyric.title}
              </p>
              <p className="transition-colors duration-200">{lyric.lyrics}</p>
            </div>

            <div className="flex translate-x-2 scale-95 items-center gap-2 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <PresentationActionButton
                icon={<Eye size={12} />}
                label="Preview"
              />

              <PresentationActionButton
                bg="bg-primary text-background hover:bg-primary-light"
                icon={<Play size={12} fill="currentColor" />}
                label="Go live"
              />

              <PresentationActionButton
                icon={<Plus size={12} />}
                label="Add to queue"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
