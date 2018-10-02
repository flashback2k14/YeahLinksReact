import * as React from "react";
import { LoadingContainer, LoadingText, LoadingSpinner } from "../atoms";

export const Loading = () => (
  <LoadingContainer>
    <LoadingText>Loading...</LoadingText>
    <LoadingSpinner />
  </LoadingContainer>
);
