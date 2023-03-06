export { parseUnixTimestamp } from './src/utils';
export {
  transformApiError,
  BadParamsError,
  ValidationError,
} from './src/errors';
export * as validations from './src/validations';
export {
  getProductRecommendations as getProductRecommendationsService,
  type TRemoteRecommendations,
} from './src/services/recommendations';
export {
  getProduct as getProductService,
  type Product,
} from './src/services/products';

export type {
  SdkInitConfig,
  SdkConfig,
  BaseInputParams,
  GetRecommendationsParams,
  GetProductDetailsParams,
  BaseProduct,
  Customer,
  Vendor,
  Logo,
  Descriptions,
  Images,
  Tax,
  Gtin,
  Specs,
  Delivery,
  Actions,
  Price,
} from './src/types';
export type { ProductRecommendation } from './src/services/recommendations';
