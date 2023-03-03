import { z } from 'zod';
import { parseUnixTimestamp } from '@35up/js-sdk-base';
import { ORDER_STATUS } from '../types';


const NUMBER_REGEX = /^\d+$/;

export const createOrderResult = z.object({
  id: z.string(),
  status: z.nativeEnum(ORDER_STATUS),
  updatedAt: z.string().regex(NUMBER_REGEX).transform(parseUnixTimestamp),
  createdAt: z.string().regex(NUMBER_REGEX).transform(parseUnixTimestamp),
});
export type TCreateOrderResult = z.infer<typeof createOrderResult>
