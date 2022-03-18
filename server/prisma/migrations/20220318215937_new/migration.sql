/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_updatedAt_key";

-- AlterTable
ALTER TABLE "commentInteractions" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "interactions" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "updatedAt";
