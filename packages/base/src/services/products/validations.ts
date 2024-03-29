import { z } from 'zod';
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
} from '../../validations';


export const product = z.object({
  name: z.string(),
  sku: z.string(),
  vendor,
  price: price.optional(),
  actions: actions.optional(),
  descriptions,
  images,
  delivery,
  categories: z.string().array(),
  taxes: tax.array(),
  gtin: gtin.optional(),
  specs: specs.optional(),
});
export type TProduct = z.infer<typeof product>
