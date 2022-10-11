import {
  type SdkConfig,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  type RemoteRecommendations,
  type RemoteProduct,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';


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
}
