import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

export function generateUsers(n: number) {
  const UsersData = Array.from({ length: n }, (_, i) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    password: faker.internet.password(),
    role: UserRole.USER as UserRole,
  }));

  return UsersData;
}
