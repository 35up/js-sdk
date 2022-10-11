type TLogo = {
  square: string;
  landscape: string;
}

type TVendor = {
  id: string;
  name: string;
  legalName: string;
  logo: TLogo;
}

type TPrice = {
  value: number;
  currency: string;
  formatted: string;
}

type TImages = {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

type TDescriptions = {
  short: string;
  long: string;
}

type TActions = {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

type TMeasurement = {
  unit: string;
  value: number;
}

type TDelivery = {
  timeMin?: number;
  timeMax?: number;
  package?: {
    weight?: TMeasurement;
    width?: TMeasurement;
    height?: TMeasurement;
    length?: TMeasurement;
  }
}

type TSpecs = {
  type: string;
  materials?: string[];
  color?: string;
  weight?: TMeasurement;
  width?: TMeasurement;
  height?: TMeasurement;
  length?: TMeasurement;
};

type TTax = {
  code: string;
  type: string;
  base: string;
  rate: number;
  included: boolean;
}

export interface Product {
  sku: string;
  vendor: TVendor;
  name: string;
  price?: TPrice;
  images: TImages;
  descriptions: TDescriptions;
  categories: string[];
  actions: TActions;
  delivery: TDelivery;
  specs?: TSpecs;
  gtin?: Record<string, string>;
  taxes: TTax[];
}

export type TServerProductDetails = {product: Product};
