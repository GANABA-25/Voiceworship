"use server";

import prisma from "@/lib/server/prisma";
import { parseBibleReference } from "@/util/parse-bible-reference";
import type { bibleReference, BiblePassageState } from "@/types/bible";

async function fetchBiblePassage(
  reference: bibleReference,
): Promise<BiblePassageState> {
  try {
    const {
      book,
      chapter,
      verseStart,
      verseEnd,
      translation = "KJV",
    } = reference;

    const verses = await prisma.verse.findMany({
      where: {
        chapter: Number(chapter),
        verse: {
          gte: Number(verseStart),
          lte: Number(verseEnd ?? verseStart),
        },
        book: {
          name: {
            equals: book,
            mode: "insensitive",
          },
          translation: {
            abbreviation: {
              equals: translation,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        book: {
          include: {
            translation: true,
          },
        },
      },
      orderBy: {
        verse: "asc",
      },
    });

    if (verses.length === 0) {
      return {
        success: false,
        message: "Bible passage not found.",
      };
    }

    return {
      success: true,
      message: "Bible passage found.",
      passage: {
        translation: verses[0].book.translation.abbreviation,
        translationName: verses[0].book.translation.name,
        book: verses[0].book.name,
        chapter: verses[0].chapter,
        verses: verses.map((verse) => ({
          verse: verse.verse,
          text: verse.text,
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}

export async function getBiblePassage(
  _prevState: BiblePassageState,
  formData: FormData,
): Promise<BiblePassageState> {
  try {
    const searchWord = String(formData.get("searchWord") ?? "").trim();
    const reference = parseBibleReference(searchWord);

    if (!reference) {
      return {
        success: false,
        message: "Invalid Bible reference.",
      };
    }

    return fetchBiblePassage(reference);
  } catch (error) {
    console.error("[setNewPassword] failed:", error);
    return {
      success: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}

export async function getBiblePassageByReference(
  reference: bibleReference,
): Promise<BiblePassageState> {
  return fetchBiblePassage(reference);
}
