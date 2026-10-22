"use server";

import prisma from "@/lib/server/prisma";
import type { bibleReference, BiblePassageState } from "@/types/bible";

export async function getBiblePassageByReference(
  reference: bibleReference,
): Promise<BiblePassageState> {
  try {
    const { book, chapter, verseStart, verseEnd, translation } = reference;

    const verses = await prisma.verse.findMany({
      where: {
        chapter: Number(chapter),
        verse: {
          gte: Number(verseStart),
          lte: Number(verseEnd ?? verseStart),
        },
        book: {
          name: { equals: book, mode: "insensitive" },
          translation: {
            abbreviation: { equals: translation, mode: "insensitive" },
          },
        },
      },
      include: { book: { include: { translation: true } } },
      orderBy: { verse: "asc" },
    });

    if (verses.length === 0) {
      return { success: false, message: "Bible passage not found." };
    }

    const { book: b } = verses[0];

    return {
      success: true,
      message: "Bible passage found.",
      passage: {
        translation: b.translation.abbreviation,
        translationName: b.translation.name,
        book: b.name,
        chapter: verses[0].chapter,
        verses: verses.map(({ verse, text }) => ({ verse, text })),
      },
    };
  } catch (error) {
    console.error("[getBiblePassageByReference] failed:", error);
    return {
      success: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
