import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

export function generateEventAttendees() {
  const EventAttendees = Array.from({ length: 10 }, (_, i) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    password: faker.internet.password(),
    role: UserRole.USER as UserRole,
  }));

  return UserData;
}
