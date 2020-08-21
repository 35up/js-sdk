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
    } else if (Array.isArray(entry[1])) {
      if (entry[0] === 'age') {
        const from = encodeURIComponent(entry[1][0]);
        const to = encodeURIComponent(entry[1][1]);
        result.push([key, `${from}-${to}`]);
      } else {
        result.push([key, entry[1].map(encodeURIComponent).join(',')]);
      }
    } else {
      result.push([key, encodeURIComponent(String(entry[1]))]);
    }
  });

  return result;
}

export function makeSearchParams(input: InputParameters): string {
  return flattenInput(input).reduce((acc, entry) => (
    `${acc ? `${acc}&` : ''}${entry[0]}=${entry[1]}`
  ), '');
}

