"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../../config/auth-options";
// import bcrypt from "bcryptjs";
import { DateRange } from "react-day-picker";
import { getDateFilters } from "@/utils/dateFilter";

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

//get visitor for the select
export async function getVisitorForTheSelect() {
  const session = await getAuthSession();

  const UserId = session?.user.id;
  try {
    if (!UserId) {
      throw new Error("User is not authenticated");
    }

    // Fetch the IDC manager
    const manager = await prisma.user.findUnique({
      where: {
        id: UserId,
        role: "IDC_MANAGER",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!manager) {
      throw new Error("IDC Manager not found");
    }

    // Get the count of visits for each coordinator under this manager
    const coordinators = await prisma.user.findMany({
      where: {
        role: "POS_COORDINATOR",
        managerId: manager.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Format the manager and coordinators into a single array
    const formattedResponse = [
      {
        id: manager.id,
        name: manager.name,
        email: manager.email,
      },
      ...coordinators.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    ];

    return formattedResponse;
  } catch (error) {
    console.error("Error fetching visitors under this manager:", error);
    throw error;
  }
}

//////////////////// create visitor
export async function createVisitor(values: {
  name: string;
  email: string;
  // password: string;
}) {
  const session = await getAuthSession();

  const managerId = session?.user.id;
  // const Password = values.password;

  // const hashedPassword = await bcrypt.hash(Password, 10);
  try {
    if (!managerId) {
      throw new Error("User is not authenticated");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
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
        ...values,
        // password: hashedPassword,
        role: "POS_COORDINATOR",
        managerId: managerId,
      },
    });

    return { success: true, message: "user created successfully" };
  } catch (error) {
    console.error("Error creating visitor:", error);
    return { success: false, message: "Failed to create visitor" };
  }
}

///Dashboard

export async function getTop5VisitorsWithMostVisits(
  selectedDateRange: DateRange | undefined
) {
  const session = await getAuthSession();
  const dateFilters = getDateFilters(selectedDateRange);

  if (!session?.user?.id) {
    throw new Error(
      "Unauthorized: User must be logged in to schedule a visit."
    );
  }

  const isDirector = session.user.role === "DIRECTOR";

  try {
    const coordinators = await prisma.user.findMany({
      where: {
        ...(!isDirector && { managerId: session.user.id }),
      },
      select: {
        id: true,
      },
    });

    const coordinatorIds = coordinators.map((coordinator) => coordinator.id);

    const visitors = await prisma.visit.groupBy({
      by: ["coordinatorId"],
      where: {
        coordinatorId: {
          in: coordinatorIds,
        },
        ...(dateFilters && dateFilters),
      },
      _count: {
        coordinatorId: true,
      },
      orderBy: {
        _count: {
          coordinatorId: "desc",
        },
      },
      take: 5,
    });

    // Step 4: Fetch visitor details
    const visitorDetails = await Promise.all(
      visitors.map(async (visitor) => {
        const coordinator = await prisma.user.findUnique({
          where: {
            id: visitor.coordinatorId,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        return {
          coordinator,
          visitCount: visitor._count.coordinatorId,
        };
      })
    );

    return visitorDetails;
  } catch (error) {
    console.error("Error getting visitor information:", error);
    throw new Error("Failed getting visitor information");
  }
}
