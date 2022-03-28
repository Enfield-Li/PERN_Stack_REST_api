-- AlterTable
ALTER TABLE "commentInteractions" ADD COLUMN     "downvoteAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvoteAmount" INTEGER NOT NULL DEFAULT 0;
