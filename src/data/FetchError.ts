import { IFetchError } from "./interfaces";

export class FetchError implements IFetchError {
  private readonly _hasErrors: boolean;
  private readonly _error: Error;

  public static create(hasErrors: boolean, error: Error): IFetchError {
    return new FetchError(hasErrors, error);
  }

  private constructor(hasErrors: boolean, error: Error) {
    this._hasErrors = hasErrors;
    this._error = error;
  }

  get hasErrors(): boolean {
    return this._hasErrors;
  }

  get errorMessage(): string {
    return this._error.message;
  }

  get error(): Error {
    return this._error;
  }
}
