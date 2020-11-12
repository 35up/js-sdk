import { nanoid } from 'nanoid';
import { SDKInitConfig } from './types';
import { Sdk } from './sdk';


export function initialise(configuration: SDKInitConfig): Sdk {
  // Not everybody using this uses typescript
  if (!('partner' in configuration)) {
    throw new TypeError('Cannot initialize the 35up SDK without a partner ID');
  }

  return new Sdk({
    ...configuration,
    session: configuration.session ?? nanoid(),
  });
}

export {
  SDKInitConfig as SDKConfig,
  RecommendationParams,
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
} from './types';

export type ThirtyFiveUp = Sdk;
