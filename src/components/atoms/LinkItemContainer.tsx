import styled from "@emotion/styled";

interface ILinkItemContainerProps {
  isHidden: boolean;
}

export const LinkItemContainer = styled.li<ILinkItemContainerProps>`
  line-height: 1.3;
  padding: 4px 8px;
  font-weight: 400;
  display: ${props => (props.isHidden ? "none" : "list-item")};
`;
