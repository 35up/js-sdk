import { z } from 'zod';


const mixed = z.boolean()
  .or(z.string())
  .or(z.number())
  .or(z.record(z.string(), z.unknown()));

export const baseProduct = z.object({
  title: z.string(),
  price: z.number().optional(),
  value: z.number().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  tag: mixed.optional(),
}).and(z.record(z.string(), z.unknown()));

export const customer = z.object({
  age: z.number().or(z.tuple([z.number(), z.number()])).optional(),
  gender: z.string().optional(),
  postcode: z.number().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
}).and(z.record(z.string(), z.unknown()));

export const sdkInitConfig = z.object({
  seller: z.string(),
  session: z.string().optional(),
  apiUrl: z.string().optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
});

export const baseInputParams = z.object({
  session: z.string().optional(),
});

export const getRecommendationsParams = baseInputParams.extend({
  baseProduct,
  customer: customer.optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
  limit: z.string().optional(),
});

export const getProductDetailsParams = z.object({
  sku: z.string(),
  lang: z.string().optional(),
  country: z.string().optional(),
});

