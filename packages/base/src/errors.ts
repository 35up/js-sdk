/* eslint-disable max-classes-per-file */
import { HttpError } from '@35up/http-client';
import { ZodError } from 'zod';


export type TParamErrorDetail<T> = string | {
  [P in keyof T]?: string | TParamErrorDetail<T[P]>
};

export class BadParamsError<T> extends Error {
  constructor(message: string, public readonly details?: TParamErrorDetail<T>) {
    super(message);
  }
}

export class ValidationError<T = unknown> extends Error {
  constructor(message: string, public readonly validationError: ZodError<T>) {
    super(message);
  }
}

export function transformApiError<TParams>(
  e: HttpError<{errors: TParamErrorDetail<TParams>} | undefined>,
): BadParamsError<TParams> | undefined {
  if (e.responseStatus === 400) {
    return new BadParamsError<TParams>(
      'Bad request body',
      (typeof e.data === 'object' && e.data && 'errors' in e.data)
        ? e.data.errors
        : undefined,
    );
  }

  if (e instanceof ZodError) {
    throw new ValidationError(
      'The API response does not match the expected scheme. '
        + 'Please contact support',
      e,
    );
  }

  return e;
}
