import * as React from "react";
import { IFetchError } from "./data";
import { ErrorLogContainer, ErrorLogMessage, ErrorLogCode } from "../atoms";

interface IErrorLogProps {
  fetchError: IFetchError;
}

export const ErrorLog = (props: IErrorLogProps) => (
  <ErrorLogContainer>
    <ErrorLogMessage>Error: {props.fetchError.errorMessage}</ErrorLogMessage>
    <ErrorLogCode>
      {JSON.stringify(props.fetchError.error, null, 2)}
    </ErrorLogCode>
  </ErrorLogContainer>
);
