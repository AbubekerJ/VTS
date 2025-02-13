/*
  Warnings:

  - Made the column `visitDate` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "visitDate" SET NOT NULL;
