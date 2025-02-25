import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash passwords for users
  const hashedPassword1 = await bcrypt.hash("admin123", 10);
  const hashedPassword2 = await bcrypt.hash("director123", 10);
  const hashedPassword3 = await bcrypt.hash("manager123", 10);
  const hashedPassword4 = await bcrypt.hash("coordinator123", 10);

  // Upsert users (create if not exist or do nothing if already exist)
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword1,
      role: "ADMIN",
    },
  });

  const director = await prisma.user.upsert({
    where: { email: "director@gmail.com" },
    update: {},
    create: {
      name: "Director User",
      email: "director@gmail.com",
      password: hashedPassword2,
      role: "DIRECTOR",
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@gmail.com" },
    update: {},
    create: {
      name: "IDC Manager",
      email: "manager@gmail.com",
      password: hashedPassword3,
      role: "IDC_MANAGER",
      managerId: admin.id, // Reference admin as managerId
    },
  });

  const coordinator = await prisma.user.upsert({
    where: { email: "coordinator@gmail.com" },
    update: {},
    create: {
      name: "POS Coordinator",
      email: "coordinator@gmail.com",
      password: hashedPassword4,
      role: "POS_COORDINATOR",
      managerId: manager.id, // Reference manager as managerId
    },
  });

  console.log(admin, director, manager, coordinator, "✅ Users seeded!");

  // Check if the predefined issues exist, if not, create them
  await prisma.issue.createMany({
    data: [
      { description: "Damaged product received" },
      { description: "Item not found in stock" },
      { description: "Broken or malfunctioning store equipment" },
    ],
  });

  // Fetch users
  const coordinatorUser = await prisma.user.findUnique({
    where: { email: "coordinator@gmail.com" },
  });
  const schedulerUser = await prisma.user.findUnique({
    where: { email: "manager@gmail.com" },
  });

  if (!coordinatorUser || !schedulerUser) {
    throw new Error(
      "❌ Coordinator or scheduler not found. Make sure users are seeded first."
    );
  }

  // Check if the partners exist, if not, create them
  let partner1 = await prisma.partner.findFirst({
    where: { name: "Bole retail" },
  });

  if (!partner1) {
    partner1 = await prisma.partner.create({
      data: {
        name: "Bole retail",
        latitude: 40.7128,
        longitude: -74.006,
        contact: "partner@tech.com",
        managerId: manager.id, // Assign managerId
      },
    });
  }

  let partner2 = await prisma.partner.findFirst({
    where: { name: "Legehar retail" },
  });

  if (!partner2) {
    partner2 = await prisma.partner.create({
      data: {
        name: "Legehar retail",
        latitude: 34.0522,
        longitude: -118.2437,
        contact: "contact@greeninnovations.com",
        managerId: manager.id, // Assign managerId
      },
    });
  }

  let partner3 = await prisma.partner.findFirst({
    where: { name: "Mexico retail" },
  });

  if (!partner3) {
    partner3 = await prisma.partner.create({
      data: {
        name: "Mexico retail",
        latitude: 51.5074,
        longitude: -0.1278,
        contact: "contact@oceansys.com",
        managerId: manager.id, // Assign managerId
      },
    });
  }

  console.log(partner1, partner2, partner3, "✅ Partners seeded!");

  // Seed visits without issues (no issues assigned here)
  const visits = await prisma.visit.createMany({
    data: [
      {
        coordinatorId: coordinator.id,
        scheduledById: schedulerUser.id,
        partnerId: partner1.id,
        visitDate: new Date(),
        status: "SCHEDULED",
        notes: "Routine checkup",
        VisitIssue: JSON.stringify([]), // Initialize with empty array for issues
      },
      {
        coordinatorId: coordinator.id,
        scheduledById: schedulerUser.id,
        partnerId: partner2.id,
        visitDate: new Date(),
        status: "IN_PROGRESS",
        checkInDate: new Date(),
        notes: "Verifying product quality",
        VisitIssue: JSON.stringify([]), // Initialize with empty array for issues
      },
      {
        coordinatorId: coordinator.id,
        scheduledById: schedulerUser.id,
        partnerId: partner3.id,
        visitDate: new Date(),
        status: "COMPLETED",
        checkInDate: new Date(),
        checkOutDate: new Date(),
        notes: "Inspection completed successfully",
        VisitIssue: JSON.stringify([]), // Initialize with empty array for issues
      },
      {
        coordinatorId: coordinator.id,
        scheduledById: schedulerUser.id,
        partnerId: partner1.id,
        visitDate: new Date(),
        status: "CANCELLED",
        notes: "Visit cancelled due to scheduling conflicts",
        VisitIssue: JSON.stringify([]), // Initialize with empty array for issues
      },
    ],
  });

  console.log(visits, "✅ Visits seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
