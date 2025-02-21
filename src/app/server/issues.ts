"use server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../config/auth-options";
import { DateRange } from "react-day-picker";

// Get all issues
export async function getAllIssues() {
  try {
    const response = await prisma.issue.findMany();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting issues");
  }
}

export async function getAllVisitIssues(
  selectedDateRange: DateRange | undefined
) {
  const params = selectedDateRange
    ? {
        startDate: selectedDateRange.from
          ? selectedDateRange.from.toISOString().split("T")[0]
          : undefined,
        endDate: selectedDateRange.to
          ? selectedDateRange.to.toISOString().split("T")[0]
          : undefined,
      }
    : {};
  try {
    const session = await getAuthSession();
    console.log(
      "slected date in the server action................................",
      params
    );

    const visits = await prisma.visit.findMany({
      where: {
        scheduledById: session?.user.id,
        status: "COMPLETED",
      },
      orderBy: {
        checkInDate: "desc",
      },
      include: {
        partner: true,
        coordinator: true,
      },
    });

    // Flatten the visit issues into the desired format
    const visitIssues = visits.flatMap((visit) => {
      // Parse the VisitIssue JSON field (if it exists)
      const issues =
        typeof visit.VisitIssue === "string"
          ? JSON.parse(visit.VisitIssue)
          : [];

      // Map each issue to the desired format
      return issues.map(
        (issue: { issueId: string; description: string; status: string }) => ({
          visitId: visit.id,
          issueId: issue.issueId,
          partner: visit.partner.name,
          issue: issue.description,
          createdDate: visit.createdAt,
          createdBy: visit.coordinator.name,
          status: issue.status,
        })
      );
    });

    return visitIssues;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting visit issues");
  }
}

////////// update issue status
export async function updateIssueStatus({
  issueId,
  status,
  visitId,
}: {
  issueId: string;
  status: "SOLVED" | "NOT_SOLVED";
  visitId: string;
}) {
  try {
    const visit = await prisma.visit.findUnique({
      where: { id: visitId },
    });

    if (!visit) {
      throw new Error(`Visit with ID ${visitId} not found`);
    }

    const issues =
      typeof visit.VisitIssue === "string" ? JSON.parse(visit.VisitIssue) : [];

    const issueIndex = issues.findIndex(
      (issue: { issueId: string }) => issue.issueId === issueId
    );

    if (issueIndex === -1) {
      throw new Error(`Issue with ID ${issueId} not found in visit ${visitId}`);
    }

    issues[issueIndex].status = status;

    const updatedVisitIssue = JSON.stringify(issues);

    const updatedVisit = await prisma.visit.update({
      where: { id: visitId },
      data: { VisitIssue: updatedVisitIssue },
    });

    return updatedVisit;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating visit issue");
  }
}
