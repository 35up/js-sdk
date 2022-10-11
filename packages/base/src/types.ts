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
  partner: string;
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
  lang: string;
  country: string;
}

export interface SdkConfig extends SdkInitConfig {
  session: string;
  apiUrl: string;
}

export interface InputParams {
  session?: string;
}

export interface GetRecommendationsParams extends InputParams {
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

export interface Logo {
  square: string;
  landscape: string;
}

export interface Vendor {
  id: string;
  name: string;
  legalName: string;
  logo: Logo;
}

export interface Price {
  value: number;
  currency: string;
  formatted: string;
  label?: string;
}

export interface Images {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

export interface Descriptions {
  short: string;
  long: string;
}

export interface Actions {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

export interface ValueWithUnit {
  unit: string;
  value: number;
}

export interface Delivery {
  timeMin?: number;
  timeMax?: number;
  package?: {
    weight?: ValueWithUnit;
    width?: ValueWithUnit;
    height?: ValueWithUnit;
    length?: ValueWithUnit;
  }
}

export interface Specs {
  type: string;
  materials?: string[];
  color?: string;
  weight?: ValueWithUnit;
  width?: ValueWithUnit;
  height?: ValueWithUnit;
  length?: ValueWithUnit;
  contract?: {
    duration?: ValueWithUnit;
  }
}

export interface Gtin { [k: string]: string; }

export interface Tax {
  code: string;
  type: string;
  base: string;
  rate: number;
  included: boolean;
}

export interface ProductRecommendation {
  sku: string;
  vendor: Vendor;
  name: string;
  images: Images;
  descriptions: Descriptions;
  specs: Specs;
  delivery?: Delivery;
  price?: Price;
  gtin?: Gtin;
  taxes?: Tax[];
  urls?: Record<string, string>;
  actions?: Actions;
  details?: Record<string, unknown>;
  categories?: string[];
  tags?: string[];
}

export interface RecommendationsData {
  recommendations: ProductRecommendation[],
}
