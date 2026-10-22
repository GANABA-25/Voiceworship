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

export type parsedReference = {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
};

export type bibleReference = parsedReference & {
  translation?: string; // optional: server defaults to "KJV"
};

export type BiblePassageState = {
  success: boolean;
  message: string;
  passage?: {
    translation: string;
    translationName: string;
    book: string;
    chapter: number;
    verses: {
      verse: number;
      text: string;
    }[];
  };
};
