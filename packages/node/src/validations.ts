import { z } from 'zod';
import { ORDER_STATUS } from './types';


export const orderStatus = z.nativeEnum(ORDER_STATUS);
