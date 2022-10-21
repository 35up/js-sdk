import { nanoid } from 'nanoid';
import { SdkInitConfig } from '@35up/js-sdk-base';
import { Sdk } from './src/sdk';


export function initialise(configuration: SdkInitConfig): Sdk {
  // Not everybody using this uses typescript
  if (!('seller' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without a seller ID');
  }

  if (!('lang' in configuration) || !('country' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without '
      + 'a language and country');
  }

  return new Sdk({
    ...configuration,
    session: configuration.session || nanoid(),
    apiUrl: configuration.apiUrl || 'https://api.35up.io/v1',
  });
}

export type {
  SdkInitConfig as SdkConfig,
  GetRecommendationsParams,
  ProductRecommendation,
  BaseProduct,
  Actions,
  Customer,
  Delivery,
  Descriptions,
  Images,
  Logo,
  Price,
  Vendor,
  Specs,
  Gtin,
  Tax,
} from '@35up/js-sdk-base';

export {
  ORDER_STATUS,
  type CreateOrderParams,
  type CreateOrderResult,
} from './src/types';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThirtyFiveUp extends Sdk {}
