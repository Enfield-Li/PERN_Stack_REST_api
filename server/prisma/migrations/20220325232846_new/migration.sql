/*
  Warnings:

  - Added the required column `isComment` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "isComment" BOOLEAN NOT NULL;
