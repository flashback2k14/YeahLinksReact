import styled from "@emotion/styled";

export const LinkList = styled("ul")`
  display: block;
  list-style-type: square;
  line-height: 1.5;
  font-size: 1.1em;

  color: #00ffa2;
  background: #004466;
  border: solid 1px #00ffa2;
  margin-bottom: 24px;

  &:hover {
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }
`;
