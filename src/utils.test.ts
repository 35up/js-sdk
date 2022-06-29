import { expect } from 'chai';
import { parseUnixTimestamp } from './utils';


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
});
