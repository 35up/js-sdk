import { get } from '@35up/http-client';
import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { SdkConfig } from '../../types';
import type { Product, TServerProductDetails } from './products-types';
import { validateProduct } from './products-validation';


export interface GetProductDetailsParams {
  sku: string,
  lang?: string;
  country?: string;
}
export type TRemoteProduct = ResolvedRemoteData<Product>;

export async function getProduct(
  params: GetProductDetailsParams,
  sdkConfig: SdkConfig,
): Promise<TRemoteProduct> {
  try {
    const { sku, ...restParams } = params;
    const searchParams = new URLSearchParams({
      partner: sdkConfig.partner,
      ...restParams,
    });
    const { product }: TServerProductDetails = await get(
      `${sdkConfig.apiUrl}/products/${encodeURIComponent(sku)}?${searchParams}`,
    );

    return makeSuccess(validateProduct(product));
  } catch (e) {
    return makeFail(e as Error);
  }
}
