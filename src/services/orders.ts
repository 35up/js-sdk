import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-frontend-utils';
import {
  CreateOrderDetails,
  CreateOrderResult,
  ORDER_STATUS,
  SdkConfig,
} from '../types';
import { post } from './api/methods';
import { handleApiError } from '../errors';
import { parseUnixTimestamp } from '../utils';


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
      `/orders?session=${encodeURIComponent(config.session)}`,
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
