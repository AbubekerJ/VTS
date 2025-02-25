"use server";
import { prisma } from "@/lib/prisma";

export async function getIdcManagers() {
  try {
    const response = await prisma.user.findMany({
      where: {
        role: "IDC_MANAGER",
      },
      select: {
        name: true,
        email: true,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching idc managers:", error);
    throw new Error("Failed to fetch idc managers: ");
  }
}
