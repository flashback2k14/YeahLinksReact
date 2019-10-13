import styled from "@emotion/styled";

export const SearchButton = styled("button")`
  border: none;
  margin-top: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  margin-right: 4px;
  background: #004466;
  cursor: pointer;

  & svg {
    fill: #00ff8d;
  }
  &:hover svg {
    fill: #004466;
    background: #00ff8d;
    border-radius: 50%;
  }
`;
