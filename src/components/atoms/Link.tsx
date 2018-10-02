import styled from "react-emotion";

export const Link = styled("a")`
  text-decoration: none;
  outline: none;
  color: #00ffa2;
  word-wrap: break-word;

  &:hover,
  &:focus {
    text-decoration-line: underline;
  }

  &:visited,
  &:visited:hover,
  &:visited:focus {
    text-decoration: underline dotted #00ff8d;
    color: #00ff8d;
  }
`;
