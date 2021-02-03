import { nanoid } from 'nanoid';
import { SdkInitConfig } from './types';
import { Sdk } from './sdk';


export function initialise(configuration: SdkInitConfig): Sdk {
  // Not everybody using this uses typescript
  if (!('partner' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without a partner ID');
  }

  if (!('lang' in configuration) || !('country' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without '
      + 'a language and country');
  }

  return new Sdk({
    ...configuration,
    session: configuration.session ?? nanoid(),
  });
}

export {
  SdkInitConfig as SdkConfig,
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
