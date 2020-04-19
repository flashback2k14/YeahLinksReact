import { IData, IFetchResult, ICategoryTree, ICategory, ILink } from './interfaces';

export class FetchResult implements IFetchResult {
  private readonly _initialData: ICategoryTree;
  private _data: ICategoryTree;

  public static create(initialData: IData): IFetchResult {
    return new FetchResult(initialData);
  }

  public setData(value: ICategoryTree): FetchResult {
    this._data = value;
    return this;
  }

  private constructor(initialData: IData) {
    const tree = this._parseData(initialData);
    this._initialData = tree;
    this._data = tree;
  }

  private _parseData({ categories, links }: IData): ICategoryTree {
    const result: ICategoryTree = {
      id: 0,
      name: 'ROOT',
      children: []
    };

    if (categories) {
      for (const category of categories) {
        const obj = { ...category } as ICategory;
        obj.children = links.filter((link: ILink) => link.categoryId === category.id);
        result.children.push(obj);
      }
    }

    return result;
  }

  get initialData(): ICategoryTree {
    return this._initialData;
  }

  get data(): ICategoryTree {
    return this._data;
  }
}
