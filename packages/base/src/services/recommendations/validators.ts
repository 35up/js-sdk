import { z, ZodType } from 'zod';
import { SafeParseError, ZodTypeDef } from 'zod/lib/types';


function invalidDroppingArray<T>(
  schema: ZodType<T>,
): ZodType<T[], ZodTypeDef, unknown> {
  return z.array(z.unknown()).transform(
    (array, ctx) => array.filter((a): a is T => {
      const result = schema.safeParse(a, {path: ctx.path});

      if (!result.success) {
        console.warn(
          'item dropped: %o\n reason: %o',
          a,
          // for some reason TS is not type narrowing the error type
          (result as SafeParseError<unknown>).error,
        );

        return false;
      }

      return true;
    }),
  );
}

export const logo = z.object({
  square: z.string(),
  landscape: z.string(),
});

export const vendor = z.object({
  id: z.string(),
  name: z.string(),
  legalName: z.string(),
  logo,
});

export const price = z.object({
  value: z.number(),
  currency: z.string(),
  formatted: z.string(),
  label: z.string().optional(),
});

export const images = z.object({
  thumbnail: z.string(),
  small: z.string().optional(),
  medium: z.string().optional(),
  large: z.string().optional(),
});

export const descriptions = z.object({
  short: z.string(),
  long: z.string(),
});

export const actions = z.object({
  singleClickCheckout: z.string().optional(),
  addToCart: z.string(),
  deleteFromCart: z.string(),
  goToCart: z.string().optional(),
  goToCheckout: z.string(),
});

export const valueWithUnit = z.object({
  unit: z.string(),
  value: z.number(),
});

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

export const specs = z.object({
  type: z.string(),
  materials: z.array(z.string()).optional(),
  color: z.string().optional(),
  weight: valueWithUnit,
  width: valueWithUnit,
  height: valueWithUnit,
  length: valueWithUnit,
  contract: z.object({
    duration: valueWithUnit,
  }).optional(),
});

export const gtin = z.record(z.string(), z.string());

export const tax = z.object({
  code: z.string(),
  type: z.string(),
  base: z.string(),
  rate: z.number(),
  included: z.boolean(),
});

export const productRecommendation = z.object({
  sku: z.string(),
  vendor,
  name: z.string(),
  images,
  descriptions,
  specs,
  delivery: delivery.optional(),
  price: price.optional(),
  gtin: gtin.optional(),
  taxes: z.array(tax).optional(),
  urls: z.record(z.string(), z.string()).optional(),
  actions: actions.optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const recommendationsData = z.object({
  recommendations: invalidDroppingArray(productRecommendation),
});
