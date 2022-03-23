/*
  Warnings:

  - You are about to drop the column `commentsId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_commentsId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "commentsId";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_fkey" FOREIGN KEY ("id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
