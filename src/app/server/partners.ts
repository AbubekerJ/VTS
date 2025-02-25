"use server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../../config/auth-options";

export async function getAllPartners() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }
  try {
    const response = await prisma.partner.findMany({
      where: {
        managerId: session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw new Error("Failed to fetch partners");
  }
}
