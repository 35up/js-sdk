import { InputParameters } from '../types';


export function makeSearchParams(input: InputParameters): string {
  return Object.entries(input).reduce((acc, entry) => (
    `${acc}&${entry[0]}=${entry[1]}`
  ), '');
}

