import {
  type TSdkConfig,
  type TGetRecommendationsParams,
  type TGetProductDetailsParams,
  type TRemoteRecommendations,
  type TRemoteProduct,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';


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
}
