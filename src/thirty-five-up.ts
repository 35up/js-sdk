import type { RecommendationParameters, SDKConfiguration } from './types';
import { RemoteRecommendations, getProductRecommendations } from './services/recommendations';


const configurationKey = Symbol('configuration');

export class ThirtyFiveUp {
  [configurationKey]: SDKConfiguration;

  constructor(configuration: SDKConfiguration) {
    this[configurationKey] = configuration;
  }

  async getProductRecommendations(
    input: RecommendationParameters,
  ): Promise<RemoteRecommendations> {
    return getProductRecommendations({
      ...this[configurationKey],
      ...input,
    });
  }
}
