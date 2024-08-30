import { getPhotoSizeType } from "./GridView.utils";
import { PHOTO_SIZE_TYPE } from "./GridView.utils";

describe("getPhotoSizeType", () => {
  test("returns WIDE for wide photos", () => {
    const result = getPhotoSizeType(1500, 800);
    expect(result).toBe(PHOTO_SIZE_TYPE.WIDE);
  });

  test("returns TALL for tall photos", () => {
    const result = getPhotoSizeType(500, 1000);
    expect(result).toBe(PHOTO_SIZE_TYPE.TALL);
  });

  test("returns BIG for large photos", () => {
    const result = getPhotoSizeType(2000, 2000);
    expect(result).toBe(PHOTO_SIZE_TYPE.BIG);
  });

  test("returns SMALL for photos that do not meet other criteria", () => {
    const result = getPhotoSizeType(800, 800);
    expect(result).toBe(PHOTO_SIZE_TYPE.SMALL);
  });

  test("prioritizes WIDE over BIG when width/height ratio is high", () => {
    const result = getPhotoSizeType(1800, 1000);
    expect(result).toBe(PHOTO_SIZE_TYPE.WIDE);
  });

  test("prioritizes TALL over BIG when width/height ratio is low", () => {
    const result = getPhotoSizeType(1000, 1800);
    expect(result).toBe(PHOTO_SIZE_TYPE.TALL);
  });
});
