import { TSdkInitConfig, TSdkConfig } from './src/types';


export { parseUnixTimestamp } from './src/utils';
export { handleApiError, type BadParamsError } from './src/errors';
export {
  getProductRecommendations as getProductRecommendationsService,
  type TRemoteRecommendations,
} from './src/services/recommendations';
export {
  getProduct as getProductService,
  type TRemoteProduct,
} from './src/services/products';

export type {
  TSdkInitConfig,
  TSdkConfig,
  TInputParams,
  TGetRecommendationsParams,
  TGetProductDetailsParams,
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
} from './src/types';
