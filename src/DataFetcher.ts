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
  const response = await window.fetch(source);
  const responseData: IData = await response.json();
  responseData.categories.sort((a: ICategory, b: ICategory) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return responseData;
};
