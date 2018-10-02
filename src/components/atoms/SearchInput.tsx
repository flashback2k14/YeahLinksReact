import styled from "react-emotion";

interface ISearchInputProps {
  isVisible: boolean;
}

export const SearchInput = styled("input")`
  display: ${(props: ISearchInputProps) => (props.isVisible ? "flex" : "none")};
  flex: 1 0 auto;

  margin-left: 2px;
  margin-right: 12px;
  margin-bottom: 4px;

  background: #004466;
  color: #00ffa2;
  caret-color: #00ffa2;

  border: 0;
  border-bottom: 2px solid #00ff8d;
  outline: none;
`;
