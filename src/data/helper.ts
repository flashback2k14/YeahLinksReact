import { ICategory, IData, ILink } from "./interfaces";

export class Helper {
  public static async fetchfromJson(source: string): Promise<IData> {
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
  }

  public static sortLinks(a: ILink, b: ILink): number {
    const linkA = a.link.toUpperCase();
    const linkB = b.link.toUpperCase();
    if (linkA < linkB) {
      return -1;
    }
    if (linkA > linkB) {
      return 1;
    }
    return 0;
  }

  public static immutablePush<T>(arr: T[], newEntry: T): T[] {
    return [...arr, newEntry];
  }

  public static immutableSplice<T>(
    arr: T[],
    start: number,
    deleteCount: number,
    ...items: T[]
  ): T[] {
    return [
      ...arr.slice(0, start),
      ...items,
      ...arr.slice(start + deleteCount)
    ];
  }

  public static findIndex<T>(arr: T[], entry: T): number {
    return arr.findIndex(catId => catId === entry);
  }

  public static contains<T>(arr: T[], entry: T): boolean {
    return -1 === Helper.findIndex(arr, entry);
  }
}
