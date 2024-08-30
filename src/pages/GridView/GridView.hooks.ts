import { useEffect, useRef, useState } from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { UnsplashPhoto } from "../../api/unsplash";

export const useIntersectionObserver = (allPhotos: UnsplashPhoto[]) => {
  const photoRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [visiblePhotos, setVisiblePhotos] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      let updated = false;
      const newVisiblePhotos = new Set(visiblePhotos);

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!newVisiblePhotos.has(entry.target.id)) {
            newVisiblePhotos.add(entry.target.id);
            updated = true;
          }
        } else {
          if (newVisiblePhotos.has(entry.target.id)) {
            newVisiblePhotos.delete(entry.target.id);
            updated = true;
          }
        }
      });

      if (updated) {
        setVisiblePhotos(newVisiblePhotos);
      }
    });

    const refs = Object.values(photoRefs.current);
    refs.forEach((ref) => ref && observerRef.current?.observe(ref));

    return () => {
      refs.forEach((ref) => ref && observerRef.current?.unobserve(ref));
      observerRef.current?.disconnect();
    };
  }, [allPhotos, visiblePhotos]);

  return { photoRefs, visiblePhotos };
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
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);
};
