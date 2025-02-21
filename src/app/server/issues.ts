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

import { endOfDay } from "date-fns";

export async function getAllVisitIssues(
  selectedDateRange: DateRange | undefined
) {
  let startDate: string | undefined;
  let endDate: string | undefined;

  if (selectedDateRange?.from) {
    startDate = selectedDateRange.from.toISOString();
    endDate = selectedDateRange.to
      ? selectedDateRange.to.toISOString()
      : endOfDay(selectedDateRange.from).toISOString();
  }

  const dateFilters = startDate
    ? {
        checkInDate: {
          gte: startDate,
          lte: endDate,
        },
      }
    : {};
  try {
    const session = await getAuthSession();
    console.log("Selected date range in the server action:", {
      startDate,
      endDate,
    });

    const visits = await prisma.visit.findMany({
      where: {
        scheduledById: session?.user.id,
        status: "COMPLETED",
        ...(dateFilters && dateFilters),
      },
      orderBy: {
        checkInDate: "desc",
      },
      include: {
        partner: true,
        coordinator: true,
      },
    });

    const visitIssues = visits.flatMap((visit) => {
      const issues =
        typeof visit.VisitIssue === "string"
          ? JSON.parse(visit.VisitIssue)
          : [];

      return issues.map(
        (issue: { issueId: string; description: string; status: string }) => ({
          visitId: visit.id,
          visitLog: visit.notes,
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
    // Check if the error is an instance of Error before logging
    if (error instanceof Error) {
      console.error("Error getting visit issues:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
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
