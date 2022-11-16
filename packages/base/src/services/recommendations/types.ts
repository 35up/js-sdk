import type {
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
