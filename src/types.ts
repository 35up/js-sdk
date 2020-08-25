export type TObject = Record<string, unknown>;
type mixed = boolean | string | number | TObject;

export type BaseProduct = {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  [x: string]: unknown;
}

type Customer = {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  [x: string]: unknown;
}

export type InputParameters = {
  partner: string;
  session: string;
  lang?: string;
  country?: string;
  limit?: number;
  baseProduct: BaseProduct;
  customer?: Customer;
}
