enum PHOTO_SIZE {
  WIDE = "wide",
  TALL = "tall",
  BIG = "big",
  SMALL = "small",
}

export const getPhotoClass = (width: number, height: number): PHOTO_SIZE => {
  const aspectRatio = width / height;

  if (aspectRatio > 1.5) {
    return PHOTO_SIZE.WIDE;
  } else if (aspectRatio < 0.67) {
    return PHOTO_SIZE.TALL;
  } else if (width > 1200 && height > 1200) {
    return PHOTO_SIZE.BIG;
  }

  return PHOTO_SIZE.SMALL;
};
