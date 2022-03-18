/*
  Warnings:

  - A unique constraint covering the columns `[updatedAt]` on the table `commentInteractions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "commentInteractions_updatedAt_key" ON "commentInteractions"("updatedAt");
