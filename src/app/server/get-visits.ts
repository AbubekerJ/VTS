"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth-options";
import { VisitStatus } from "@prisma/client";
export async function getPosCoordinatorVisits() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
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
      date: new Date(visit.visitDate).toLocaleString(),
      status: visit.status,
      location: visit.partner.name,
      latitude: visit.partner.latitude,
      longitude: visit.partner.longitude,
    }));
  } catch (error) {
    console.log(error);
  }
}

export async function updateVisitStatus({
  id,
  status,
}: {
  id: string;
  status: VisitStatus;
}) {
  try {
    const response = prisma.visit.update({
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
