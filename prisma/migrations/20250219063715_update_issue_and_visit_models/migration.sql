/*
  Warnings:

  - You are about to drop the column `status` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitIssue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IssueToVisit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `VisitIssue` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_visitId_fkey";

-- DropForeignKey
ALTER TABLE "VisitIssue" DROP CONSTRAINT "VisitIssue_issueId_fkey";

-- DropForeignKey
ALTER TABLE "VisitIssue" DROP CONSTRAINT "VisitIssue_visitId_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToVisit" DROP CONSTRAINT "_IssueToVisit_A_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToVisit" DROP CONSTRAINT "_IssueToVisit_B_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "VisitIssue" JSONB NOT NULL;

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "VisitIssue";

-- DropTable
DROP TABLE "_IssueToVisit";

-- DropEnum
DROP TYPE "IssueStatus";
