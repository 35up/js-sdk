import { SdkInitConfig } from '@35up/js-sdk-base';
import { Sdk } from './src/sdk';


export function initialise(configuration: SdkInitConfig): Sdk {
  // Not everybody using this uses typescript
  if (!('seller' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without a seller ID');
  }

  return new Sdk({
    ...configuration,
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThirtyFiveUp extends Sdk {}
