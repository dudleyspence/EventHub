import { faker } from "@faker-js/faker";

const popular_events = [
  {
    id: "popular_id_1",
    title: `Billie Eilish Live`,
    image:
      "https://cdn.britannica.com/03/214803-050-6809BA1C/American-singer-songwriter-Billie-Eilish-2020.jpg",
    category: "Live Music",
  },
  {
    id: "popular_id_2",
    title: `Oktoberfest 2025`,
    image:
      "https://media.istockphoto.com/id/639916882/fr/photo/oktoberfest-de-munich-en-allemagne.jpg?s=612x612&w=0&k=20&c=n1gHnq7Z5Ui2RRVblIpyz6WNBKqCkYzSjC8RKJj0SLw=",
    category: "Food and Drink",
  },
];

const coming_soon = [
  {
    title: "Chris Rock: Laugh & Times",
    image:
      "https://www.indiewire.com/wp-content/uploads/2023/03/20230217-DSC04093.jpg",
    category: "Comedy",
  },
  {
    title: "Van Gogh Immersive Experience",
    image:
      "https://fox5sandiego.com/wp-content/uploads/sites/15/2023/11/BVG-Press-Photos-01-e1701239280551.jpg?w=2560&h=1440&crop=1",
    category: "Art",
  },
  {
    title: "Champions Cup 2025",
    image: "https://wallpapercave.com/wp/wp11954239.jpg",
    category: "Sports",
  },
  {
    title: "Tech Innovations Expo",
    image:
      "https://images.squarespace-cdn.com/content/v1/607995b27614550acae1a279/5ed912ae-249b-4a67-83bd-ef6dc33ef536/register-free-expo-pass.jpg",
    category: "Technology",
  },
  {
    title: "Future of Education Summit",
    image:
      "https://images.squarespace-cdn.com/content/v1/65b900c839ea5359386d7897/7ae89089-e011-4c53-8bfe-455597e630de/Summit-Banner-Talking.jpg",
    category: "Education",
  },

  {
    title: "Sunrise Yoga Fest",
    image:
      "https://lajollaplayhouse.org/wowfestival2023/wp-content/uploads/Sunset-Yoga-1920x1080-1.jpg",
    category: "Health and Wellness",
  },
  {
    title: "Paris Fashion Week",
    image:
      "https://media.gqmagazine.fr/photos/6634c3a5306351fc885f6753/16:9/w_2560%2Cc_limit/GettyImages-1259007630.jpg",
    category: "Fashion",
  },
  {
    title: "Coachella Weekend",
    image:
      "https://wallpapercat.com/w/full/9/4/d/992848-1920x1080-desktop-full-hd-coachella-2022-background-photo.jpg",
    category: "Music Festival",
  },
  {
    title: "Design Thinking Workshop",
    image:
      "https://plus.unsplash.com/premium_photo-1664475926084-d20248544896?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzaWduJTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    category: "Workshop",
  },
  {
    title: "Shakespeare in the Park",
    image:
      "https://frontmezzjunkies.com/wp-content/uploads/2022/08/lg_ayli_hero1600x900_4_photobydahliakatz_shawn_desouza-coelho_paolo_santalucia.png",
    category: "Theater",
  },
  {
    title: "Street Dance Showdown",
    image:
      "https://wallpapercat.com/w/full/4/f/f/1159945-1920x1200-desktop-hd-street-dance-wallpaper-photo.jpg",
    category: "Dance",
  },
];

export default function generateLandingPageEvents(admin_id: string) {
  const popularEvents = popular_events.map((event) => ({
    id: event.id,
    title: event.title,
    description: faker.lorem.paragraphs(8),
    maxCapacity: 800,
    totalAttendees: 0,
    image: event.image,
    date: faker.date.future(),
    userId: admin_id,
    category: event.category,
  }));

  const comingSoon = coming_soon.map((event) => ({
    title: event.title,
    description: faker.lorem.paragraphs(8),
    maxCapacity: 800,
    totalAttendees: 0,
    image: event.image,
    date: faker.date.soon(),
    userId: admin_id,
    category: event.category,
  }));

  return { popularEvents, comingSoon };
}
