/*
  Warnings:

  - You are about to drop the column `haveRead` on the `interactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "interactions" DROP COLUMN "haveRead",
ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
