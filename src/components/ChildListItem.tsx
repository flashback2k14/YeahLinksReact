import * as React from "react";
import styled from "react-emotion";
import { ILink } from "../interfaces/index";

export interface IChildListItemProps {
  link: ILink;
  isHidden: boolean;
}

const ListItem = styled("li")`
  line-height: 1.3;
  padding: 4px 8px;
  font-weight: 400;
  display: ${(props: any) => (props.isHidden ? "none" : "list-item")};
`;

const Link = styled("a")`
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

const LinkDescription = styled("div")`
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: small;
  font-style: italic;
`;

const LinkSeparator = styled("hr")`
  margin: 0 8px 4px 0;
  padding: 0;
  border: 0;
  height: 1px;
  background: rgba(0, 255, 162, 0.25);
`;

export const ChildListItem = (props: IChildListItemProps) => (
  <ListItem isHidden={props.isHidden}>
    <React.Fragment>
      <Link
        href={props.link.link}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {props.link.link}
        {props.link.desc && (
          <LinkDescription>{props.link.desc}</LinkDescription>
        )}
        <LinkSeparator />
      </Link>
    </React.Fragment>
  </ListItem>
);

// rename to LinkItem
// const ChildListItem = (props: IChildListItemProps) => {
//   return (
//     <li
//       className={`list-child_item ${
//         props.isHidden ? "list-child_item-hidden" : ""
//       }`}
//     >
//       <React.Fragment>
//         <a
//           className="link"
//           href={props.link.link}
//           target="_blank"
//           rel="noopener noreferrer nofollow"
//         >
//           {props.link.link}
//         </a>
//         {props.link.desc && <div className="link-desc">{props.link.desc}</div>}
//         <hr className="link-rule" />
//       </React.Fragment>
//     </li>
//   );
// };
