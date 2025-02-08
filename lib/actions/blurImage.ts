"use server";
import { getPlaiceholder } from "plaiceholder";

export async function imageToBlurBase64(originalUrl: string) {
  try {
    const buffer = await fetch(originalUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    console.error(err);
  }
}
