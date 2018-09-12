import { IData, ICategory, ILink } from "./logic";
import * as React from "react";

export interface IAppProps {
  dataSource: string;
}

export interface IAppState {
  isLoading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  error: Error;
  initialData: IData;
  data: IData;
  showChildListForCategoryIds: number[];
}

export interface IErrorLogProps {
  errorMessage: String;
  error: Error;
}

export interface ISearchProps {
  onClearFilter: Function;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IMainListItemProps {
  category: ICategory;
  toggle: Function;
}

export interface IChildListItemProps {
  link: ILink;
  isHidden: boolean;
}
