-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "translationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "bookOrder" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_abbreviation_key" ON "Translation"("abbreviation");

-- CreateIndex
CREATE INDEX "Book_translationId_bookOrder_idx" ON "Book"("translationId", "bookOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Book_translationId_abbreviation_key" ON "Book"("translationId", "abbreviation");

-- CreateIndex
CREATE INDEX "Verse_bookId_chapter_verse_idx" ON "Verse"("bookId", "chapter", "verse");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_bookId_chapter_verse_key" ON "Verse"("bookId", "chapter", "verse");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
