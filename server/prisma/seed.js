import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Since we are in ESM, we can't easily import JSX/JS files from parent directory without complex tools.
// I will manually extract some data or write a script that converts the JSX data to JSON.
// For now, I'll define a few packages and instructions to the user.

const prisma = new PrismaClient();

async function main() {
  // Create Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });
  console.log("Admin created:", admin.username);

  // We will need to pull the data from the frontend files.
  // I'll define a simple structure here and the user can run the migration script I'll provide.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
