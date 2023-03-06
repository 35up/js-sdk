import {
  type ProductRecommendation,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  type Product,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import type {
  CreateOrderParams,
  CreateOrderResult,
  Credentials,
  NodeSdkConfig,
} from './types';
import {
  createOrder as createOrderService,
} from './services/orders';
import { validateCredentials } from './utils/validate-credentials';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: NodeSdkConfig;

  constructor(configuration: NodeSdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: GetRecommendationsParams,
  ): Promise<ProductRecommendation[]> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<Product> {
    return getProductService(input, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderParams,
    credentials?: Credentials,
  ): Promise<CreateOrderResult> {
    const config = this[configurationKey];

    if (credentials) {
      const error = validateCredentials(credentials);

      if (error) throw error;
    }

    return createOrderService(
      details,
      credentials ? {...config, credentials} : config,
    );
  }
}

export interface SdkWithoutCredentials extends Sdk {
  createOrder(
    details: CreateOrderParams,
    credentials: Credentials,
  ): Promise<CreateOrderResult>;
}
