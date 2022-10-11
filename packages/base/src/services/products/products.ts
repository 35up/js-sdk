import { get } from '@35up/http-client';
import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { SdkConfig } from '../../types';
import type { Product, TServerProductDetails } from './products-types';
import { validateProduct } from './products-validation';


interface GetProductDetailsParams {
  lang?: string;
  country?: string;
}

export async function getProduct(
  sku: string,
  sdkConfig: SdkConfig,
  params: GetProductDetailsParams = {},
): Promise<ResolvedRemoteData<Product>> {
  try {
    const searchParams = new URLSearchParams({
      partner: sdkConfig.partner,
      ...params,
    });
    const { product }: TServerProductDetails = await get(
      `${sdkConfig.apiUrl}/products/${encodeURIComponent(sku)}?${searchParams}`,
    );

    return makeSuccess(validateProduct(product));
  } catch (e) {
    return makeFail(e as Error);
  }
}
