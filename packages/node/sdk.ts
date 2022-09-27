import { ResolvedRemoteData } from '@35up/tslib-utils';
import {
  CreateOrderDetails,
  CreateOrderResult,
  RecommendationParams,
  type SdkConfig,
  type TRemoteRecommendations,
  getProductRecommendationsService,
  createOrderService,
} from '@35up/js-sdk-base';


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
