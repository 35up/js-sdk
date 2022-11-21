import { z, ZodType, SafeParseError, ZodTypeDef } from 'zod';
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
import { RecommendationsData } from './types';


function invalidDroppingArray<T>(
  schema: ZodType<T>,
): ZodType<T[], ZodTypeDef, unknown> {
  return z.unknown().array().transform(
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
  taxes: tax.array().optional(),
  urls: z.record(z.string(), z.string()).optional(),
  actions: actions.optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  categories: z.string().array().optional(),
  tags: z.string().array().optional(),
});

export const recommendationsData: ZodType<
  RecommendationsData,
  ZodTypeDef,
  unknown
> = z.object({
  recommendations: invalidDroppingArray(productRecommendation),
});
