/*
  Warnings:

  - You are about to drop the column `postId` on the `commentInteractions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,commentId]` on the table `commentInteractions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "commentInteractions" DROP CONSTRAINT "commentInteractions_postId_fkey";

-- DropIndex
DROP INDEX "commentInteractions_userId_postId_commentId_key";

-- AlterTable
ALTER TABLE "commentInteractions" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "commentInteractions_userId_commentId_key" ON "commentInteractions"("userId", "commentId");
