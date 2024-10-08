import axios from "axios";
import { UnsplashPhoto } from "./unsplash.types";

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
  perPage: number = 10,
  query?: string
): Promise<UnsplashPhoto[]> => {
  const params: Record<string, any> = {
    page,
    per_page: perPage,
  };

  if (query) {
    params.query = query;
    const response = await unsplashApi.get<{ results: UnsplashPhoto[] }>(
      "/search/photos",
      { params }
    );
    return response.data.results;
  } else {
    const response = await unsplashApi.get<UnsplashPhoto[]>("/photos", {
      params,
    });
    return response.data;
  }
};

export const fetchPhotoById = async (id: string): Promise<UnsplashPhoto> => {
  const response = await unsplashApi.get<UnsplashPhoto>(`/photos/${id}`);
  return response.data;
};
