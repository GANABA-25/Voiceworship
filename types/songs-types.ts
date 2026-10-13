export type SongSection = {
  id: string;
  type: "verse" | "chorus" | "bridge" | "intro" | "outro";
  title: string;
  lyrics: string;
};

export type SongTypes = {
  id: number;
  title: string;
  singer: string;
  lyrics: SongSection[];
  createdAt: Date;
  updatedAt: Date;
};
