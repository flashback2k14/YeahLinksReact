import styled from "react-emotion";

interface ISearchInputLabelProps {
  isVisible: boolean;
}

export const SearchInputLabel = styled("label")`
  display: ${(props: ISearchInputLabelProps) =>
    props.isVisible ? "flex" : "none"};
  margin-right: 4px;
`;
