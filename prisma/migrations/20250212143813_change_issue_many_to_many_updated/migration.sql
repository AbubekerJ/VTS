/*
  Warnings:

  - You are about to drop the column `visitId` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `_PhotoToVisit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `visitId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_visitId_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToVisit" DROP CONSTRAINT "_PhotoToVisit_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToVisit" DROP CONSTRAINT "_PhotoToVisit_B_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "visitId";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "visitId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PhotoToVisit";

-- CreateTable
CREATE TABLE "_IssueToVisit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IssueToVisit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IssueToVisit_B_index" ON "_IssueToVisit"("B");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToVisit" ADD CONSTRAINT "_IssueToVisit_A_fkey" FOREIGN KEY ("A") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToVisit" ADD CONSTRAINT "_IssueToVisit_B_fkey" FOREIGN KEY ("B") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
