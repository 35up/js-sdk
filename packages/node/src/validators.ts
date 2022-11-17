import { validation } from '@35up/js-sdk-base';
import { z } from 'zod';
import { ORDER_STATUS } from './types';


export const orderStatus = z.nativeEnum(ORDER_STATUS);

export const createOrderCustomer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

export const createOrderShippingAddress = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  street: z.string(),
  streetNumber: z.string(),
  extra: z.string().optional(),
  city: z.string(),
  postcode: z.string(),
  state: z.string().optional(),
  country: z.string(),
});

export const createOrderItem = z.object({
  sku: z.string(),
  qty: z.number(),
  config: z.record(z.string(), z.string()).optional(),
});

export const createOrderParams = validation.baseInputParams.extend({
  reference: z.string(),
  customer: createOrderCustomer,
  shippingAddress: createOrderShippingAddress.optional(),
  items: createOrderItem.array(),
});
