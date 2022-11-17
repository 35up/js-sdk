import { z, ZodError } from 'zod';
import { get } from '@35up/http-client';
import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { SdkConfig, GetProductDetailsParams } from '../../types';
import type { Product } from './types';
import * as validation from './validations';
import { ValidationError } from '../../errors';


export type TRemoteProduct = ResolvedRemoteData<Product>;

export async function getProduct(
  params: GetProductDetailsParams,
  sdkConfig: SdkConfig,
): Promise<TRemoteProduct> {
  try {
    const { sku, ...restParams } = params;
    const searchParams = new URLSearchParams({
      seller: sdkConfig.seller,
      ...restParams,
    });
    const { product } = z.object({product: validation.product}).parse(await get(
      `${sdkConfig.apiUrl}/products/${encodeURIComponent(sku)}?${searchParams}`,
    ));

    return makeSuccess(product);
  } catch (e) {
    if (e instanceof ZodError) {
      return makeFail(new ValidationError(
        'Data from the API is not what we expected. Please contact support,',
        e,
      ));
    }

    return makeFail(e as Error);
  }
}
