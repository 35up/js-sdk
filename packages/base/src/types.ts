// eslint-disable-next-line @typescript-eslint/naming-convention
type mixed = boolean | string | number | Record<string, unknown>;

export interface BaseProduct {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  [x: string]: unknown;
}

export interface Customer {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  [x: string]: unknown;
}

export interface SdkInitConfig {
  seller: string;
  /**
   * A unique session ID which is used to connect several requests over time.
   * The unique session ID can be any unique string.
   */
  session?: string;
  /**
   * By default, this sdk interfaces with the API located at
   * https://api.35up.io/v1, but it can be configured to point to a sandbox
   * server, a proxy, or a mock implementation, by specifying another url
   */
  apiUrl?: string;
  lang?: string;
  country?: string;
}

export interface SdkConfig extends SdkInitConfig {
  session: string;
  apiUrl: string;
}

export interface BaseInputParams {
  session?: string;
}

export interface GetRecommendationsParams extends BaseInputParams {
  baseProduct: BaseProduct;
  customer?: Customer;
  lang?: string;
  country?: string;
  limit?: number;
}

export interface GetProductDetailsParams {
  sku: string,
  lang?: string;
  country?: string;
}
