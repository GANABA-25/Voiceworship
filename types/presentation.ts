import { SongSection } from "./songs-types";

export type BibleSlideMetadata = {
  translation: string;
  translationName: string;
  book: string;
  chapter: number;
  verse: number;
};

export type PresentationContentType =
  | "bible"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "song";

export type PresentationSlide = {
  id: string;
  type: PresentationContentType;
  title: string;
  content?: string;
  source?: string;
  reference?: string;
  metadata?: BibleSlideMetadata;
  lyric?: SongSection;
  lyrics?: string;
  singer?: string;
};

export type PresentationItem = PresentationSlide;

export type BibleHistoryItem = {
  slide: PresentationSlide;
  timestamp: string;
};
