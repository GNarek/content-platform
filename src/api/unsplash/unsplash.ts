import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UnsplashPhoto } from "./types";

const ACCESS_KEY =
  process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "your_access_key_here";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchPhotos = async (
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashPhoto[]> => {
  const response = await unsplashApi.get<UnsplashPhoto[]>("/photos", {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const usePhotosQuery = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ["photos", page, perPage],
    queryFn: () => fetchPhotos(page, perPage),
    staleTime: 5000,
  });
};
