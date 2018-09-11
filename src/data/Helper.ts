import { IData, ICategory } from "../interfaces";

export const fetchfromJson = async (source: string): Promise<IData> => {
  const response = await window.fetch(source);
  const responseData: IData = await response.json();
  responseData.categories.sort((a: ICategory, b: ICategory) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return responseData;
};

export const immutablePush = <T>(arr: T[], newEntry: T): T[] => {
  return [...arr, newEntry];
};

export const immutableSplice = <T>(
  arr: T[],
  start: number,
  deleteCount: number,
  ...items: T[]
): T[] => {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
};

export const findIndex = <T>(arr: T[], entry: T): number => {
  return arr.findIndex(catId => catId === entry);
};

export const contains = <T>(arr: T[], entry: T): boolean => {
  return -1 === findIndex(arr, entry);
};
