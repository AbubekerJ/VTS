"use server";
import { prisma } from "@/lib/prisma";

export async function getAllIssues() {
  try {
    const response = await prisma.issue.findMany();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("error getting issues");
  }
}
