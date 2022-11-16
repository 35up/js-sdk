import {
  makeFail,
  makeSuccess,
  ResolvedRemoteData,
} from '@35up/tslib-utils';
import { get } from '@35up/http-client';
import {
  GetRecommendationsParams,
  SdkConfig,
} from '../../types';
import { ProductRecommendation } from './types';
import { recommendationsData } from './validations';


export type TRemoteRecommendations = ResolvedRemoteData<
  ProductRecommendation[]
>;
type TParams = Omit<SdkConfig, 'apiUrl'> & GetRecommendationsParams;


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

export function makeSearchParams(input: TParams): string {
  return flattenInput({...input})
    .map(([ key, value ]) => (`${key}=${value}`))
    .join('&');
}

export async function getProductRecommendations(
  params: GetRecommendationsParams,
  sdkConfig: SdkConfig,
): Promise<TRemoteRecommendations> {
  const { apiUrl, ...finalParams } = {...sdkConfig, ...params};

  try {
    const data = recommendationsData.parse(await get(
      `${apiUrl}/recommendations?${makeSearchParams(finalParams)}`,
    ));
    return makeSuccess(data.recommendations);
  } catch (e) {
    return makeFail(e);
  }
}
