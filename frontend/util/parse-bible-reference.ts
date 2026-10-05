export type BibleReference = {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
};

export function parseBibleReference(input: string): BibleReference | null {
  const value = input.trim();

  const match = value.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);

  if (!match) {
    return null;
  }

  const [, book, chapter, verseStart, verseEnd] = match;

  return {
    book: book.trim(),
    chapter: Number(chapter),
    verseStart: Number(verseStart),
    verseEnd: verseEnd ? Number(verseEnd) : Number(verseStart),
  };
}
