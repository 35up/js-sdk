import { SdkInitConfig, SdkConfig } from './types';


export { createOrder as createOrderService } from './services/orders';
export {
  getProductRecommendations as getProductRecommendationsService,
  type TRemoteRecommendations,
} from './services/recommendations';

export type {
  SdkInitConfig,
  SdkConfig,
  RecommendationParams,
  CreateOrderDetails,
  CreateOrderResult,
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
} from './types';

export { ORDER_STATUS } from './types';
