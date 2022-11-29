import { nanoid } from 'nanoid';
import { Sdk } from './src/sdk';
import { NodeSdkInitConfig } from './src/types';
import { validateCredentials } from './src/utils/validate-credentials';


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
  BadParamsError,
  ValidationError,
  ArgumentValidationError,
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
  ORDER_STATUS,
  type CreateOrderParams,
  type CreateOrderResult,
} from './src/types';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThirtyFiveUp extends Sdk {}
