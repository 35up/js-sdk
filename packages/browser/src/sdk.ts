import { nanoid } from 'nanoid';
import { makeFail } from '@35up/tslib-utils';
import {
  type GetProductDetailsParams,
  getProductRecommendationsService,
  getProductService,
  validations,
  type GetRecommendationsParams,
  type SdkConfig,
  type TRemoteProduct,
  type TRemoteRecommendations,
  ArgumentValidationError,
} from '@35up/js-sdk-base';


interface BrowserSdkConfig extends Omit<SdkConfig, 'session'> {
  session?: string;
}

export const SESSION_LOCAL_STORAGE_KEY = '35up-session';

export const configurationKey = Symbol('configuration');

export class Sdk {
  private [configurationKey]: BrowserSdkConfig;

  constructor(configuration: BrowserSdkConfig) {
    this[configurationKey] = configuration;
  }

  private getDefaultSession() {
    let sessionId = window.localStorage.getItem(SESSION_LOCAL_STORAGE_KEY);

    if (!sessionId) {
      sessionId = nanoid(32);
      window.localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, sessionId);
    }

    return sessionId;
  }

  private getConfig(): SdkConfig {
    const { session, ...otherConfig } = this[configurationKey];

    return {
      ...otherConfig,
      session: session || this.getDefaultSession(),
    };
  }

  resetSession(): void {
    window.localStorage.removeItem(SESSION_LOCAL_STORAGE_KEY);
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
      this.getConfig(),
    );
  }

  async getProductDetails(
    input: GetProductDetailsParams,
  ): Promise<TRemoteProduct> {
    const validated = validations.getProductDetailsParams.safeParse(input);

    if (!validated.success) {
      return makeFail(new ArgumentValidationError(validated.error));
    }

    return getProductService(validated.data, this.getConfig());
  }
}
