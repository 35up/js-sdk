import { expect } from 'chai';
import { parseUnixTimestamp, stripUndefined } from './utils';


/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
export function expectType<T>(value: T): void {}

describe('utils', () => {
  describe('parseUnixTimestamp', () => {
    it('parses timestamps to date', () => {
      const timestamp = '1647897823';
      const expectedTime = '2022-03-21T21:23:43.000Z';
      expect(
        parseUnixTimestamp(timestamp).toISOString(),
      ).to.equal(expectedTime);
    });
  });

  describe('stripUndefined', () => {
    it('removes all the keys with undefined value', () => {
      const value = stripUndefined({
        a: undefined,
        b: 3 as 3 | undefined,
        c: null,
        d: 5 as 5 | null,
        e: undefined as 6 | undefined,
      });

      expect(value).to.deep.equals({b: 3, c: null, d: 5});
      expectType<{ b: 3, c: null, d: 5 | null}>(value);
    });
  });
});
