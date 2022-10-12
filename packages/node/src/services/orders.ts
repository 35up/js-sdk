import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { post } from '@35up/http-client';
import { TSdkConfig, handleApiError, parseUnixTimestamp } from '@35up/js-sdk-base';
import {
  TCreateOrderParams,
  TCreateOrderResult,
  ORDER_STATUS,
} from '../types';


type TCreateOrderResultRaw = {
  id: string;
  status: ORDER_STATUS;
  updatedAt: string;
  createdAt: string;
};
export type TRemoteCreateOrderResult = ResolvedRemoteData<TCreateOrderResult>;

/**
 * This endpoint allows the seller to place an order on the 35up marketplace
 * and responds with a 35up order ID and a status update.
 */
export async function createOrder(
  details: TCreateOrderParams,
  config: TSdkConfig,
): Promise<TRemoteCreateOrderResult> {
  try {
    const result: TCreateOrderResultRaw = await post(
      `${config.apiUrl}/orders?session=${encodeURIComponent(config.session)}`,
      details,
    );

    return makeSuccess({
      id: result.id,
      status: result.status,
      updatedAt: parseUnixTimestamp(result.updatedAt),
      createdAt: parseUnixTimestamp(result.createdAt),
    });
  } catch (e) {
    if (e.response) {
      return makeFail(handleApiError<TCreateOrderParams>(e) || e);
    }

    return makeFail(e);
  }
}
