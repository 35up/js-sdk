type Logo = {
  square: string;
  landscape: string;
}

type Vendor = {
  id: string;
  name: string;
  legalName: string;
  logo: Logo;
}

type Price = {
  value: number;
  currency: string;
  formatted: string;
}

type Images = {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

type Descriptions = {
  short: string;
  long: string;
}

type Actions = {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

type Measurement = {
  unit: string;
  value: number;
}

type Delivery = {
  timeMin?: number;
  timeMax?: number;
  package?: {
    weight?: Measurement;
    width?: Measurement;
    height?: Measurement;
    length?: Measurement;
  }
}

type Specs = {
  type: string;
  materials?: string[];
  color?: string;
  weight?: Measurement;
  width?: Measurement;
  height?: Measurement;
  length?: Measurement;
};

type Tax = {
  code: string;
  type: string;
  base: string;
  rate: number;
  included: boolean;
}

export interface Product {
  sku: string;
  vendor: Vendor;
  name: string;
  price?: Price;
  images: Images;
  descriptions: Descriptions;
  categories: string[];
  actions: Actions;
  delivery: Delivery;
  specs?: Specs;
  gtin?: Record<string, string>;
  taxes: Tax[];
}

export type ServerProductDetails = {product: Product};
