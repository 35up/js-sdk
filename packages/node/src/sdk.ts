import {
  type SdkConfig,
  type TRemoteRecommendations,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  type TRemoteProduct,
  getProductRecommendationsService,
  getProductService,
  validations,
  ArgumentValidationError,
} from '@35up/js-sdk-base';
import { makeFail } from '@35up/tslib-utils';
import { CreateOrderParams } from './types';
import {
  createOrder as createOrderService,
  TRemoteCreateOrderResult,
} from './services/orders';
import { createOrderParams } from './validations';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }


  async getProductRecommendations(
    input: GetRecommendationsParams,
  ): Promise<TRemoteRecommendations> {
    const validated = validations.getRecommendationsParams.safeParse(input);

    if (!validated.success) {
      return makeFail(new ArgumentValidationError(validated.error));
    }

    return getProductRecommendationsService(
      validated.data,
      this[configurationKey],
    );
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<TRemoteProduct> {
    const validated = validations.getProductDetailsParams.safeParse(input);

    if (!validated.success) {
      return makeFail(new ArgumentValidationError(validated.error));
    }

    return getProductService(validated.data, this[configurationKey]);
  }

  async createOrder(
    details: CreateOrderParams,
  ): Promise<TRemoteCreateOrderResult> {
    const validated = createOrderParams.safeParse(details);

    if (!validated.success) {
      return makeFail(new ArgumentValidationError(validated.error));
    }

    return createOrderService(details, this[configurationKey]);
  }
}
