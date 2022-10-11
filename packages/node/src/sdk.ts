import { ResolvedRemoteData } from '@35up/tslib-utils';
import {
  RecommendationParams,
  type SdkConfig,
  type TRemoteRecommendations,
  getProductRecommendationsService,
} from '@35up/js-sdk-base';
import {
  CreateOrderDetails,
  CreateOrderResult,
} from './types';
import { createOrder as createOrderService } from './services/orders';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParams,
  ): Promise<TRemoteRecommendations> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderDetails,
  ): Promise<ResolvedRemoteData<CreateOrderResult>> {
    return createOrderService(details, this[configurationKey]);
  }
}
