-- CreateTable
CREATE TABLE "VisitIssue" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "VisitIssue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisitIssue" ADD CONSTRAINT "VisitIssue_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitIssue" ADD CONSTRAINT "VisitIssue_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
