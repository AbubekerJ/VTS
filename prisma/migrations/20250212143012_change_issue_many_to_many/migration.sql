/*
  Warnings:

  - You are about to drop the column `visitId` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_visitId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "visitId";

-- CreateTable
CREATE TABLE "_PhotoToVisit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PhotoToVisit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PhotoToVisit_B_index" ON "_PhotoToVisit"("B");

-- AddForeignKey
ALTER TABLE "_PhotoToVisit" ADD CONSTRAINT "_PhotoToVisit_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToVisit" ADD CONSTRAINT "_PhotoToVisit_B_fkey" FOREIGN KEY ("B") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
