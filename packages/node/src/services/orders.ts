import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { post } from '@35up/http-client';
import { SdkConfig, handleApiError, parseUnixTimestamp } from '@35up/js-sdk-base';
import {
  CreateOrderDetails,
  CreateOrderResult,
  ORDER_STATUS,
} from '../types';


type TCreateOrderResultRaw = {
  id: string;
  status: ORDER_STATUS;
  updatedAt: string;
  createdAt: string;
};

/**
 * This endpoint allows the partner to place an order on the 35up marketplace
 * and responds with a 35up order ID and a status update.
 */
export async function createOrder(
  details: CreateOrderDetails,
  config: SdkConfig,
): Promise<ResolvedRemoteData<CreateOrderResult>> {
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
      return makeFail(handleApiError<CreateOrderDetails>(e) || e);
    }

    return makeFail(e);
  }
}