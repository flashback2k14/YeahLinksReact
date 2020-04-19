export interface ILink {
  id: number;
  categoryId: number;
  link: string;
  desc: string;
}

export interface ICategory {
  id: number;
  name: string;
  children: ILink[];
}

export interface ICategoryTree {
  id: number;
  name: string;
  children: ICategory[];
}

export interface IData {
  categories: ICategory[];
  links: ILink[];
}

export interface IFetchResult {
  initialData: ICategoryTree;
  data: ICategoryTree;
  setData(value: ICategoryTree): IFetchResult;
}

export interface IFetchError {
  hasErrors: boolean;
  errorMessage: string;
  error: Error;
}
