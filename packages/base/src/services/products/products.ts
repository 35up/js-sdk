import { z } from 'zod';
import { get } from '@35up/http-client';
import {
  stripUndefined,
} from '@35up/tslib-utils';
import { SdkConfig, GetProductDetailsParams } from '../../types';
import type { Product } from './types';
import * as validations from './validations';
import { transformApiError } from '../../errors';


export async function getProduct(
  params: GetProductDetailsParams,
  sdkConfig: SdkConfig,
): Promise<Product> {
  try {
    const { sku, ...restParams } = params;
    const searchParams = new URLSearchParams({
      seller: sdkConfig.seller,
      ...stripUndefined(restParams),
    });

    const result = await get(
      `${sdkConfig.apiUrl}/products/${encodeURIComponent(sku)}?${searchParams}`,
    );
    const { product } = z.object({product: validations.product}).parse(result);

    return product;
  } catch (e) {
    throw transformApiError(e);
  }
}
