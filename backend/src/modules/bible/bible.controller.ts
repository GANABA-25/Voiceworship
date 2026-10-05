import type { Request, Response } from "express";
import prisma from "../../lib/prisma.ts";

const getPassage = async (req: Request, res: Response) => {
  try {
    const { book, chapter, translation, verseStart, verseEnd } = req.body;

    if (!book || !chapter || !verseStart) {
      return res.status(400).json({
        message: "Book, chapter, and verse are required.",
      });
    }

    const passage = await prisma.verse.findMany({
      where: {
        chapter: Number(chapter),
        verse: {
          gte: Number(verseStart),
          lte: Number(verseEnd),
        },
        book: {
          name: {
            equals: book,
            mode: "insensitive",
          },
          translation: {
            abbreviation: {
              equals: translation || "KJV",
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

    if (passage.length === 0) {
      return res.status(404).json({
        message: "Bible passage not found.",
      });
    }

    return res.json({
      translation: passage[0].book.translation.abbreviation,
      translationName: passage[0].book.translation.name,
      book: passage[0].book.name,
      chapter: passage[0].chapter,
      verses: passage.map((verse) => ({
        verse: verse.verse,
        text: verse.text,
      })),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  getPassage,
};
