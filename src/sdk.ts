import type { RecommendationParams, SdkConfig } from './types';
import { TRemoteRecommendations, getProductRecommendations } from './services/recommendations';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParams,
  ): Promise<TRemoteRecommendations> {
    return getProductRecommendations({
      ...this[configurationKey],
      ...input,
    });
  }
}
