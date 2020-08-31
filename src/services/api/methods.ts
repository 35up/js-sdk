import { createMethod } from '@caseable/http-client';


const { PRODUCTS_API } = process.env;

export const get = createMethod('GET', PRODUCTS_API);

export const post = createMethod('POST', PRODUCTS_API);

export const put = createMethod('PUT', PRODUCTS_API);

export const patch = createMethod('PATCH', PRODUCTS_API);

