"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

export async function createManager(value: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(value.password, 10);
    await prisma.user.create({
      data: {
        ...value,
        password: hashedPassword,
        role: "IDC_MANAGER",
      },
    });
  } catch (error) {
    console.error("Error creating idc managers:", error);
    throw new Error("Failed to create idc managers: ");
  }
}
