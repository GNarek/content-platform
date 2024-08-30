import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 16px;
`;

export const GridViewStyled = styled.div`
  display: flex;
  flex-direction: column;

  .gridview-wrapper {
    margin-top: 40px;
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
  }

  .search-wrapper {
    position: fixed;
    width: 100%;
    box-shadow: 0px 2px 5px 0px #fff;
    margin-bottom: 20px;

    .search-input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .info {
    color: white;
  }
`;
