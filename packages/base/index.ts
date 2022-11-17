export { parseUnixTimestamp } from './src/utils';
export {
  handleApiError,
  BadParamsError,
  ValidationError,
  ArgumentValidationError,
} from './src/errors';
export * as validations from './src/validators';
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
