import {
  useQuery,
  useInfiniteQuery,
  QueryFunctionContext,
  QueryKey,
  InfiniteData,
} from "@tanstack/react-query";
import { fetchPhotoById, fetchPhotos } from "./unsplash";
import { UnsplashPhoto } from "./unsplash.types";

export const usePhotosQuery = (perPage: number = 10) => {
  return useInfiniteQuery<
    UnsplashPhoto[],
    Error,
    InfiniteData<UnsplashPhoto[]>,
    QueryKey,
    number
  >({
    queryKey: ["photos"],
    queryFn: (context: QueryFunctionContext<QueryKey, number>) => {
      const page = context.pageParam ?? 1;
      return fetchPhotos(page, perPage);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    staleTime: 5000,
    initialPageParam: 1,
  });
};

export const usePhotoQuery = (id: string) => {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoById(id),
    staleTime: 5000,
  });
};
