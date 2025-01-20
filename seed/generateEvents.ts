import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

export function generateEvents(admin_id: string) {
  const EventsData = Array.from({ length: 40 }, (_, i) => ({
    title: `Test Event ${i + 1}`,
    description: faker.lorem.sentences(2),
    maxCapacity: faker.number.int({ min: 10, max: 100 }),
    totalAttendees: 0,
    image: faker.image.urlLoremFlickr({ category: "nightlife" }),
    date: faker.date.future(),
    userId: admin_id,
  }));

  return EventsData;
}
