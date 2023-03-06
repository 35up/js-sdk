import { makeFail, makeSuccess, ResolvedRemoteData } from '@35up/tslib-utils';
import { post } from '@35up/http-client';
import { transformApiError, ValidationError } from '@35up/js-sdk-base';
import {
  CreateOrderParams,
  CreateOrderResult,
  NodeSdkConfig,
} from '../types';
import { makeBasicAuthHeaders } from '../utils/make-basic-auth-headers';
import * as validations from './validations';


export type TRemoteCreateOrderResult = ResolvedRemoteData<CreateOrderResult>;

/**
 * This endpoint allows the seller to place an order on the 35up marketplace
 * and responds with a 35up order ID and a status update.
 */
export async function createOrder(
  details: CreateOrderParams,
  { apiUrl, credentials, session }: NodeSdkConfig,
): Promise<TRemoteCreateOrderResult> {
  if (!credentials) {
    return makeFail(new Error('Credentials are not present in configuration'));
  }

  try {
    const result = validations.createOrderResult.safeParse(await post(
      `${apiUrl}/orders`,
      details,
      {params: {session}, headers: makeBasicAuthHeaders(credentials)},
    ));

    if (!result.success) {
      return makeFail(new ValidationError(
        'The API response does not match the expected scheme.'
        + ' Please contact support',
        result.error,
      ));
    }

    return makeSuccess(result.data);
  } catch (e) {
    if (e.response) {
      return makeFail(transformApiError<CreateOrderParams>(e) || e);
    }

    return makeFail(e);
  }
}
