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

export const fromJson = async (source: string): Promise<IData> => {
  const response = await window.fetch("./data/data.json");
  const responseData: IData = await response.json();
  return responseData;
};
