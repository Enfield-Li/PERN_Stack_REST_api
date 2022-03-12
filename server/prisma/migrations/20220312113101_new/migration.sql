-- CreateTable
CREATE TABLE "commentInteractions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voteStatus" BOOLEAN,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "commentInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commentInteractions_createdAt_key" ON "commentInteractions"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "commentInteractions_updatedAt_key" ON "commentInteractions"("updatedAt");

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commentInteractions" ADD CONSTRAINT "commentInteractions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
