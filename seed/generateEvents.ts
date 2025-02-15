import { getEventPhotos } from "@/seed/eventPhotos";
import { faker } from "@faker-js/faker";
import generateLandingPageEvents from "./generateLandingPageEvents";

export async function generateEvents(
  admin_id: string,
  allCategories: string[],
  n: number
) {
  const images = await getEventPhotos(n);

  const EventsData = Array.from({ length: n }, (_, i) => ({
    title: `Test Event ${i + 1}`,
    description: faker.lorem.paragraphs(8),
    maxCapacity: faker.number.int({ min: 10, max: 100 }),
    totalAttendees: 0,
    image: images[i] || faker.image.urlLoremFlickr({ category: "nightlife" }),
    date: faker.date.future(),
    userId: admin_id,
    category: faker.helpers.arrayElement(allCategories),
  }));

  const eventForTesting = {
    id: "test_id",
    title: `New Years Celebrarions`,
    description:
      "Join us for an unforgettable New Year's celebration to ring in the coming year with joy, laughter, and great company! The evening will feature live music, dazzling performances, and a countdown to midnight that will light up the night. Enjoy delicious food and drinks, capture memories at our photo booth, and soak in the festive atmosphere. Whether you’re dancing the night away or sharing resolutions with loved ones, this event promises a magical start to the new year. Let’s toast to new beginnings and make it a night to remember!",
    maxCapacity: 800,
    totalAttendees: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiCC_XChL0O400c2K1RSl89u2XoSZ5m-ysw&s",
    date: new Date("2025-04-16 17:28:14.467"),
    userId: admin_id,
    category: "Community",
  };

  const { popularEvents, comingSoon } = generateLandingPageEvents(admin_id);

  EventsData.push(eventForTesting, ...popularEvents, ...comingSoon);

  return EventsData;
}
