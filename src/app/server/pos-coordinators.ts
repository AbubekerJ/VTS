"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../config/auth-options";

export async function getVisitorUnderThisManager() {
  const session = await getAuthSession();

  const UserId = session?.user.id;
  try {
    if (!UserId) {
      throw new Error("User is not authenticated");
    }

    const manager = await prisma.user.findUnique({
      where: {
        id: UserId,
        role: "IDC_MANAGER",
      },
    });

    if (!manager) {
      throw new Error("IDC Manager not found");
    }

    // Get the count of visits for each coordinator
    const response = await prisma.user.findMany({
      where: {
        role: "POS_COORDINATOR",
        managerId: manager.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            visitsAsCoordinator: {
              where: {
                status: "COMPLETED",
              },
            },
          },
        },
      },
    });

    const formattedResponse = response.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      visitsCount: user._count.visitsAsCoordinator,
    }));

    return formattedResponse;
  } catch (error) {
    console.error("Error getting visitors:", error);
    throw new Error("Failed to get visitors");
  }
}
