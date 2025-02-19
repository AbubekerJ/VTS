/*
  Warnings:

  - You are about to drop the `_IssueToVisit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `visitId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IssueToVisit" DROP CONSTRAINT "_IssueToVisit_A_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToVisit" DROP CONSTRAINT "_IssueToVisit_B_fkey";

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "visitId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_IssueToVisit";

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
