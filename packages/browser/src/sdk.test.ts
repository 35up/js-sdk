import { expect } from 'chai';
import { makeSuccess } from '@35up/tslib-utils';
import { makeTypedMockFn } from '@35up/tslib-test-utils';
import {
  TSdkConfig,
  type TGetRecommendationsParams,
  type TGetProductDetailsParams,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import {
  getMockRecommendations,
} from '../../base/src/services/recommendations/recommendations-mock-data';
import {
  getMockProductDetails,
} from '../../base/src/services/products/product-mock-data';
import { Sdk } from './sdk';


const getProductRecommendationsMock = makeTypedMockFn(
  getProductRecommendationsService,
);
const getProductServiceMock = makeTypedMockFn(
  getProductService,
);

const configuration: TSdkConfig = {
  apiUrl: 'https://fake.api/v1',
  seller: 'seller-id',
  session: 'session-id',
  country: 'de',
  lang: 'en',
};

describe('Sdk', () => {
  describe('getProductRecommendations', () => {
    const { recommendations } = getMockRecommendations();
    beforeEach(() => {
      getProductRecommendationsMock.reset();
      getProductRecommendationsMock.resolves(
        makeSuccess(recommendations),
      );
    });

    const input: TGetRecommendationsParams = {
      lang: 'fr',
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
      session: '123',
    };

    it('gets recommendations using provided params and the sdk configuration', async () => {
      const instance = new Sdk(configuration);

      expect(
        await instance.getProductRecommendations(input),
      ).to.be.deep.equal(makeSuccess(recommendations));
      expect(getProductRecommendationsMock).to.have.been.calledWith(
        input,
        configuration,
      );
    });
  });

  describe('getProductDetails', () => {
    const productDetails = getMockProductDetails();
    beforeEach(() => {
      getProductServiceMock.reset();
      getProductServiceMock.resolves(
        makeSuccess(productDetails),
      );
    });

    const input: TGetProductDetailsParams = {
      sku: '123',
    };

    it('gets product details using provided params and the sdk configuration', async () => {
      const instance = new Sdk(configuration);

      expect(
        await instance.getProductDetails(input),
      ).to.be.deep.equal(makeSuccess(productDetails));
      expect(getProductServiceMock).to.have.been.calledWith(
        input,
        configuration,
      );
    });
  });
});
