import { IData, ICategory, ILink } from "./logic";

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
  showChildListForCategoryId: number;
}

export interface IErrorLogProps {
  errorMessage: String;
  error: Error;
}

export interface IMainListItemProps {
  category: ICategory;
  toggle: Function;
}

export interface IChildListItemProps {
  link: ILink;
  isHidden: boolean;
}
