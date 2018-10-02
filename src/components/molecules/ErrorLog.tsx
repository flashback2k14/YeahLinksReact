import * as React from "react";
import { ErrorLogContainer, ErrorLogMessage, ErrorLogCode } from "../atoms";

interface IErrorLogProps {
  errorMessage: String;
  error: Error;
}

export const ErrorLog = (props: IErrorLogProps) => (
  <ErrorLogContainer>
    <ErrorLogMessage>Error: {props.errorMessage}</ErrorLogMessage>
    <ErrorLogCode>{JSON.stringify(props.error, null, 2)}</ErrorLogCode>
  </ErrorLogContainer>
);
