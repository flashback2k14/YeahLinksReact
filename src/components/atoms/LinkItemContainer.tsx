import styled from "react-emotion";

interface ILinkItemContainerProps {
  isHidden: boolean;
}

export const LinkItemContainer = styled("li")`
  line-height: 1.3;
  padding: 4px 8px;
  font-weight: 400;
  display: ${(props: ILinkItemContainerProps) =>
    props.isHidden ? "none" : "list-item"};
`;
