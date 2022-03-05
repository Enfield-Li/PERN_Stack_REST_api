/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `interactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "interactions" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "comments_createdAt_key" ON "comments"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "comments_updatedAt_key" ON "comments"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "interactions_createdAt_key" ON "interactions"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "post_createdAt_key" ON "post"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "post_updatedAt_key" ON "post"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_createdAt_key" ON "user"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_updatedAt_key" ON "user"("updatedAt");
