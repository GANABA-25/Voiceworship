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
  | "text";

export type PresentationSlide = {
  id: string;
  type: PresentationContentType;
  title: string;
  content?: string;
  source?: string;
  reference?: string;
  metadata?: BibleSlideMetadata;
};

export type PresentationItem = PresentationSlide;

export type BibleHistoryItem = {
  slide: PresentationSlide;
  timestamp: string;
};
