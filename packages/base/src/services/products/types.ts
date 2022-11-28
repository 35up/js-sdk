import {
  Actions,
  Delivery,
  Descriptions,
  Gtin,
  Images,
  Price,
  Specs,
  Tax,
  Vendor,
} from '../../types';


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
  gtin?: Gtin;
  taxes: Tax[];
}
