import { ResolvedRemoteData } from '@35up/tslib-frontend-utils';
import type {
  CreateOrderDetails,
  CreateOrderResult,
  RecommendationParams,
  SdkConfig,
} from './types';
import { TRemoteRecommendations, getProductRecommendations } from './services/recommendations';
import { createOrder } from './services/orders';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParams,
  ): Promise<TRemoteRecommendations> {
    return getProductRecommendations(input, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderDetails,
  ): Promise<ResolvedRemoteData<CreateOrderResult>> {
    return createOrder(details, this[configurationKey]);
  }
}
