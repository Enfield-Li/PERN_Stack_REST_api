-- DropIndex
DROP INDEX "commentInteractions_updatedAt_key";

-- DropIndex
DROP INDEX "comments_updatedAt_key";

-- DropIndex
DROP INDEX "post_updatedAt_key";

-- DropIndex
DROP INDEX "user_updatedAt_key";

-- AlterTable
ALTER TABLE "interactions" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
