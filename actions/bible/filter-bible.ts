"use server";

import prisma from "@/lib/server/prisma";
import type { BibleFilterReference, BookData } from "@/types/bible";

export async function filterBible(
  reference: BibleFilterReference,
): Promise<BookData> {
  const emptyResult: BookData = {
    success: false,
    message: "We couldn't load the Bible passage. Please try again.",
    books: [],
    chapters: [],
    verses: [],
  };

  try {
    const { translation, book, chapter, verse } = reference;

    if (!translation) {
      return {
        ...emptyResult,
        message: "Please select a Bible translation.",
      };
    }

    if (chapter !== undefined && (!Number.isInteger(chapter) || chapter < 1)) {
      return {
        ...emptyResult,
        message: "Please select a valid chapter.",
      };
    }

    if (verse !== undefined && (!Number.isInteger(verse) || verse < 1)) {
      return {
        ...emptyResult,
        message: "Please select a valid verse.",
      };
    }

    const selectedTranslation = await prisma.translation.findUnique({
      where: { abbreviation: translation },
      select: {
        id: true,
        abbreviation: true,
        name: true,
      },
    });

    if (!selectedTranslation) {
      return {
        ...emptyResult,
        message: "The selected Bible translation could not be found.",
      };
    }

    const bookRows = await prisma.book.findMany({
      where: { translationId: selectedTranslation.id },
      orderBy: { bookOrder: "asc" },
      select: {
        id: true,
        name: true,
        abbreviation: true,
      },
    });

    const bookOptions = bookRows.map((item) => ({
      value: item.abbreviation,
      label: item.name,
    }));

    if (!book) {
      return {
        success: true,
        books: bookOptions,
        chapters: [],
        verses: [],
      };
    }

    const selectedBook = bookRows.find((item) => item.abbreviation === book);

    if (!selectedBook) {
      return {
        ...emptyResult,
        message: "The selected book could not be found.",
      };
    }

    const chapterRows = await prisma.verse.findMany({
      where: { bookId: selectedBook.id },
      distinct: ["chapter"],
      orderBy: { chapter: "asc" },
      select: { chapter: true },
    });

    const chapterOptions = chapterRows.map((item) => ({
      value: String(item.chapter),
      label: String(item.chapter),
    }));

    // When a book is selected, default to its first chapter.
    const selectedChapter = chapter ?? 1;

    const chapterExists = chapterRows.some(
      (item) => item.chapter === selectedChapter,
    );

    if (!chapterExists) {
      return {
        ...emptyResult,
        message: "The selected chapter could not be found.",
      };
    }

    const verseRows = await prisma.verse.findMany({
      where: {
        bookId: selectedBook.id,
        chapter: selectedChapter,
      },
      orderBy: { verse: "asc" },
      select: {
        verse: true,
        text: true,
      },
    });

    const verseOptions = verseRows.map((item) => ({
      value: String(item.verse),
      label: String(item.verse),
    }));

    // If a verse was selected, return only that verse.
    const passageVerses =
      verse === undefined
        ? verseRows
        : verseRows.filter((item) => item.verse === verse);

    if (passageVerses.length === 0) {
      return {
        ...emptyResult,
        message: "The selected verse could not be found.",
      };
    }

    return {
      success: true,
      books: bookOptions,
      chapters: chapterOptions,
      verses: verseOptions,
      passage: {
        translation: selectedTranslation.abbreviation,
        translationName: selectedTranslation.name,
        book: selectedBook.name,
        chapter: selectedChapter,
        verses: passageVerses,
      },
    };
  } catch (error) {
    console.error("[filterBible] failed:", error);
    return emptyResult;
  }
}
