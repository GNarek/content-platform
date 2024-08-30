import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotoQuery } from "../../api/unsplash";
import { formatDate } from "../../utils/date";
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
      <BackButton onClick={() => navigate(-1)}>&#8678; Back to Grid</BackButton>

      <ImageWrapper>
        <Image src={photo.urls.full} alt={photo.alt_description || "Photo"} />
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
