import React, { useState } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { usePhotosQuery } from "../../api/unsplash";
import { UnsplashPhoto } from "../../api/unsplash";
import { GridViewStyled } from "./GridView.styles";
import { getPhotoSizeType, UnsplashPhotoPositioned } from "./GridView.utils";
import {
  useHandleScroll,
  useIntersectionObserver,
  usePositionedImages,
} from "./GridView.hooks";

const PHOTOS_PER_PAGE = 30;

export const GridView: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedSetQuery = debounce(setQuery, 500);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const navigate = useNavigate();
  const navigateToDetailView = (photo: UnsplashPhoto) => {
    return () =>
      navigate(`/photo/${photo.id}`, {
        state: {
          photo: photo,
        },
      });
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    usePhotosQuery(PHOTOS_PER_PAGE, query);

  const positionedImages = usePositionedImages(data?.pages);

  const { wrapperRef, visiblePhotos } =
    useIntersectionObserver(positionedImages);

  useHandleScroll(fetchNextPage, hasNextPage);

  if (isError && !positionedImages.length) {
    return <div>Error loading photos.</div>;
  }

  return (
    <GridViewStyled>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search photos..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="gridview-wrapper" ref={wrapperRef}>
        {positionedImages.map(
          (photo: UnsplashPhotoPositioned, index: number) =>
            visiblePhotos.has(photo.id) && (
              <div
                aria-label={`View photo of ${
                  photo.user.first_name || "unknown author"
                }`}
                key={`${photo.id}-${index}`}
                onClick={navigateToDetailView(photo)}
                className={`${getPhotoSizeType(
                  photo.width,
                  photo.height
                )} image-wrapper`}
                id={photo.id}
                style={{ backgroundColor: photo.color, ...photo.position }}
              >
                <img
                  crossOrigin="anonymous"
                  src={photo.urls.small}
                  alt={photo.alt_description || "Photo"}
                />
              </div>
            )
        )}
      </div>

      {isLoading && <div className="info">Loading more photos...</div>}
      {!isLoading && !positionedImages.length && query.length && (
        <div className="info">There are no matches for "{query}"</div>
      )}
    </GridViewStyled>
  );
};
