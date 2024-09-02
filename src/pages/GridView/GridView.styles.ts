import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 16px;
`;

export const GridViewStyled = styled.div`
  display: flex;
  flex-direction: column;

  .gridview-wrapper {
    position: relative;
    margin-top: 40px;

    .image-wrapper {
      position: absolute;
      border: 1px solid black; /* Box border */
      background-color: lightgrey;
      box-sizing: border-box;
      text-align: center;
      line-height: normal;
      border: 5px solid #000;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }

  .search-wrapper {
    position: fixed;
    width: 100%;
    box-shadow: 0px 2px 5px 0px #fff;
    margin-bottom: 20px;
    z-index: 100;

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
