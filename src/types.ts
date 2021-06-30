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
  session?: string;
  lang: string;
  country: string;
}

export interface SdkConfig extends SdkInitConfig {
  session: string;
}

export interface RecommendationParams {
  baseProduct: BaseProduct;
  customer?: Customer;
  lang?: string;
  country?: string;
  limit?: number;
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

export interface Delivery {
  timeMin?: number;
  timeMax?: number;
}

export interface ProductRecommendation {
  sku: string;
  vendor: Vendor;
  name: string;
  price: Price;
  images: Images;
  descriptions: Descriptions;
  actions: Actions;
  delivery: Delivery;
}

export interface RecommendationsData {
  recommendations: ProductRecommendation[],
}
