import * as React from "react";
import styled from "react-emotion";

interface IErrorLogProps {
  errorMessage: String;
  error: Error;
}

const ErrorContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: solid #ff1744 4px;
`;

const ErrorMessage = styled("h3")`
  color: #ff1744;
`;

const ErrorMessageObject = styled("pre")`
  color: #ff1744;
`;

export const ErrorLog = (props: IErrorLogProps) => (
  <ErrorContainer>
    <ErrorMessage>Error: {props.errorMessage}</ErrorMessage>
    <ErrorMessageObject>
      {JSON.stringify(props.error, null, 2)}
    </ErrorMessageObject>
  </ErrorContainer>
);
