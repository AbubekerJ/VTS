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
        latitude: true,
        longitude: true,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw new Error("Failed to fetch partners");
  }
}

///create partner

export async function createPartner(values: {
  name: string;
  latitude: string;
  longitude: string;
}) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }
  const changedLat = Number(values.latitude);
  const changedLongitude = Number(values.longitude);
  try {
    const response = await prisma.partner.create({
      data: {
        name: values.name,
        latitude: changedLat,
        longitude: changedLongitude,
        managerId: session.user.id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating partners:", error);
    throw new Error("Failed to create partners");
  }
}
