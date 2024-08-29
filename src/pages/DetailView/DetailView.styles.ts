import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  max-width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  flex: 1;
  max-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

export const Details = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 0 16px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BackButton = styled.button`
  align-self: flex-start;
  margin-bottom: 16px;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
