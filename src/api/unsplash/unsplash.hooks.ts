import { useQuery } from "@tanstack/react-query";
import { fetchPhotoById, fetchPhotos } from "./unsplash";

export const usePhotosQuery = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ["photos", page, perPage],
    queryFn: () => fetchPhotos(page, perPage),
    staleTime: 5000,
  });
};

export const usePhotoQuery = (id: string) => {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoById(id),
    staleTime: 5000,
  });
};
