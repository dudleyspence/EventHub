import { createClient } from "pexels";

const client = createClient(
  "n5pPe0P5YL7oUDVtL3m6v9eB5c7QFmI3V3fn3DU3xDySAFi3y5d7CSDD"
);
const query = "Events";

export async function getEventPhotos(n: number) {
  const results = await client.photos.search({ query, per_page: n });

  if ("photos" in results) {
    const photoURLs = results.photos.map((photo) => photo.src.large);
    return photoURLs;
  } else {
    console.error("Error fetching photos:", results);
    return [];
  }
}
