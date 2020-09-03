export type Status = 'success' | 'fail';

export type RemoteData<T = null, U extends Error = null> = {
  data: T;
  status: Status;
  error: U;
}

export enum STATUS {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const makeSuccess = <T>(payload: T): RemoteData<T> => ({
  status: STATUS.SUCCESS,
  data: payload,
  error: null,
});


export const makeFail = <U extends Error = Error>(
  error: U,
): RemoteData<null, U> => ({
    status: STATUS.FAIL,
    data: null,
    error,
  });
