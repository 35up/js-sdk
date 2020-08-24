import { createMethod } from '@caseable/http-client';


const BASE_URL = 'https://products.35up.com/';

export const get = createMethod('GET', BASE_URL);

export const post = createMethod('POST', BASE_URL);

export const put = createMethod('PUT', BASE_URL);

export const patch = createMethod('PATCH', BASE_URL);

