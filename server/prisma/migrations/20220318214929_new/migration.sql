/*
  Warnings:

  - A unique constraint covering the columns `[updatedAt]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `interactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comments_updatedAt_key" ON "comments"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "interactions_updatedAt_key" ON "interactions"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "post_updatedAt_key" ON "post"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_updatedAt_key" ON "user"("updatedAt");
