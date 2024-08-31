import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePhotoQuery } from "../../api/unsplash";
import { formatDate } from "../../utils/date";
import {
  Container,
  ImageWrapper,
  Details,
  BackButton,
} from "./DetailView.styles";

export const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { photo: photoNav } = location.state || {};
  const { data: photoStore, isLoading, isError } = usePhotoQuery(id!);

  const photo = photoStore || photoNav;
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (photo && !currentImageSrc) {
      setCurrentImageSrc(photo.urls.small);
    }
  }, [photo, currentImageSrc]);

  const onSmallImageLoad = () => {
    if (currentImageSrc === photo.urls.small) {
      const img = new Image();

      img.crossOrigin = "anonymous";
      img.src = photo.urls.full;
      img.onload = onFullImageLoad;
    }
  };

  const onFullImageLoad = () => {
    if (photo?.urls.full) {
      setCurrentImageSrc(photo?.urls.full || null);
    }
  };

  if (isLoading && !photo) {
    return <div>Loading...</div>;
  }

  if ((isError || !photo) && !photo) {
    return <div>Error loading photo.</div>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        &#8678; Back to Grid
      </BackButton>

      <ImageWrapper>
        {currentImageSrc && (
          <img
            crossOrigin="anonymous"
            src={currentImageSrc}
            alt={photo.alt_description || "Photo"}
            onLoad={onSmallImageLoad}
          />
        )}
      </ImageWrapper>

      <Details>
        <h2 className="description">
          {photo.description || photo.alt_description}
        </h2>
        <p>By {photo.user.name}</p>
        <p>Created on {formatDate(photo.created_at)}</p>
      </Details>
    </Container>
  );
};
