/*
  Warnings:

  - You are about to drop the column `parentId` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "parentId",
ADD COLUMN     "parentCommentId" INTEGER,
ADD COLUMN     "replyToUserId" INTEGER;
