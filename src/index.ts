import { nanoid } from 'nanoid';
import { SDKConfiguration, SDKInitializationConfiguration } from './types';


const configurationKey = Symbol('configuration');

export class ThirtyFiveUp {
  [configurationKey]: SDKConfiguration;

  constructor(configuration: SDKConfiguration) {
    this[configurationKey] = configuration;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getProductRecommendations(): void {
  }
}

export function initialise(
  configuration: SDKInitializationConfiguration,
): ThirtyFiveUp {
  // Not everybody using this uses typescript
  if (!('partner' in configuration)) {
    throw new TypeError('Cannot initialize the 35up SDK without a partner ID');
  }

  return new ThirtyFiveUp({
    ...configuration,
    session: configuration.session ?? nanoid(),
  });
}
