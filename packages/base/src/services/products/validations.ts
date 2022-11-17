import { z, ZodType, ZodTypeDef } from 'zod';
import {
  actions,
  delivery,
  descriptions,
  gtin,
  images,
  price,
  specs,
  tax,
  vendor,
} from '../../validators';
import type { Product } from './types';


export const product: ZodType<Product, ZodTypeDef, unknown> = z.object({
  name: z.string(),
  sku: z.string(),
  vendor,
  price: price.optional(),
  actions,
  descriptions,
  images,
  delivery,
  categories: z.string().array(),
  taxes: tax.array(),
  gtin: gtin.optional(),
  specs: specs.optional(),
});
