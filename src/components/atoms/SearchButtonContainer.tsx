import styled from "react-emotion";

interface ISearchButtonContainerProps {
  hasFullWidth: boolean;
}

export const SearchButtonContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;

  width: ${(props: ISearchButtonContainerProps) =>
    props.hasFullWidth ? "100vw" : "36px"};
`;
