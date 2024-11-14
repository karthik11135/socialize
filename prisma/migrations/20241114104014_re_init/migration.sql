/*
  Warnings:

  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "userId1" SET DATA TYPE TEXT,
ALTER COLUMN "userId2" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "userId" TEXT NOT NULL;
