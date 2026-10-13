"use client";

import { useRef, useState } from "react";
import Button2 from "@/components/ui/button-2";
import MediaCard from "@/components/media-card";
import { Upload } from "lucide-react";

type MediaType = "image" | "video" | "audio";

type MediaFile = {
  id: string;
  file: File;
  name: string;
  type: MediaType;
  url: string;
};

export default function Page() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    const newFiles: MediaFile[] = files.flatMap((file) => {
      let type: MediaType;

      if (file.type.startsWith("image/")) {
        type = "image";
      } else if (file.type.startsWith("video/")) {
        type = "video";
      } else if (file.type.startsWith("audio/")) {
        type = "audio";
      } else {
        return [];
      }

      return [
        {
          id: crypto.randomUUID(),
          file,
          name: file.name.replace(/\.[^/.]+$/, ""),
          type,
          url: URL.createObjectURL(file),
        },
      ];
    });

    setMediaFiles((previous) => [...previous, ...newFiles]);
    event.target.value = "";
  }

  function handleDelete(id: string) {
    setMediaFiles((previous) => {
      const item = previous.find((media) => media.id === id);

      if (item) {
        URL.revokeObjectURL(item.url);
      }

      return previous.filter((media) => media.id !== id);
    });
  }

  const filters = ["All", "Image", "Video", "Audio", "Background"];

  const filteredFiles = mediaFiles.filter((media) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Background") return false;

    return media.type === activeFilter.toLowerCase();
  });

  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black">Media Library</h1>

          <p className="text-sm text-muted">
            Sunday Worship · 10:30 AM · Main Auditorium
          </p>
        </div>

        <Button2
          label="Upload Media"
          icon={<Upload size={16} />}
          onClick={() => fileInputRef.current?.click()}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </header>

      <main className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          {filters.map((filter) => (
            <Button2
              key={filter}
              label={filter}
              onClick={() => setActiveFilter(filter)}
              bg={
                activeFilter === filter
                  ? "bg-primary text-background"
                  : undefined
              }
            />
          ))}
        </div>

        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filteredFiles.map((media) => (
              <MediaCard
                key={media.id}
                name={media.name}
                type={media.type}
                src={media.url}
                onDelete={() => handleDelete(media.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-100 flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border bg-card text-center">
            <Upload className="h-8 w-8 text-muted" />

            <h2 className="text-sm font-bold">
              {activeFilter === "All"
                ? "Your media library is empty"
                : `No ${activeFilter.toLowerCase()} files found`}
            </h2>

            <p className="text-sm text-muted">
              Upload images, videos, or audio files to get started.
            </p>

            <Button2
              label="Upload Media"
              icon={<Upload size={16} />}
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
        )}
      </main>
    </div>
  );
}
