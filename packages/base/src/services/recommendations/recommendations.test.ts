import { expect } from 'chai';
import fetch from 'jest-fetch-mock';
import { stripUndefined } from '@35up/tslib-utils';
import { makeSearchParams, getProductRecommendations } from './recommendations';
import { GetRecommendationsParams, SdkConfig } from '../../types';
import { getMockRecommendations } from './recommendations-mock-data';


const input: GetRecommendationsParams = {
  lang: 'en',
  country: 'de',
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
  session: undefined,
};

const sdkConfigWithoutUrl: Omit<SdkConfig, 'apiUrl'> = {
  lang: 'de',
  country: 'au',
  seller: 'seller-7',
  session: 'sess-12',
};

const sdkConfig: SdkConfig = {
  ...sdkConfigWithoutUrl,
  apiUrl: 'https://api.fake.io/v1',
};

const productRecommendations = getMockRecommendations();

describe('service - recommendations', () => {
  describe('makeSearchParams', () => {
    it('converts object to search string', () => {
      const expected = 'lang=en&country=de&seller=seller-7&session=sess-12'
        + '&limit=10&baseProduct.title=Cocobolo%20desk&baseProduct.category'
        + '=Furniture&baseProduct.extra.foo=ba-da%20boo%5E%3F&customer.age='
        + '20-30&customer.cities=Berlin,Frankfurt%20am%20Main';

      expect(makeSearchParams({
        ...sdkConfigWithoutUrl,
        ...stripUndefined(input),
      })).to.equal(expected);
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

    it('makes request to the proper endpoint', async () => {
      await getProductRecommendations(input, sdkConfig);

      expect(fetchMock.mock.calls[0][0]).to.startWith(sdkConfig.apiUrl);
    });

    it('returns recommendations', async () => {
      const recommendations = await getProductRecommendations(input, sdkConfig);

      expect(recommendations).to.deep.equal(
        productRecommendations.recommendations,
      );
    });

    describe('some of the recommendations are invalid', () => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        specs,
        ...invalidRecommendation
      } = productRecommendations.recommendations[1];
      const recommendationsWithInvalid = {
        recommendations: [
          productRecommendations.recommendations[0],
          invalidRecommendation,
          productRecommendations.recommendations[2],
          productRecommendations.recommendations[3],
        ],
      };

      beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(
          JSON.stringify(recommendationsWithInvalid),
          {headers: {'Content-Type': 'application/json'}},
        );
      });

      it('returns only valid recommendations', async () => {
        const recommendations = await getProductRecommendations(
          input,
          sdkConfig,
        );

        expect(recommendations).to.deep.equal([
          productRecommendations.recommendations[0],
          productRecommendations.recommendations[2],
          productRecommendations.recommendations[3],
        ]);
      });
    });

    it('throws an error when request fails', async () => {
      const error = new Error('fail');
      fetch.mockReject(error);

      try {
        await getProductRecommendations(input, sdkConfig);
        expect.fail('should have thrown');
      } catch (e) {
        expect(e).to.be.equal(error);
      }
    });
  });
});
