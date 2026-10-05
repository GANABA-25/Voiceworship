export type BibleVerse = {
  verse: number;
  text: string;
};

export type BiblePassage = {
  translation: string;
  translationName: string;
  book: string;
  chapter: number;
  verses: BibleVerse[];
};

export type BibleReference = {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
};
