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
export type TBaseProduct = z.infer<typeof baseProduct>

export const customer = z.object({
  age: z.number().or(z.tuple([z.number(), z.number()])).optional(),
  gender: z.string().optional(),
  postcode: z.number().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
}).and(z.record(z.string(), z.unknown()));
export type TCustomer = z.infer<typeof customer>

export const logo = z.object({
  square: z.string(),
  landscape: z.string(),
});
export type TLogo = z.infer<typeof logo>

export const vendor = z.object({
  id: z.string(),
  name: z.string(),
  legalName: z.string(),
  logo,
});
export type TVender = z.infer<typeof vendor>

export const valueWithUnit = z.object({
  unit: z.string(),
  value: z.number(),
});
export type TValueWithUnit = z.infer<typeof valueWithUnit>

export const price = z.object({
  value: z.number(),
  currency: z.string(),
  formatted: z.string(),
  label: z.string().optional(),
});
export type TPrice = z.infer<typeof price>

export const images = z.object({
  thumbnail: z.string(),
  small: z.string().optional(),
  medium: z.string().optional(),
  large: z.string().optional(),
});
export type TImages = z.infer<typeof images>

export const descriptions = z.object({
  short: z.string(),
  long: z.string(),
});
export type TDescriptions = z.infer<typeof descriptions>

export const actions = z.object({
  singleClickCheckout: z.string().optional(),
  addToCart: z.string().optional(),
  deleteFromCart: z.string().optional(),
  goToCart: z.string().optional(),
  goToCheckout: z.string().optional(),
});
export type TActions = z.infer<typeof actions>

export const delivery = z.object({
  timeMin: z.number().optional(),
  timeMax: z.number().optional(),
  package: z.object({
    weight: valueWithUnit,
    width: valueWithUnit,
    height: valueWithUnit,
    length: valueWithUnit,
  }).optional(),
});
export type TDelivery = z.infer<typeof delivery>

export const specs = z.object({
  type: z.string(),
  materials: z.string().array().optional(),
  color: z.string().optional(),
  weight: valueWithUnit.optional(),
  width: valueWithUnit.optional(),
  height: valueWithUnit.optional(),
  length: valueWithUnit.optional(),
  contract: z.object({
    duration: valueWithUnit,
  }).optional(),
});
export type TSpecs = z.infer<typeof specs>

export const gtin = z.record(z.string(), z.string());
export type TGtin = z.infer<typeof gtin>

export const tax = z.object({
  code: z.string(),
  type: z.string(),
  base: z.string(),
  rate: z.number(),
  included: z.boolean(),
});
export type TTax = z.infer<typeof tax>
