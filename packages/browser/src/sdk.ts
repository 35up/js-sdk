import {
  RecommendationParams,
  type SdkConfig,
  type TRemoteRecommendations,
  getProductRecommendationsService,
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
}
