import { InputParameters, TObject } from '../types';


function isObject(value: unknown): value is TObject {
  return (!!value) && (value.constructor === Object);
}

function flattenInput(
  input: TObject,
  keyPrefix = '',
): Array<[string, string]> {
  let result: Array<[string, string]> = [];

  Object.entries(input).forEach(([ prop, value ]) => {
    const key = `${keyPrefix}${prop}`;

    if (isObject(value)) {
      const subArrays = flattenInput(value, `${key}.`);
      result = [...result, ...subArrays];
    } else if (Array.isArray(value)) {
      if (prop === 'age') {
        const from = encodeURIComponent(value[0]);
        const to = encodeURIComponent(value[1]);
        result.push([key, `${from}-${to}`]);
      } else {
        result.push([key, value.map(encodeURIComponent).join(',')]);
      }
    } else {
      result.push([key, encodeURIComponent(String(value))]);
    }
  });

  return result;
}

export function makeSearchParams(input: InputParameters): string {
  return flattenInput(input)
    .map(([ key, value ]) => (`${key}=${value}`))
    .join('&');
}

