export interface ICategory {
  id: number;
  name: string;
}

export interface ILink {
  id: number;
  categoryId: number;
  link: string;
}

export interface IData {
  categories: ICategory[];
  links: ILink[];
}
