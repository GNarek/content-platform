import React from "react";
import { Link } from "react-router-dom";
import { usePhotosQuery } from "../../api/unsplash";
import { UnsplashPhoto } from "../../api/unsplash";
import { GridViewStyled } from "./GridView.styles";
import { getPhotoClass } from "./GridView.utils";

export const GridView: React.FC = () => {
  const { data: photos, isLoading, isError } = usePhotosQuery(1, 20);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading photos.</div>;
  }

  return (
    <GridViewStyled>
      {photos?.map((photo: UnsplashPhoto) => (
        <Link
          key={photo.id}
          to={`/photo/${photo.id}`}
          className={`${getPhotoClass(
            photo.width,
            photo.height
          )} image-wrapper`}
        >
          <img src={photo.urls.small} alt={photo.alt_description || "Photo"} />
        </Link>
      ))}
    </GridViewStyled>
  );
};
