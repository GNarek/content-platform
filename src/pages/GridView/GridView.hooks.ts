import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import throttle from "lodash/throttle";
import { UnsplashPhoto } from "../../api/unsplash";
import { calculatePositions, UnsplashPhotoPositioned } from "./GridView.utils";

const buffer = 1000; // Buffer in pixels to load images before they enter the viewport

export const useIntersectionObserver = (
  allPhotos: UnsplashPhotoPositioned[]
) => {
  const [visiblePhotos, setVisiblePhotos] = useState<Set<string>>(new Set());
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const updateVisibility = useCallback(() => {
    const newVisiblePhotos = new Set<string>();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();

    if (wrapperRect) {
      allPhotos.forEach((photo) => {
        const photoTop = parseFloat(photo.position.top);
        const photoHeight = parseFloat(photo.position.height);
        const photoBottom = photoTop + photoHeight;

        const isVisible =
          photoBottom > window.scrollY - buffer &&
          photoTop < window.scrollY + window.innerHeight + buffer;

        if (isVisible) {
          newVisiblePhotos.add(photo.id);
        }
      });
    }

    setVisiblePhotos((prevVisiblePhotos) => {
      // Only update state if the visible photos set has changed
      if (
        newVisiblePhotos.size !== prevVisiblePhotos.size ||
        [...newVisiblePhotos].some((id) => !prevVisiblePhotos.has(id))
      ) {
        return newVisiblePhotos;
      }
      return prevVisiblePhotos;
    });
  }, [allPhotos]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledUpdateVisibility = useCallback(
    throttle(updateVisibility, 100, { leading: true, trailing: true }),
    [updateVisibility]
  );

  useEffect(() => {
    if (wrapperRef.current) {
      throttledUpdateVisibility(); // Initial check
      window.addEventListener("scroll", throttledUpdateVisibility, {
        passive: true,
      });
      window.addEventListener("resize", throttledUpdateVisibility);

      return () => {
        window.removeEventListener("scroll", throttledUpdateVisibility);
        window.removeEventListener("resize", throttledUpdateVisibility);
        throttledUpdateVisibility.cancel();
      };
    }
  }, [throttledUpdateVisibility]);

  return { wrapperRef, visiblePhotos };
};

export const useHandleScroll = (
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UnsplashPhoto[], unknown>, Error>
  >,
  hasNextPage: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToTheEnd =
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - buffer && hasNextPage;

      if (scrolledToTheEnd) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);
};

const getColumnCount = (): number => {
  const width = document.documentElement.clientWidth;

  if (width >= 1200) {
    return 6;
  } else if (width >= 992) {
    return 4;
  } else if (width >= 768) {
    return 3;
  }

  return 2;
};

export const usePositionedImages = (pages?: UnsplashPhoto[][]) => {
  const [columns, setColumns] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const positionedImages = useMemo(() => {
    const allPhotos = pages?.flatMap((page) => page) || [];

    return calculatePositions(allPhotos, columns);
  }, [pages, columns]);

  return positionedImages;
};
