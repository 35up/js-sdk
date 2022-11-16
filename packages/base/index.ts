export { parseUnixTimestamp } from './src/utils';
export { handleApiError, type BadParamsError } from './src/errors';
export * as validators from './src/validators';
export {
  getProductRecommendations as getProductRecommendationsService,
  type TRemoteRecommendations,
} from './src/services/recommendations';
export {
  getProduct as getProductService,
  type TRemoteProduct,
} from './src/services/products';

export type {
  SdkInitConfig,
  SdkConfig,
  BaseInputParams,
  GetRecommendationsParams,
  GetProductDetailsParams,
  BaseProduct,
  Customer,
} from './src/types';
export type {
  ProductRecommendation,
  Tax,
  Gtin,
  Specs,
  Delivery,
  Actions,
  Descriptions,
  Images,
  Price,
  Vendor,
  Logo,
} from './src/services/recommendations';
