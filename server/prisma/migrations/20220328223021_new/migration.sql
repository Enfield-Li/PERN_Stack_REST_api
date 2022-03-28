-- CreateTable
CREATE TABLE "parentComment" (
    "replyToUserId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "parentComment_replyToUserId_commentId_key" ON "parentComment"("replyToUserId", "commentId");

-- AddForeignKey
ALTER TABLE "parentComment" ADD CONSTRAINT "parentComment_replyToUserId_fkey" FOREIGN KEY ("replyToUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentComment" ADD CONSTRAINT "parentComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
