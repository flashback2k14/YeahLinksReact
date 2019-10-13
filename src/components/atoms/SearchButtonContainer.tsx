import styled from "@emotion/styled";

interface ISearchButtonContainerProps {
  hasFullWidth: boolean;
}

export const SearchButtonContainer = styled.div<ISearchButtonContainerProps>`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  width: ${props => (props.hasFullWidth ? "100vw" : "36px")};
`;
