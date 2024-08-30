import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 16px;
`;

export const GridViewStyled = styled.div`
  padding: 16px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-flow: dense;

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    grid-row: span 1;
    grid-column: span 1;

    &.small {
      grid-row: span 1;
      grid-column: span 1;
    }

    &.wide {
      grid-column: span 2;
    }

    &.tall {
      grid-row: span 2;
    }

    &.big {
      grid-column: span 2;
      grid-row: span 2;
    }

    .link {
      display: flex;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;
