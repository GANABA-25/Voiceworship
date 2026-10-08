import { bibleReference } from "@/types/bible";

export function parseBibleReference(input: string): bibleReference | null {
  const value = input
    .trim()
    .replace(/^(open|show|display|read)\s+/i, "")
    .replace(/\s+/g, " ");

  const colonMatch = value.match(/^(.+?)\s+(\d+):(\d+)(?:\s*-\s*(\d+))?$/i);

  if (colonMatch) {
    const [, book, chapter, verseStart, verseEnd] = colonMatch;

    return {
      book: book.trim(),
      chapter: Number(chapter),
      verseStart: Number(verseStart),
      verseEnd: verseEnd ? Number(verseEnd) : Number(verseStart),
    };
  }

  const spokenMatch = value.match(
    /^(.+?)\s+chapter\s+(\d+)\s+verses?\s+(\d+)(?:\s+(?:to|through|-)\s+(\d+))?$/i,
  );

  if (spokenMatch) {
    const [, book, chapter, verseStart, verseEnd] = spokenMatch;

    return {
      book: book.trim(),
      chapter: Number(chapter),
      verseStart: Number(verseStart),
      verseEnd: verseEnd ? Number(verseEnd) : Number(verseStart),
    };
  }

  const shortSpokenMatch = value.match(
    /^(.+?)\s+(\d+)\s+verses?\s+(\d+)(?:\s+(?:to|through|-)\s+(\d+))?$/i,
  );

  if (shortSpokenMatch) {
    const [, book, chapter, verseStart, verseEnd] = shortSpokenMatch;

    return {
      book: book.trim(),
      chapter: Number(chapter),
      verseStart: Number(verseStart),
      verseEnd: verseEnd ? Number(verseEnd) : Number(verseStart),
    };
  }

  return null;
}
