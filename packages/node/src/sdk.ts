import {
  type SdkConfig,
  type RemoteRecommendations,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  type RemoteProduct,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import { CreateOrderParams } from './types';
import {
  createOrder as createOrderService,
  RemoteCreateOrderResult,
} from './services/orders';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: GetRecommendationsParams,
  ): Promise<RemoteRecommendations> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<RemoteProduct> {
    return getProductService(input, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderParams,
  ): Promise<RemoteCreateOrderResult> {
    return createOrderService(details, this[configurationKey]);
  }
}
