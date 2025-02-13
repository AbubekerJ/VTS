"use server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../config/auth-options";

export async function getAllIssues() {
  try {
    const response = await prisma.issue.findMany();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("error getting issues");
  }
}

export async function getAllVisitIssues() {
  try {
    const session = await getAuthSession();

    const response = await prisma.visit.findMany({
      where: {
        scheduledById: session?.user.id,
        status: "COMPLETED",
        issues: {
          some: {
            status: "NOT_SOLVED",
          },
        },
      },
      orderBy: {
        checkInDate: "desc",
      },
      include: {
        issues: {
          select: {
            id: true,
            description: true,
          },
        },
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

    return response.flatMap((visit) =>
      visit.issues.map((issue) => ({
        visitId: visit.id,
        issueId: issue.id,
        partner: visit.partner.name,
        issue: issue.description,
        createdDate: visit.checkOutDate?.toISOString(),
        createdBy: visit.coordinator.name,
      }))
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting visit issues");
  }
}
