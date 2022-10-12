import { nanoid } from 'nanoid';
import { TSdkInitConfig } from '@35up/js-sdk-base';
import { Sdk } from './src/sdk';


export function initialise(configuration: TSdkInitConfig): Sdk {
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
  TSdkInitConfig as TSdkConfig,
  TGetRecommendationsParams,
  TProductRecommendation,
  TBaseProduct,
  TActions,
  TCustomer,
  TDelivery,
  TDescriptions,
  TImages,
  TLogo,
  TPrice,
  TVendor,
  TSpecs,
  TGtin,
  TTax,
} from '@35up/js-sdk-base';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThirtyFiveUp extends Sdk {}
