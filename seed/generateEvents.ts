import { getEventPhotos } from "@/lib/eventPhotos";
import { faker } from "@faker-js/faker";

export async function generateEvents(admin_id: string, n: number) {
  const images = await getEventPhotos(n);

  const EventsData = Array.from({ length: n }, (_, i) => ({
    title: `Test Event ${i + 1}`,
    description: faker.lorem.sentences(2),
    maxCapacity: faker.number.int({ min: 10, max: 100 }),
    totalAttendees: 0,
    image: images[i] || faker.image.urlLoremFlickr({ category: "nightlife" }),
    date: faker.date.future(),
    userId: admin_id,
  }));

  return EventsData;
}
