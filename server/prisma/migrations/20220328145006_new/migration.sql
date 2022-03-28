/*
  Warnings:

  - You are about to drop the column `commentsId` on the `commentInteractions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commentInteractions" DROP CONSTRAINT "commentInteractions_commentsId_fkey";

-- AlterTable
ALTER TABLE "commentInteractions" DROP COLUMN "commentsId";

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
