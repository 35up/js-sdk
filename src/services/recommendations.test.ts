import { expect } from 'chai';
import { makeSearchParams } from './recommendations';
import { InputParameters } from '../types';


describe('service - recommendations', () => {
  describe('makeSearchParams', () => {
    it('converts object to search string', () => {
      const input: InputParameters = {
        partner: 'partner-7',
        session: 'sess-12',
        lang: 'en',
        limit: 10,
        baseProduct: {
          title: 'Cocobolo desk',
          category: 'Furniture',
          extra: {
            foo: 'ba-da boo^?',
          },
        },
        customer: {
          age: [20, 30],
          cities: ['Berlin', 'Frankfurt am Main'],
        },
      };

      const expected = 'partner=partner-7&session=sess-12&lang=en&limit=10&baseProduct.title=Cocobolo%20desk&baseProduct.category=Furniture&baseProduct.extra.foo=ba-da%20boo%5E%3F&customer.age=20-30&customer.cities=Berlin,Frankfurt%20am%20Main';

      expect(makeSearchParams(input)).to.equal(expected);
    });
  });
});
