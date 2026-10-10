"use client";

import { useState } from "react";

import { songs } from "@/data/dummy";
import SongListCard from "@/components/songs/song-list-card";
import SongCard from "@/components/songs/song-card";
import { Dot } from "lucide-react";

export default function Page() {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);

  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-0 overflow-hidden">
      <section className="flex-2 space-y-4 border-r border-border p-4 shrink-0 overflow-y-auto scrollbar-yellow">
        <div className="flex shrink-0 items-center gap-2 text-muted">
          <h1>Song Library</h1>
          <Dot size={15} />
          <p>{songs.length}</p>
        </div>

        {songs.map((song) => (
          <SongListCard
            key={song.id}
            song={song}
            selectedSong={selectedSong}
            onClick={() => setSelectedSong(song.id)}
          />
        ))}
      </section>

      <section className="flex-8 p-4 overflow-y-auto scrollbar-yellow">
        <SongCard />
      </section>
    </div>
  );
}
