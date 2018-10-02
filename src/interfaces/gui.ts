import { IData } from "./logic";

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
