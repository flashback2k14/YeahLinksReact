import * as React from "react";
import styled from "react-emotion";

interface IMainListProps {
  children: React.ReactNode;
}

const MainListComponent = styled("ul")`
  list-style-type: none;
  line-height: 1.5;
  margin-top: 8px;
  padding-left: 14px;
  padding-right: 14px;
  font-size: 1.1em;
`;

// rename to CategoryList

export const MainList = (props: IMainListProps) => (
  <MainListComponent>{props.children}</MainListComponent>
);
