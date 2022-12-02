import { makeFail, makeSuccess, ResolvedRemoteData } from '@35up/tslib-utils';
import { post } from '@35up/http-client';
import { z } from 'zod';
import {
  handleApiError,
  parseUnixTimestamp,
  ValidationError,
} from '@35up/js-sdk-base';
import {
  CreateOrderParams,
  CreateOrderResult,
  NodeSdkConfig,
} from '../types';
import { makeBasicAuthHeaders } from '../utils/make-basic-auth-headers';
import * as validations from '../validations';


const NUMBER_REGEX = /^\d+$/;

export const createOrderResult = z.object({
  id: z.string(),
  status: validations.orderStatus,
  updatedAt: z.string().regex(NUMBER_REGEX).transform(parseUnixTimestamp),
  createdAt: z.string().regex(NUMBER_REGEX).transform(parseUnixTimestamp),
});

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
    const result = createOrderResult.safeParse(await post(
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
      return makeFail(handleApiError<CreateOrderParams>(e) || e);
    }

    return makeFail(e);
  }
}
