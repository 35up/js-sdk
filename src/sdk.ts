import type { RecommendationParams, SdkConfig } from './types';
import { RemoteRecommendations, getProductRecommendations } from './services/recommendations';


const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: SdkConfig;

  constructor(configuration: SdkConfig) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParams,
  ): Promise<RemoteRecommendations> {
    return getProductRecommendations({
      ...this[configurationKey],
      ...input,
    });
  }
}
