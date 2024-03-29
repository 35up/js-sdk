import { nanoid } from 'nanoid';
import { SdkInitConfig } from '@35up/js-sdk-base';
import { Sdk, SdkWithoutCredentials } from './src/sdk';
import { NodeSdkInitConfig } from './src/types';
import { validateCredentials } from './src/utils/validate-credentials';


// If initialize function is called without credentials, then returned instance
// would require them for createOrder method
export function initialise(configuration: SdkInitConfig): SdkWithoutCredentials;
export function initialise(configuration: NodeSdkInitConfig): Sdk;
export function initialise(configuration: NodeSdkInitConfig): Sdk {
  // Not everybody using this uses typescript
  if (!('seller' in configuration)) {
    throw new TypeError('Cannot initialise the 35up SDK without a seller ID');
  }

  if (configuration.credentials) {
    const error = validateCredentials(configuration.credentials);

    if (error) throw error;
  }


  return new Sdk({
    ...configuration,
    session: configuration.session || nanoid(),
    apiUrl: configuration.apiUrl || 'https://api.35up.io/v1',
  });
}

export {
  /* istanbul ignore next */
  BadParamsError,
  /* istanbul ignore next */
  ValidationError,
} from '@35up/js-sdk-base';

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
  /* istanbul ignore next */
  ORDER_STATUS,
  type CreateOrderParams,
  type CreateOrderResult,
} from './src/types';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThirtyFiveUp extends Sdk {}
