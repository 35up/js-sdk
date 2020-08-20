type mixed = boolean | string | number | Record<string, unknown>;
type lang = 'de' | 'en' | 'fr' | string;

interface BaseProduct {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

interface Customer {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export interface InputParameters {
  partner: string;
  session: string;
  lang?: lang;
  country?: string;
  limit?: number;
  baseProduct: BaseProduct;
  customer?: Customer;
}
