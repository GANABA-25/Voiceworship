export type bibleVerse = {
  verse: number;
  text: string;
};

export type biblePassage = {
  translation: string;
  translationName: string;
  book: string;
  chapter: number;
  verses: bibleVerse[];
};

export type bibleReference = {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
};
