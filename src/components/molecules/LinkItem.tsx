import * as React from "react";
import { ILink } from "../../data";
import {
  LinkItemContainer,
  Link,
  LinkItemDescription,
  LinkItemSeparator
} from "../atoms";

interface IChildListItemProps {
  link: ILink;
  isHidden: boolean;
}

export const LinkItem = (props: IChildListItemProps) => (
  <LinkItemContainer isHidden={props.isHidden}>
    <React.Fragment>
      <Link
        href={props.link.link}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {props.link.link}
        {props.link.desc && (
          <LinkItemDescription>{props.link.desc}</LinkItemDescription>
        )}
        <LinkItemSeparator />
      </Link>
    </React.Fragment>
  </LinkItemContainer>
);
