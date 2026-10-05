export interface BiblePassageRequest {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  translation?: string;
}
