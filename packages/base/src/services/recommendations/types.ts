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

export interface Gtin {
  [k: string]: string;
}

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
