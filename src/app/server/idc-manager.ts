"use server";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

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
  // password: string;
}) {
  try {
    // const hashedPassword = await bcrypt.hash(value.password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: value.email,
      },
    });

    if (existingUser) {
      console.log("fail response from backend ...........................", {
        success: false,
        message: "User with this email already exists",
      });

      return { success: false, message: "User with this email already exists" };
    }
    await prisma.user.create({
      data: {
        ...value,
        // password: hashedPassword,
        role: "IDC_MANAGER",
      },
    });
    return { success: true, message: "user created successfully" };
  } catch (error) {
    console.error("Error creating idc managers:", error);
    return { success: false, message: "Failed to create idc managers: " };
  }
}
