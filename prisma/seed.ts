import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword1 = await bcrypt.hash("admin123", 10);
  const hashedPassword2 = await bcrypt.hash("director123", 10);
  const hashedPassword3 = await bcrypt.hash("manager123", 10);
  const hashedPassword4 = await bcrypt.hash("coordinator123", 10);

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
      managerId: admin.id,
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
      managerId: manager.id,
    },
  });

  console.log(coordinator, director, "✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
