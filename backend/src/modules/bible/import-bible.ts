import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import prisma from "../../lib/prisma.ts";

const bibleDirectory = path.resolve("bible-data/kjv2006");

const bookNames: Record<string, string> = {
  GEN: "Genesis",
  EXO: "Exodus",
  LEV: "Leviticus",
  NUM: "Numbers",
  DEU: "Deuteronomy",
  JOS: "Joshua",
  JDG: "Judges",
  RUT: "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  EZR: "Ezra",
  NEH: "Nehemiah",
  EST: "Esther",
  JOB: "Job",
  PSA: "Psalms",
  PRO: "Proverbs",
  ECC: "Ecclesiastes",
  SNG: "Song of Solomon",
  ISA: "Isaiah",
  JER: "Jeremiah",
  LAM: "Lamentations",
  EZK: "Ezekiel",
  DAN: "Daniel",
  HOS: "Hosea",
  JOL: "Joel",
  AMO: "Amos",
  OBA: "Obadiah",
  JON: "Jonah",
  MIC: "Micah",
  NAM: "Nahum",
  HAB: "Habakkuk",
  ZEP: "Zephaniah",
  HAG: "Haggai",
  ZEC: "Zechariah",
  MAL: "Malachi",
  MAT: "Matthew",
  MRK: "Mark",
  LUK: "Luke",
  JHN: "John",
  ACT: "Acts",
  ROM: "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  GAL: "Galatians",
  EPH: "Ephesians",
  PHP: "Philippians",
  COL: "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  TIT: "Titus",
  PHM: "Philemon",
  HEB: "Hebrews",
  JAS: "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
  JUD: "Jude",
  REV: "Revelation",
};

function cleanVerseText(text: string) {
  return text
    .replace(/\\w\s+([^|]+)\|[^\\]*\\w\*/g, "$1")
    .replace(/\\add\s+([^\\]+?)\\add\*/g, "$1")
    .replace(/\\f\s+.*?\\f\*/g, "")
    .replace(/\\fr\s+.*?\\ft\s+/g, "")
    .replace(/\\[a-z]+\*?/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
}

async function importBible() {
  console.log("Starting Bible import...");

  const files = (await fs.readdir(bibleDirectory))
    .filter((file) => file.endsWith(".usfm"))
    .sort();

  if (files.length === 0) {
    throw new Error(`No USFM files found in ${bibleDirectory}`);
  }

  const translation = await prisma.translation.upsert({
    where: {
      abbreviation: "KJV",
    },
    update: {
      name: "King James Version 2006",
      language: "English",
    },
    create: {
      name: "King James Version 2006",
      abbreviation: "KJV",
      language: "English",
    },
  });

  console.log(`Translation ready: ${translation.name}`);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const content = await fs.readFile(path.join(bibleDirectory, file), "utf8");

    const idMatch = content.match(/^\\id\s+(\S+)\s+(.+)$/m);

    if (!idMatch) {
      console.log(`Skipping ${file}`);
      continue;
    }

    const abbreviation = idMatch[1];
    const bookName = bookNames[abbreviation] ?? idMatch[2].trim();

    const book = await prisma.book.upsert({
      where: {
        translationId_abbreviation: {
          translationId: translation.id,
          abbreviation,
        },
      },
      update: {
        name: bookName,
        bookOrder: index + 1,
      },
      create: {
        translationId: translation.id,
        name: bookName,
        abbreviation,
        bookOrder: index + 1,
      },
    });

    const lines = content.split(/\r?\n/);

    let chapter = 0;

    for (const line of lines) {
      const chapterMatch = line.match(/^\\c\s+(\d+)/);

      if (chapterMatch) {
        chapter = Number(chapterMatch[1]);
        continue;
      }

      const verseMatch = line.match(/^\\v\s+(\d+)\s+(.+)$/);

      if (!verseMatch || chapter === 0) {
        continue;
      }

      const verse = Number(verseMatch[1]);
      const text = cleanVerseText(verseMatch[2]);

      if (!text) {
        continue;
      }

      await prisma.verse.upsert({
        where: {
          bookId_chapter_verse: {
            bookId: book.id,
            chapter,
            verse,
          },
        },
        update: {
          text,
        },
        create: {
          bookId: book.id,
          chapter,
          verse,
          text,
        },
      });
    }

    console.log(`${index + 1}/${files.length} ${bookName}`);
  }

  console.log("Bible import completed.");
}

importBible()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
