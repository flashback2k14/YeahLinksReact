import styled from "@emotion/styled";

interface ISearchInputLabelProps {
  isVisible: boolean;
}

export const SearchInputLabel = styled.label<ISearchInputLabelProps>`
  display: ${props => (props.isVisible ? "flex" : "none")};
  margin-right: 4px;
`;
