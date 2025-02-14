"use server";
import { prisma } from "@/lib/prisma";

export async function getAllPartners() {
  try {
    const response = await prisma.partner.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log("partners................", response);
    return response;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw new Error("Failed to fetch partners");
  }
}
