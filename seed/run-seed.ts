import { db } from "@/lib/db";
import { clearDatabase, seed } from "@/seed/seed";
import * as dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";
dotenv.config({ path: envFile });

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
