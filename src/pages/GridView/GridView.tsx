import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { usePhotosQuery } from "../../api/unsplash";
import { UnsplashPhoto } from "../../api/unsplash";
import { GridViewStyled } from "./GridView.styles";
import { getPhotoSizeType } from "./GridView.utils";
import { useHandleScroll, useIntersectionObserver } from "./GridView.hooks";

const PHOTOS_PER_PAGE = 30;

export const GridView: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    usePhotosQuery(PHOTOS_PER_PAGE);

  const allPhotos = useMemo(
    () => data?.pages.flatMap((page) => page) || [],
    [data?.pages]
  );

  const { photoRefs, visiblePhotos } = useIntersectionObserver(allPhotos);

  useHandleScroll(fetchNextPage, hasNextPage);

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading photos.</div>;
  }

  return (
    <GridViewStyled>
      {allPhotos.map((photo: UnsplashPhoto) => (
        <Link
          key={photo.id}
          to={`/photo/${photo.id}`}
          className={`${getPhotoSizeType(
            photo.width,
            photo.height
          )} image-wrapper`}
          id={photo.id}
          ref={(el) => {
            photoRefs.current[photo.id] = el;
          }}
        >
          {visiblePhotos.has(photo.id) && (
            <img
              src={photo.urls.small}
              alt={photo.alt_description || "Photo"}
            />
          )}
        </Link>
      ))}
      {isLoading && <div>Loading more photos...</div>}
    </GridViewStyled>
  );
};
