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

//het completed visits
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
        visitDate: true,
        status: true,
        partner: {
          select: {
            name: true,
          },
        },
      },
    });
    return response.map((visit) => ({
      id: visit.id,
      date: new Date(visit.visitDate).toLocaleString(),
      status: visit.status,
      location: visit.partner.name,
    }));
  } catch (error) {
    console.error("Error getting visit:", error);
    throw new Error("Failed to get completed visit");
  }
}
