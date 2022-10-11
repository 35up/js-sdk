import { SdkInitConfig, SdkConfig } from './src/types';


export { parseUnixTimestamp } from './src/utils';
export { handleApiError, type BadParamsError } from './src/errors';
export {
  getProductRecommendations as getProductRecommendationsService,
  type TRemoteRecommendations,
} from './src/services/recommendations';
export {
  getProduct as getProductService,
  type GetProductDetailsParams,
  type TRemoteProduct,
} from './src/services/products';

export type {
  SdkInitConfig,
  SdkConfig,
  InputParams,
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
  Specs,
  Gtin,
  Tax,
} from './src/types';
