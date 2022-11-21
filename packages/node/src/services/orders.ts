import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { post } from '@35up/http-client';
import {
  SdkConfig,
  ValidationError,
  handleApiError,
  parseUnixTimestamp,
} from '@35up/js-sdk-base';
import { z } from 'zod';
import { CreateOrderParams, CreateOrderResult } from '../types';
import { orderStatus } from '../validations';


const NUMBER_REGEX = /^\d+$/;

export const createOrderResult = z.object({
  id: z.string(),
  status: orderStatus,
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
  config: SdkConfig,
): Promise<TRemoteCreateOrderResult> {
  try {
    const result = createOrderResult.safeParse(await post(
      `${config.apiUrl}/orders?session=${encodeURIComponent(config.session)}`,
      details,
    ));

    if (!result.success) {
      return makeFail(new ValidationError(
        'The API response does not match the expected scheme. Please contact support',
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
