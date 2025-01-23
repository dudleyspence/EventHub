import { clearDatabase, seed } from "@/seed/seed";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";
dotenv.config({ path: envFile });

const db = new PrismaClient();

clearDatabase()
  .then(async () => {
    console.log("Database cleared.");
    // Seeding the database
    await seed();
  })
  .then(async () => {
    console.log("Database seeding completed.");
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await db.$disconnect();
    process.exit(1);
  });

// seed().then(async () => {
//   console.log("Database seeding completed.");
//   await db.$disconnect();
//   process.exit(0);
// });
