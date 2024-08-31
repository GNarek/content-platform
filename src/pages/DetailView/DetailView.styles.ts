import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  max-width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

export const Details = styled.div`
  padding: 16px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);

  .description {
    width: calc(100vw - 32px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BackButton = styled.button`
  position: fixed;
  left: 16px;
  top: 16px;
  padding: 8px 16px;
  border: none;
  background: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
