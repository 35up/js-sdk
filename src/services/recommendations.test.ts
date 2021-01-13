import { expect } from 'chai';
import fetch from 'jest-fetch-mock';
import { makeSearchParams, getProductRecommendations } from './recommendations';
import { RecommendationParams, SdkConfig } from '../types';
import { getMockRecommendations } from './recommendations-data';


const input: SdkConfig & RecommendationParams = {
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

const productRecommendations = getMockRecommendations();

describe('service - recommendations', () => {
  describe('makeSearchParams', () => {
    it('converts object to search string', () => {
      const expected = 'partner=partner-7&session=sess-12&lang=en&limit=10'
        + '&baseProduct.title=Cocobolo%20desk&baseProduct.category=Furniture'
        + '&baseProduct.extra.foo=ba-da%20boo%5E%3F&customer.age=20-30'
        + '&customer.cities=Berlin,Frankfurt%20am%20Main';

      expect(makeSearchParams(input)).to.equal(expected);
    });
  });

  describe('getProductRecommendations', () => {
    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify(productRecommendations),
        {headers: {'Content-Type': 'application/json'}},
      );
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('returns recommendations', async () => {
      const recommendations = await getProductRecommendations(input);

      expect(recommendations.data).to.deep.equal(
        productRecommendations.recommendations,
      );
      expect(recommendations.error).to.be.null;
    });

    it('returns err when request fails', async () => {
      const error = new Error('fail');
      fetch.mockReject(error);

      const recommendations = await getProductRecommendations(input);

      expect(recommendations.data).to.be.null;
      expect(recommendations.error).to.be.equal(error);
    });
  });
});
