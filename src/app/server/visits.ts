"use server";

import { prisma } from "@/lib/prisma";

import { getAuthSession } from "../config/auth-options";
import { VisitStatus } from "@prisma/client";
export async function getPosCoordinatorVisits() {
  const session = await getAuthSession();

  try {
    const posCoordinatorVisits = await prisma.visit.findMany({
      where: {
        coordinatorId: session?.user.id,
        status: {
          in: [VisitStatus.SCHEDULED, VisitStatus.IN_PROGRESS],
        },
      },
      select: {
        id: true,
        visitDate: true,
        status: true,
        partner: {
          select: {
            name: true,
            latitude: true,
            longitude: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posCoordinatorVisits.map((visit) => ({
      id: visit.id,
      date: new Date(visit.visitDate).toISOString(),
      status: visit.status,
      location: visit.partner.name,
      latitude: visit.partner.latitude,
      longitude: visit.partner.longitude,
    }));
  } catch (error) {
    console.log(error);
  }
}

///submit visit logs
export async function submitVisitLogs({
  id,
  status,
  issues,
  checkOutdate,
  checkIndate,
  notes,
}: {
  id: string;
  status: VisitStatus;
  issues: { id: string }[];
  checkOutdate: string;
  checkIndate: string;
  notes: string;
}) {
  try {
    const response = await prisma.visit.update({
      where: {
        id,
      },
      data: {
        status,
        issues: {
          connect: issues.map((issue) => ({
            id: issue.id,
          })),
        },
        checkOutDate: new Date(checkOutdate).toISOString(),
        checkInDate: new Date(checkIndate).toISOString(),
        notes,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating visit:", error);
    throw new Error("Failed to update visit status");
  }
}

///update status
export async function updateVisitStatus({
  id,
  status,
}: {
  id: string;
  status: VisitStatus;
}) {
  try {
    const response = await prisma.visit.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating visit:", error);
    throw new Error("Failed to update visit status");
  }
}

//get completed visits
export async function getCompletedVisits() {
  const session = await getAuthSession();

  try {
    const response = await prisma.visit.findMany({
      where: {
        coordinatorId: session?.user.id,
        status: {
          in: [VisitStatus.COMPLETED],
        },
      },
      select: {
        id: true,
        status: true,
        checkOutDate: true,
        partner: {
          select: {
            name: true,
          },
        },
        issues: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return response.map((visit) => {
      const notSolvedIssues = visit.issues.filter(
        (issue) => issue.status === "NOT_SOLVED"
      ).length;

      return {
        id: visit.id,

        completedDate: visit.checkOutDate
          ? new Date(visit.checkOutDate).toLocaleString()
          : null,
        issues: notSolvedIssues || 0,
        location: visit.partner.name,
      };
    });
  } catch (error) {
    console.error("Error getting visit:", error);
    throw new Error("Failed to get completed visit");
  }
}

//get scheduled visit
export async function getScheduledVisit() {
  const session = await getAuthSession();
  console.log("sssssssssssssssssssssssssssssssssss", session?.user.id);
  try {
    const posCoordinatorVisits = await prisma.visit.findMany({
      where: {
        scheduledById: session?.user.id,
        status: {
          in: [VisitStatus.SCHEDULED, VisitStatus.IN_PROGRESS],
        },
      },
      select: {
        id: true,
        visitDate: true,
        status: true,
        partner: {
          select: {
            name: true,
          },
        },
        coordinator: {
          select: {
            name: true,
          },
        },
      },
    });

    return posCoordinatorVisits.map((visit) => ({
      id: visit.id,
      date: new Date(visit.visitDate).toISOString(),
      status: visit.status,
      location: visit.partner.name,
      AssignedVisitor: visit.coordinator.name,
    }));
  } catch (error) {
    console.log(error);
  }
}

////reschedule visit

export async function rescheduleVisit({
  id,
  rescheduleDate,
}: {
  id: string;
  rescheduleDate: string;
}) {
  try {
    const response = await prisma.visit.update({
      where: {
        id,
      },
      data: {
        visitDate: new Date(rescheduleDate).toISOString(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

//schedule visit
export async function scheduleVisit({
  date,
  partner,
  visitor,
}: {
  date: string;
  partner: string;
  visitor: string;
}) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }

  if (!date || !partner || !visitor) {
    throw new Error("Missing required fields.");
  }

  try {
    const response = await prisma.visit.create({
      data: {
        visitDate: date,
        scheduledById: session.user.id,
        partnerId: partner,
        coordinatorId: visitor,
        status: "SCHEDULED",
      },
    });
    return response;
  } catch (error) {
    console.error("Schedule visit error:", error);
    throw new Error("Failed to schedule visit: ");
  }
}
