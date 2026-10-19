/*
  Warnings:

  - Added the required column `verificationToken` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "verificationToken" TEXT NOT NULL,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);
