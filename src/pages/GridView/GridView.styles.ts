import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 16px;
`;

export const PhotoGrid = styled.div`
  column-count: 3; // Number of columns in the grid
  column-gap: 16px; // Space between the columns

  @media (max-width: 768px) {
    column-count: 2;
  }

  @media (max-width: 480px) {
    column-count: 1;
  }
`;

export const PhotoItem = styled.div`
  break-inside: avoid; // Prevents photos from being split across columns
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;
