import * as React from "react";
import styled from "react-emotion";
import { ICategory } from "../interfaces/index";

interface IMainListItemProps {
  category: ICategory;
  toggle: Function;
}

const MainListItemComponent = styled("li")`
  color: #004466;
  background: #00ffa2;
  line-height: 2;
  padding-left: 8px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }
`;

// rename to CategoryItem

export const MainListItem = (props: IMainListItemProps) => (
  <MainListItemComponent onClick={() => props.toggle(props.category)}>
    {props.category.name}
  </MainListItemComponent>
);
