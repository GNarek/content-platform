import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotoQuery } from "../../api/unsplash";
import {
  Container,
  ImageWrapper,
  Image,
  Details,
  BackButton,
} from "./DetailView.styles";

export const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: photo, isLoading, isError } = usePhotoQuery(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !photo) {
    return <div>Error loading photo.</div>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>Back to Grid</BackButton>
      <ImageWrapper>
        <Image src={photo.urls.full} alt={photo.alt_description || "Photo"} />
      </ImageWrapper>
      <Details>
        <h2>{photo.description || photo.alt_description}</h2>
        <p>By {photo.user.name}</p>
      </Details>
    </Container>
  );
};
