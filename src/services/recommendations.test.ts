import { expect } from 'chai';
import { makeSearchParams } from './recommendations';


describe('service - recommendations', () => {
  describe('makeSearchParams', () => {
    it('converts object with one level nesting', () => {
      const input = {
        partner: 'partner-7',
        session: 'sess-12',
        lang: 'en',
        limit: 10,
        baseProduct: {
          title: 'title',
        },
      };

      const expected = 'partner=partner-7&session=sess-12&lang=en&limit=10';

      expect(makeSearchParams(input)).to.equal(expected);
    });
  });
});
