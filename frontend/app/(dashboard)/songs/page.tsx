"use client";

import { useState } from "react";
import type { SongTypes } from "@/types/songs-types";

import { songs } from "@/data/dummy";
import SongListCard from "@/components/songs/song-list-card";
import SongCard from "@/components/songs/song-card";
import Button from "@/components/ui/button";

import { Dot } from "lucide-react";

export default function Page() {
  const [selectedSong, setSelectedSong] = useState<SongTypes | null>(
    songs[0] ?? null,
  );
  const [selectedLyric, setSelectedLyric] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-0 overflow-hidden">
      <section className="flex-3 shrink-0 space-y-4 overflow-y-auto border-r border-border p-4 scrollbar-yellow">
        <header className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex shrink-0 items-center gap-2">
              <h1 className="font-black">Song Library</h1>
              <Dot size={15} />
              <p>{songs.length}</p>
            </div>
            <p className="text-xs text-muted">
              Manage your worship songs, organize lyrics, <br /> and prepare
              slides for your service.
            </p>
          </div>

          <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 px-2 font-bold text-xs text-background shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none">
            Add song
          </button>
        </header>

        {songs.map((song) => (
          <SongListCard
            key={song.id}
            song={song}
            selectedSong={selectedSong}
            onClick={() => setSelectedSong(song)}
          />
        ))}
      </section>

      <section className="flex-7 overflow-y-auto p-4 scrollbar-yellow">
        {selectedSong ? (
          <SongCard
            song={selectedSong}
            selectedLyric={selectedLyric}
            onClick={(lyricId) => setSelectedLyric(lyricId)}
          />
        ) : (
          <p className="text-sm text-muted">
            Select a song from your library to view its lyrics.
          </p>
        )}
      </section>
    </div>
  );
}
