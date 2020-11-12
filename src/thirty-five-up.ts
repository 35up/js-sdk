import type { RecommendationParams, SDKConfig } from './types';
import { RemoteRecommendations, getProductRecommendations } from './services/recommendations';


const configurationKey = Symbol('configuration');

export class ThirtyFiveUp {
  private [configurationKey]: SDKConfig;

  constructor(configuration: SDKConfig) {
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
