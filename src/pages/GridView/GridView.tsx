import React, { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { usePhotosQuery } from "../../api/unsplash";
import { UnsplashPhoto } from "../../api/unsplash";
import { GridViewStyled } from "./GridView.styles";
import { getPhotoSizeType } from "./GridView.utils";
import { useHandleScroll, useIntersectionObserver } from "./GridView.hooks";

const PHOTOS_PER_PAGE = 30;

export const GridView: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    usePhotosQuery(PHOTOS_PER_PAGE, query);

  const debouncedSetQuery = debounce(setQuery, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const allPhotos = useMemo(
    () => data?.pages.flatMap((page) => page) || [],
    [data?.pages]
  );

  const { photoRefs, visiblePhotos } = useIntersectionObserver(allPhotos);

  useHandleScroll(fetchNextPage, hasNextPage);

  if (isError) {
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
      <div className="gridview-wrapper">
        {allPhotos.map((photo: UnsplashPhoto) => (
          <Link
            aria-label={`View photo of ${
              photo.user.first_name || "unknown author"
            }`}
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
            style={{ backgroundColor: photo.color }}
          >
            {visiblePhotos.has(photo.id) && (
              <img
                crossOrigin="anonymous"
                src={photo.urls.small}
                alt={photo.alt_description || "Photo"}
              />
            )}
          </Link>
        ))}
      </div>

      {isLoading && <div className="info">Loading more photos...</div>}
      {!isLoading && !allPhotos.length && query.length && (
        <div className="info">There are no matches for "{query}"</div>
      )}
    </GridViewStyled>
  );
};
