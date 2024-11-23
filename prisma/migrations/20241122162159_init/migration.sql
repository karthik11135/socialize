/*
  Warnings:

  - Changed the type of `repostId` on the `RePosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RePosts" DROP COLUMN "repostId",
ADD COLUMN     "repostId" INTEGER NOT NULL;
