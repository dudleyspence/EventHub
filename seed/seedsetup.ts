import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateUsers } from "./users";

function testSeed() {
  const UserData = Array.from({ length: 10 }, (_, i) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    password: faker.internet.password(),
    role: UserRole.USER as UserRole,
  }));

  const seedAdmin = {
    email: "admin@admin.com",
    name: "ADMIN USER",
    image: faker.image.avatar(),
    password: "Password1!",
    role: UserRole.ADMIN,
  };

  UserData.push(seedAdmin);

  return UserData;
}

console.log(generateUsers());
