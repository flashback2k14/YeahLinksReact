import styled from "@emotion/styled";

interface ISearchInputProps {
  isVisible: boolean;
}

export const SearchInput = styled.input<ISearchInputProps>`
  display: ${props => (props.isVisible ? "flex" : "none")};
  flex: 1 0 auto;

  margin: 2px 12px;
  padding: 4px;

  font-size: 1em;

  background: #004466;
  color: #00ffa2;
  caret-color: #00ffa2;

  border: 0;
  border-bottom: 2px solid #00ff8d;
  outline: none;
`;
