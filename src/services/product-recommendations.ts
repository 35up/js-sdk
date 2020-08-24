import { HttpError } from '@caseable/http-client';
import { get } from './api/methods';
import { Result } from '../utils/result';


export async function getProductRecommendations(
  params: string,
): Promise<Result<any, HttpError>> {
  try {
    const recommendations = await get(`/recommendations${params}`);

    return [null, recommendations];
  } catch (e) {
    return [e, null];
  }
}
