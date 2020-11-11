import { nanoid } from 'nanoid';
import { SDKInitializationConfiguration } from './types';
import { ThirtyFiveUp } from './thirty-five-up';


export function initialise(
  configuration: SDKInitializationConfiguration,
): ThirtyFiveUp {
  // Not everybody using this uses typescript
  if (!('partner' in configuration)) {
    throw new TypeError('Cannot initialize the 35up SDK without a partner ID');
  }

  return new ThirtyFiveUp({
    ...configuration,
    session: configuration.session ?? nanoid(),
  });
}


export {
  SDKInitializationConfiguration as SDKConfiguration,
  RecommendationParameters,
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
