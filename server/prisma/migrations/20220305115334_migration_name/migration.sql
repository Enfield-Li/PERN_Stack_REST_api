/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_createdAt_key" ON "post"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "post_updatedAt_key" ON "post"("updatedAt");
