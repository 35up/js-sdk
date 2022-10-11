import {
  RecommendationParams,
  type SdkConfig,
  type RemoteRecommendations,
  getProductRecommendationsService,
  type GetProductDetailsParams,
  type RemoteProduct,
  getProductService,
} from '@35up/js-sdk-base';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParams,
  ): Promise<RemoteRecommendations> {
    return getProductRecommendationsService(input, this[configurationKey]);
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<RemoteProduct> {
    return getProductService(input, this[configurationKey]);
  }
}
