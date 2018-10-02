import * as React from "react";
import styled, { keyframes } from "react-emotion";

const LoadingContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: calc(100vh - 16px);
  width: calc(100vw - 8px);
`;

const LoadingText = styled("div")`
  margin-bottom: 4px;
  color: #00ffa2;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled("div")`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #00ffa2;
  border-radius: 50%;
  border-top-color: #004466;
  animation: ${spin} 1s ease-in-out infinite;
  -webkit-animation: ${spin} 1s ease-in-out infinite;
`;

export const Loading = () => (
  <LoadingContainer>
    <LoadingText>Loading...</LoadingText>
    <LoadingSpinner />
  </LoadingContainer>
);
