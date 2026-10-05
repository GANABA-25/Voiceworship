import prisma from "../lib/prisma.ts";

export async function getVerse(
  translation: string,
  book: string,
  chapter: number,
  verse: number,
) {
  const result = await prisma.verse.findFirst({
    where: {
      chapter,
      verse,
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
  });

  if (!result) {
    return null;
  }

  return {
    translation: result.book.translation.abbreviation,
    translationName: result.book.translation.name,
    book: result.book.name,
    chapter: result.chapter,
    verse: result.verse,
    text: result.text,
  };
}
