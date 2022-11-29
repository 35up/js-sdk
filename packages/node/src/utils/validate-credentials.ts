import { Credentials } from '../types';


export function validateCredentials(
  credentials: Credentials,
): Error | undefined {
  if (!credentials.username || !credentials.password) {
    return TypeError(
      'Invalid credentials provided. `username` and `password` must be present',
    );
  }

  return undefined;
}
