/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,commentId]` on the table `commentInteractions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "commentInteractions" DROP CONSTRAINT "commentInteractions_commentId_fkey";

-- DropForeignKey
ALTER TABLE "commentInteractions" DROP CONSTRAINT "commentInteractions_postId_fkey";

-- DropForeignKey
ALTER TABLE "commentInteractions" DROP CONSTRAINT "commentInteractions_userId_fkey";

-- AlterTable
ALTER TABLE "commentInteractions" ADD COLUMN     "commentsId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "commentInteractions_userId_postId_commentId_key" ON "commentInteractions"("userId", "postId", "commentId");

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
