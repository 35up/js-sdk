import { createMethod } from '@caseable/http-client';


const { PRODUCTS_API } = process.env;

export const get = createMethod('GET', PRODUCTS_API);
