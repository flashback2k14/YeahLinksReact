import { IData, IFetchResult } from "./interfaces";

export class FetchResult implements IFetchResult {
  private readonly _initialData: IData;
  private _data: IData;

  public static create(initialData: IData): IFetchResult {
    return new FetchResult(initialData);
  }

  private constructor(initialData: IData) {
    this._initialData = initialData;
    this._data = initialData;
  }

  get initialData(): IData {
    return this._initialData;
  }

  get data(): IData {
    return this._data;
  }

  public setData(value: IData): FetchResult {
    this._data = value;
    return this;
  }
}
