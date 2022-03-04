/*
  Warnings:

  - You are about to drop the column `voteCount` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "voteCount",
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;
