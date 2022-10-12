// eslint-disable-next-line @typescript-eslint/naming-convention
type mixed = boolean | string | number | Record<string, unknown>;

export interface TBaseProduct {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  [x: string]: unknown;
}

export interface TCustomer {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  [x: string]: unknown;
}

export interface TSdkInitConfig {
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

export interface TSdkConfig extends TSdkInitConfig {
  session: string;
  apiUrl: string;
}

export interface TInputParams {
  session?: string;
}

export interface TGetRecommendationsParams extends TInputParams {
  baseProduct: TBaseProduct;
  customer?: TCustomer;
  lang?: string;
  country?: string;
  limit?: number;
}

export interface TGetProductDetailsParams {
  sku: string,
  lang?: string;
  country?: string;
}

export interface TLogo {
  square: string;
  landscape: string;
}

export interface TVendor {
  id: string;
  name: string;
  legalName: string;
  logo: TLogo;
}

export interface TPrice {
  value: number;
  currency: string;
  formatted: string;
  label?: string;
}

export interface TImages {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

export interface TDescriptions {
  short: string;
  long: string;
}

export interface TActions {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

export interface TValueWithUnit {
  unit: string;
  value: number;
}

export interface TDelivery {
  timeMin?: number;
  timeMax?: number;
  package?: {
    weight?: TValueWithUnit;
    width?: TValueWithUnit;
    height?: TValueWithUnit;
    length?: TValueWithUnit;
  }
}

export interface TSpecs {
  type: string;
  materials?: string[];
  color?: string;
  weight?: TValueWithUnit;
  width?: TValueWithUnit;
  height?: TValueWithUnit;
  length?: TValueWithUnit;
  contract?: {
    duration?: TValueWithUnit;
  }
}

export interface TGtin { [k: string]: string; }

export interface TTax {
  code: string;
  type: string;
  base: string;
  rate: number;
  included: boolean;
}

export interface TProductRecommendation {
  sku: string;
  vendor: TVendor;
  name: string;
  images: TImages;
  descriptions: TDescriptions;
  specs: TSpecs;
  delivery?: TDelivery;
  price?: TPrice;
  gtin?: TGtin;
  taxes?: TTax[];
  urls?: Record<string, string>;
  actions?: TActions;
  details?: Record<string, unknown>;
  categories?: string[];
  tags?: string[];
}

export interface TRecommendationsData {
  recommendations: TProductRecommendation[],
}
