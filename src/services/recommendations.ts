import { InputParameters } from '../types';

function isObject(a) {
  return (!!a) && (a.constructor === Object);
}

function flattenInput(input: Record<string, unknown>, keyPrefix = '')
:Array<[string, string]> {
  let result: Array<[string, string]> = [];

  Object.entries(input).forEach((entry) => {
    const key = `${keyPrefix}${entry[0]}`;

    if (isObject(entry[1])) {
      const subArrays = flattenInput(
        entry[1] as Record<string, unknown>,
        `${key}.`,
      );
      result = [...result, ...subArrays];
    } else if (Array.isArray(entry[1]) && entry[1].length === 2) {
      result.push([key, `${entry[1][0]}-${entry[1][1]}`]);
    } else {
      result.push([key, String(entry[1])]);
    }
  });

  return result;
}

export function makeSearchParams(input: InputParameters): string {
  return flattenInput(input).reduce((acc, entry) => {
    const encodedKey = encodeURIComponent(entry[0]);
    const encodedValue = encodeURIComponent(entry[1]);
    return `${acc ? `${acc}&` : ''}${encodedKey}=${encodedValue}`;
  }, '');
}

