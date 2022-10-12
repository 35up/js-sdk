import {
  type TSdkConfig,
  type TRemoteRecommendations,
  type TGetRecommendationsParams,
  type TGetProductDetailsParams,
  type TRemoteProduct,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import { TCreateOrderParams } from './types';
import {
  createOrder as createOrderService,
  TRemoteCreateOrderResult,
} from './services/orders';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: TSdkConfig;

  constructor(configuration: TSdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: TGetRecommendationsParams,
  ): Promise<TRemoteRecommendations> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async getProductDetails(
    input: TGetProductDetailsParams,
  ): Promise<TRemoteProduct> {
    return getProductService(input, this[configurationKey]);
  }

  async createOrder(
    details: TCreateOrderParams,
  ): Promise<TRemoteCreateOrderResult> {
    return createOrderService(details, this[configurationKey]);
  }
}
