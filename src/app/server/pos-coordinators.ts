"use server";

import { prisma } from "@/lib/prisma";

import { getAuthSession } from "../config/auth-options";

export async function getVisitorUnderThisManager() {
  const session = await getAuthSession();

  const UserId = session?.user.id;
  try {
    if (!UserId) {
      throw new Error("user is not authenticated");
    }

    const manager = await prisma.user.findUnique({
      where: {
        id: UserId,
        role: "IDC_MANAGER",
      },
    });

    if (!manager) {
      throw new Error("idc-manager not found");
    }
    const response = await prisma.user.findMany({
      where: {
        role: "POS_COORDINATOR",
        managerId: manager.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting visitors:", error);
    throw new Error("Failed to get  visitors");
  }
}
