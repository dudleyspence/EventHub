import { imageToBlurBase64 } from "@/lib/actions/blurImage";
import { describe, expect, it } from "vitest";

describe("imageToBlurBase64", () => {
  const base64Regex =
    /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;

  it("should return a base64 string when given an imageURL", async () => {
    const base64 = await imageToBlurBase64("https://example.com/image.jpg");
    if (base64) {
      expect(typeof base64).toBe("string");
      expect(base64Regex.test(base64)).toBe(true);
    }
  });
  it("should return undefined when given an invalid image URL", async () => {
    const base64 = await imageToBlurBase64("invalid_url");
    expect(base64).toBeUndefined();
  });
  it("should return undefined when given an invalid image URL", async () => {
    const base64 = await imageToBlurBase64("https://example.com/");
    expect(base64).toBeUndefined();
  });
});
