import { makeFail, makeSuccess, RemoteData } from '@caseable/tslib-frontend-utils';
import { ProductRecommendation, RecommendationParams, SdkConfig } from '../types';
import { get } from './api/methods';


export type RemoteRecommendations = RemoteData<ProductRecommendation[]>;
type Params = SdkConfig & RecommendationParams;


function flattenInput(
  input: Record<string, unknown>,
  keyPrefix = '',
): Array<[string, string]> {
  let result: Array<[string, string]> = [];

  Object.entries(input).forEach(([ prop, value ]) => {
    const key = `${keyPrefix}${prop}`;

    if (Array.isArray(value)) {
      if (prop === 'age') {
        if (value.length !== 2) {
          console.warn(
            `age range expects 2 values. Received: ${value.length}`,
          );
        }
        const from = encodeURIComponent(value[0]);
        const to = encodeURIComponent(value[1]);
        result.push([key, `${from}-${to}`]);
      } else {
        result.push([key, value.map(encodeURIComponent).join(',')]);
      }
    } else if (value && typeof value === 'object') {
      const subArrays = flattenInput(value as Record<string, unknown>, `${key}.`);
      result = [...result, ...subArrays];
    } else {
      result.push([key, encodeURIComponent(String(value))]);
    }
  });

  return result;
}

export function makeSearchParams(input: Params): string {
  return flattenInput(input)
    .map(([ key, value ]) => (`${key}=${value}`))
    .join('&');
}

export async function getProductRecommendations(
  params: Params,
): Promise<RemoteRecommendations> {
  try {
    const recommendations: ProductRecommendation[] = await get(
      `/recommendations?${makeSearchParams(params)}`,
    );
    return makeSuccess(recommendations);
  } catch (e) {
    return makeFail(e);
  }
}
