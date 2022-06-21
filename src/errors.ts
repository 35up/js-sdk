import { HttpError } from '@35up/http-client';


export type TParamErrorDetail<T> = string | {
  [P in keyof T]?: string | TParamErrorDetail<T[P]>
};

export class BadParamsError<T> extends Error {
  constructor(message: string, public readonly details?: TParamErrorDetail<T>) {
    super(message);
  }
}

export function handleApiError<TParams>(
  e: HttpError,
): BadParamsError<TParams> | undefined {
  if (e.responseStatus === 400) {
    return new BadParamsError<TParams>(
      'Bad request body',
      'errors' in e.data
        ? (e.data as {errors: TParamErrorDetail<TParams>}).errors
        : undefined,
    );
  }

  return undefined;
}
