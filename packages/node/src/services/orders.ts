import { post } from '@35up/http-client';
import { transformApiError } from '@35up/js-sdk-base';
import {
  CreateOrderParams,
  CreateOrderResult,
  NodeSdkConfig,
} from '../types';
import { makeBasicAuthHeaders } from '../utils/make-basic-auth-headers';
import * as validations from './validations';


/**
 * This endpoint allows the seller to place an order on the 35up marketplace
 * and responds with a 35up order ID and a status update.
 */
export async function createOrder(
  details: CreateOrderParams,
  { apiUrl, credentials, session }: NodeSdkConfig,
): Promise<CreateOrderResult> {
  if (!credentials) {
    throw new Error('Credentials are not present in configuration');
  }

  try {
    const result = await post(
      `${apiUrl}/orders`,
      details,
      {params: {session}, headers: makeBasicAuthHeaders(credentials)},
    );
    return validations.createOrderResult.parse(result);
  } catch (e) {
    throw transformApiError(e);
  }
}
