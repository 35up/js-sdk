import { Credentials } from '../types';


export function makeBasicAuthHeaders(
  credentials: Credentials,
): {authorization: `Basic ${string}`} {
  return {
    authorization: `Basic ${Buffer.from(
      `${credentials.username}:${credentials.password}`,
    ).toString('base64')}`,
  };
}
