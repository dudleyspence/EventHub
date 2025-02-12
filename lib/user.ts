import { db } from "@/lib/db";

// in the model view controller
// this is the model
// direct interaction with the database

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      select: { email: true, name: true, id: true, role: true, password: true },
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      select: { email: true, name: true, id: true, role: true, password: true },
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
}
