-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "commentsId" INTEGER;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
