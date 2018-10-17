export interface ICategory {
  id: number;
  name: string;
}

export interface ILink {
  id: number;
  categoryId: number;
  link: string;
  desc: string;
}

export interface IData {
  categories: ICategory[];
  links: ILink[];
}

export interface IFetchResult {
  initialData: IData;
  data: IData;
  setData(value: IData): IFetchResult;
}

export interface IFetchError {
  hasErrors: boolean;
  errorMessage: string;
  error: Error;
}
