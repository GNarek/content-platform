import React from "react";
import { Link } from "react-router-dom";
import { usePhotosQuery } from "../../api/unsplash";
import { UnsplashPhoto } from "../../api/unsplash";
import { GridContainer, PhotoGrid, PhotoItem } from "./GridView.styles";

export const GridView: React.FC = () => {
  const { data: photos, isLoading, isError } = usePhotosQuery(1, 20);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading photos.</div>;
  }

  return (
    <GridContainer>
      <PhotoGrid>
        {photos?.map((photo: UnsplashPhoto) => (
          <Link to={`/photo/${photo.id}`} key={photo.id}>
            <PhotoItem>
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Photo"}
              />
            </PhotoItem>
          </Link>
        ))}
      </PhotoGrid>
    </GridContainer>
  );
};
