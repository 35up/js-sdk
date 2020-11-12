type mixed = boolean | string | number | Record<string, unknown>;

export type BaseProduct = {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  [x: string]: unknown;
}

export type Customer = {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  [x: string]: unknown;
}

export type SdkInitConfig = {
  partner: string;
  session?: string;
  lang?: string;
  country?: string;
}

export type SdkConfig = SdkInitConfig & {
  session: string;
}

export type RecommendationParams = {
  baseProduct: BaseProduct;
  customer?: Customer;
  lang?: string;
  country?: string;
  limit?: number;
}

export type Logo = {
  square: string;
  landscape: string;
}

export type Vendor = {
  id: string;
  name: string;
  legalName: string;
  logo: Logo;
}

export type Price = {
  value: number;
  currency: string;
  formatted: string;
}

export type Images = {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

export type Descriptions = {
  short: string;
  long: string;
}

export type Actions = {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

export type Delivery = {
  timeMin?: number;
  timeMax?: number;
}

export type ProductRecommendation = {
  sku: string;
  vendor: Vendor;
  name: string;
  price: Price;
  images: Images;
  descriptions: Descriptions;
  actions: Actions;
  delivery: Delivery;
}
