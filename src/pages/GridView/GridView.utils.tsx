import { UnsplashPhoto } from "../../api/unsplash";

export enum PHOTO_SIZE_TYPE {
  WIDE = "wide",
  TALL = "tall",
  BIG = "big",
  SMALL = "small",
}

export const getPhotoSizeType = (
  width: number,
  height: number
): PHOTO_SIZE_TYPE => {
  const aspectRatio = width / height;

  if (aspectRatio > 1.5) {
    return PHOTO_SIZE_TYPE.WIDE;
  } else if (aspectRatio < 0.67) {
    return PHOTO_SIZE_TYPE.TALL;
  } else if (width > 3500 && height > 3500) {
    return PHOTO_SIZE_TYPE.BIG;
  }

  return PHOTO_SIZE_TYPE.SMALL;
};

export interface UnsplashPhotoPositioned extends UnsplashPhoto {
  type: PHOTO_SIZE_TYPE;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export const calculatePositions = (
  images: UnsplashPhoto[],
  columns: number
): UnsplashPhotoPositioned[] => {
  const containerWidth = document.documentElement.clientWidth;
  const columnWidth = containerWidth / columns;

  const imageDimensions = {
    small: { width: columnWidth, height: columnWidth },
    wide: { width: columnWidth * 2, height: columnWidth },
    tall: { width: columnWidth, height: columnWidth * 2 },
    big: { width: columnWidth * 2, height: columnWidth * 2 },
  };

  const slots = Math.ceil(containerWidth / columnWidth);
  const columnHeights = Array(slots).fill(0);

  const positionedImages: UnsplashPhotoPositioned[] = [];

  images.forEach((image) => {
    const type = getPhotoSizeType(image.width, image.height);
    const { width, height } = imageDimensions[type];
    const slotsRequired = Math.ceil(width / columnWidth);

    let minLeft = 0;
    let minTop = Infinity;

    // Check for the most optimal gap or position
    for (let i = 0; i <= slots - slotsRequired; i++) {
      const currentTop = Math.max(...columnHeights.slice(i, i + slotsRequired));

      // Check if this image can fill a gap perfectly
      if (currentTop === minTop && columnHeights[i] === minTop) {
        minLeft = i * columnWidth;
        break;
      }

      // Otherwise, find the lowest top value to place the image
      if (currentTop < minTop) {
        minTop = currentTop;
        minLeft = i * columnWidth;
      }
    }

    // Place the image at the found position
    positionedImages.push({
      ...image,
      type,
      position: {
        top: `${minTop}px`,
        left: `${minLeft}px`,
        width: `${width}px`,
        height: `${height}px`,
      },
    });

    // Update the column heights
    for (
      let i = minLeft / columnWidth;
      i < minLeft / columnWidth + slotsRequired;
      i++
    ) {
      columnHeights[i] = minTop + height;
    }
  });

  return positionedImages;
};
