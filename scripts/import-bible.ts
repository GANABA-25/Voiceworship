import fs from "node:fs/promises";
import path from "node:path";
import prisma from "./prisma";

const bibleDirectory = path.resolve(process.cwd(), "bible-data/kjv2006");

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

const bookOrder = Object.keys(bookNames);

function cleanVerseText(text: string) {
  return text
    .replace(/\\w\s+([^|]+)\|[^\\]*\\w\*/g, "$1")
    .replace(/\\add\s+([^\\]+?)\\add\*/g, "$1")
    .replace(/\\f\s+.*?\\f\*/g, "")
    .replace(/\\x\s+.*?\\x\*/g, "")
    .replace(/\\fr\s+.*?\\ft\s+/g, "")
    .replace(/\\[a-z]+\*?/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
}

async function importBible() {
  console.log("Starting Bible import...");

  const allFiles = await fs.readdir(bibleDirectory);

  const files = allFiles.filter((file) => file.toLowerCase().endsWith(".usfm"));

  if (files.length === 0) {
    throw new Error(`No .usfm files found in ${bibleDirectory}`);
  }

  // Read each file's USFM book ID so books are imported
  // in canonical Bible order, not alphabetical filename order.
  const identifiedFiles: {
    file: string;
    abbreviation: string;
    content: string;
  }[] = [];

  for (const file of files) {
    const content = await fs.readFile(path.join(bibleDirectory, file), "utf8");

    const idMatch = content.match(/^\\id\s+(\S+)/m);

    if (!idMatch || !bookNames[idMatch[1]]) {
      console.warn(`Skipping unrecognized Bible file: ${file}`);
      continue;
    }

    identifiedFiles.push({
      file,
      abbreviation: idMatch[1],
      content,
    });
  }

  identifiedFiles.sort(
    (a, b) =>
      bookOrder.indexOf(a.abbreviation) - bookOrder.indexOf(b.abbreviation),
  );

  const translation = await prisma.translation.upsert({
    where: { abbreviation: "KJV" },
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

  let totalVerses = 0;

  for (let index = 0; index < identifiedFiles.length; index++) {
    const { abbreviation, content, file } = identifiedFiles[index];
    const bookName = bookNames[abbreviation];

    const book = await prisma.book.upsert({
      where: {
        translationId_abbreviation: {
          translationId: translation.id,
          abbreviation,
        },
      },
      update: {
        name: bookName,
        bookOrder: bookOrder.indexOf(abbreviation) + 1,
      },
      create: {
        translationId: translation.id,
        name: bookName,
        abbreviation,
        bookOrder: bookOrder.indexOf(abbreviation) + 1,
      },
    });

    const lines = content.split(/\r?\n/);
    let chapter = 0;
    let currentVerse: number | null = null;
    let verseText = "";
    let bookVerses = 0;

    async function saveVerse() {
      if (chapter === 0 || currentVerse === null) return;

      const text = cleanVerseText(verseText);

      if (!text) return;

      await prisma.verse.upsert({
        where: {
          bookId_chapter_verse: {
            bookId: book.id,
            chapter,
            verse: currentVerse,
          },
        },
        update: { text },
        create: {
          bookId: book.id,
          chapter,
          verse: currentVerse,
          text,
        },
      });

      bookVerses++;
      totalVerses++;
    }

    for (const line of lines) {
      const chapterMatch = line.match(/^\\c\s+(\d+)/);

      if (chapterMatch) {
        await saveVerse();

        chapter = Number(chapterMatch[1]);
        currentVerse = null;
        verseText = "";
        continue;
      }

      const verseMatch = line.match(/^\\v\s+(\d+)(?:\s+)?(.*)$/);

      if (verseMatch && chapter > 0) {
        await saveVerse();

        currentVerse = Number(verseMatch[1]);
        verseText = verseMatch[2];
        continue;
      }

      // USFM verse text may continue on following lines.
      // Ignore standalone formatting and structural markers.
      if (
        currentVerse !== null &&
        !/^\\(?:id|ide|h|toc\d*|mt\d*|mte\d*|ms\d*|s\d*|r|d|sp|c|v|p|q\d*|q|b|nb|cl|cp|rem|periph|imt\d*|ip|ipi|im|imi|iot|io\d*|li\d*|pi\d*|pc|pr|cls|lit|qa|qm\d*|qr|lh|lf|cd|tr|th\d*|thr\d*|tc\d*|tcr\d*|te\d*|esb|ee)\\s*/.test(
          line.trim(),
        )
      ) {
        verseText += " " + line.trim();
      }
    }

    await saveVerse();

    console.log(
      `${index + 1}/${identifiedFiles.length} ${bookName} (${bookVerses} verses)`,
    );

    // Prevent an unused-variable warning while retaining the filename
    // for easier debugging if you later add file-specific logging.
    void file;
  }

  console.log("Bible import completed.");
  console.log(`Books processed: ${identifiedFiles.length}`);
  console.log(`Verses imported or updated: ${totalVerses}`);
}

importBible()
  .catch((error) => {
    console.error("Bible import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
