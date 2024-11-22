/*
  Warnings:

  - Added the required column `repostId` to the `RePosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RePosts" ADD COLUMN     "repostId" INTEGER NOT NULL;
