import styled from "@emotion/styled";
import { keyframes } from "emotion";

const LoadingSpinnerAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled("div")`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #00ffa2;
  border-radius: 50%;
  border-top-color: #004466;
  animation: ${LoadingSpinnerAnimation} 1s ease-in-out infinite;
  -webkit-animation: ${LoadingSpinnerAnimation} 1s ease-in-out infinite;
`;
