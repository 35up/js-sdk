import {
  type SdkConfig,
  type TRemoteRecommendations,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  type TRemoteProduct,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import { CreateOrderParams } from './types';
import {
  createOrder as createOrderService,
  TRemoteCreateOrderResult,
} from './services/orders';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: GetRecommendationsParams,
  ): Promise<TRemoteRecommendations> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<TRemoteProduct> {
    return getProductService(input, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderParams,
  ): Promise<TRemoteCreateOrderResult> {
    return createOrderService(details, this[configurationKey]);
  }
}
