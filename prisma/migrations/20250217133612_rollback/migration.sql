/*
  Warnings:

  - You are about to drop the column `visitId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_visitId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "visitId";

-- CreateTable
CREATE TABLE "_IssueToVisit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IssueToVisit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IssueToVisit_B_index" ON "_IssueToVisit"("B");

-- AddForeignKey
ALTER TABLE "_IssueToVisit" ADD CONSTRAINT "_IssueToVisit_A_fkey" FOREIGN KEY ("A") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToVisit" ADD CONSTRAINT "_IssueToVisit_B_fkey" FOREIGN KEY ("B") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
