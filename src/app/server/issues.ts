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

import { getDateFilters } from "@/utils/dateFilter";
import { Prisma } from "@prisma/client";

///get all visit
export async function getAllVisitIssues(
  selectedDateRange: DateRange | undefined
) {
  const dateFilters = getDateFilters(selectedDateRange);
  try {
    const session = await getAuthSession();

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

      if (issues.length === 0) {
        return {
          visitId: visit.id,
          visitLog: visit.notes,
          issueId: null,
          partner: visit.partner.name,
          issue: "No issues found",
          createdDate: visit.createdAt,
          createdBy: visit.coordinator.name,
          status: "No issues found",
        };
      }

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

// Dashboard
/////////////////////////

//Not solved issuesCount

export async function getNotSolvedIssueCount(
  selectedDateRange: DateRange | undefined
) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }
  const dateFilters = getDateFilters(selectedDateRange);

  try {
    const visits = await prisma.visit.findMany({
      where: {
        scheduledById: session.user.id,
        ...(dateFilters && dateFilters),
      },
      select: {
        VisitIssue: true,
      },
    });

    let notSolvedCount = 0;

    visits.forEach((visit) => {
      if (visit.VisitIssue) {
        try {
          const issues =
            typeof visit.VisitIssue === "string"
              ? JSON.parse(visit.VisitIssue)
              : [];
          if (Array.isArray(issues)) {
            issues.forEach((issue) => {
              if (issue.status === "NOT_SOLVED") {
                notSolvedCount++;
              }
            });
          }
        } catch (error) {
          console.error("Error parsing VisitIssue JSON:", error);
        }
      }
    });

    return notSolvedCount;
  } catch (error) {
    console.error("Error fetching visits:", error);
    throw new Error("Failed to fetch visits: ");
  }
}

export async function getAllVisitIssuesCount(
  selectedDateRange: DateRange | undefined
) {
  type issueProps = {
    issueId: string;
    description: string;
    status: string;
  };
  const session = await getAuthSession();
  const dateFilters = getDateFilters(selectedDateRange);
  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }

  try {
    const Visits = await prisma.visit.findMany({
      where: {
        scheduledById: session.user.id,
        VisitIssue: {
          not: Prisma.JsonNull,
        },
        ...(dateFilters && dateFilters),
      },
      select: {
        VisitIssue: true,
      },
    });

    // Aggregate issue occurrences
    const issueCounts: { [key: string]: number } = {};

    Visits.forEach((visit) => {
      const issues =
        typeof visit.VisitIssue === "string"
          ? JSON.parse(visit.VisitIssue)
          : [];
      issues.forEach((issue: issueProps) => {
        const key = issue.description;
        if (issueCounts[key]) {
          issueCounts[key]++;
        } else {
          issueCounts[key] = 1;
        }
      });
    });
    const issueArray = Object.entries(issueCounts).map(
      ([issueName, count]) => ({
        issueName,
        count,
      })
    );
    return issueArray;
  } catch (error) {
    console.error("Error fetching all issues:", error);
    throw new Error("Failed to fetch issues: ");
  }
}
