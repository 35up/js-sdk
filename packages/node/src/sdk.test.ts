import { assert, expect } from 'chai';
import { makeSuccess } from '@35up/tslib-utils';
import { makeTypedMockFn } from '@35up/tslib-test-utils';
import {
  getProductRecommendationsService,
  getProductService,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
} from '@35up/js-sdk-base';
import { isFail } from '@35up/tslib-utils/build/tslib-utils.cjs';
import { ORDER_STATUS, CreateOrderParams, NodeSdkConfig } from './types';
import { createOrder as createOrderService } from './services/orders';
import {
  getMockRecommendations,
} from '../../base/src/services/recommendations/recommendations-mock-data';
import {
  getMockProductDetails,
} from '../../base/src/services/products/product-mock-data';
import { Sdk } from './sdk';


jest.mock('./services/orders');
const getProductRecommendationsMock = makeTypedMockFn(
  getProductRecommendationsService,
);
const getProductServiceMock = makeTypedMockFn(
  getProductService,
);
const createOrderMock = makeTypedMockFn(createOrderService);

const configuration: NodeSdkConfig = {
  apiUrl: 'https://fake.api/v1',
  seller: 'seller-id',
  session: 'session-id',
  country: 'de',
  lang: 'en',
  credentials: {username: 'a', password: 'b'},
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

    const input: GetRecommendationsParams = {
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
    };

    it('gets recommendations using provided params and the sdk configuration', async () => {
      const instance = new Sdk(configuration);

      const result = await instance.getProductRecommendations(input);

      expect(result).to.be.deep.equal(makeSuccess(recommendations));
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

    const input: GetProductDetailsParams = {
      sku: '123',
    };

    it('gets product details using provided params and the sdk configuration', async () => {
      const instance = new Sdk(configuration);

      const result = await instance.getProductDetails(input);

      expect(result).to.be.deep.equal(makeSuccess(productDetails));
      expect(getProductServiceMock).to.have.been.calledWith(
        input,
        configuration,
      );
    });
  });

  describe('createOrder', () => {
    const createOrderResult = {
      id: 'abcd1234',
      status: ORDER_STATUS.PENDING,
      updatedAt: new Date('2022-12-01'),
      createdAt: new Date(),
    };

    beforeEach(() => {
      createOrderMock.reset();
      createOrderMock.resolves(makeSuccess(createOrderResult));
    });

    const input: CreateOrderParams = {
      reference: 'blabla',
      customer: {
        email: 'john@doe.qq',
        firstName: 'John',
        lastName: 'Doe',
      },
      items: [{sku: 'software-123', qty: 1}],
    };

    it('creates order using provided params and the sdk configuration', async () => {
      const instance = new Sdk(configuration);

      const result = await instance.createOrder(input);
      expect(result).to.be.deep.equal(makeSuccess(createOrderResult));
      expect(createOrderMock)
        .to.have.been.calledWith(input, configuration);
    });

    describe('credentials are provided', () => {
      it('uses new credentials', async () => {
        const newCredentials = {username: 'c', password: 'd'};
        const instance = new Sdk(configuration);

        const result = await instance.createOrder(input, newCredentials);
        expect(result).to.be.deep.equal(makeSuccess(createOrderResult));
        expect(createOrderMock).to.have.been.calledWith(input, {
          ...configuration,
          credentials: newCredentials,
        });
      });

      describe('credentials are invalid', () => {
        it('returns an error result', async () => {
          const newCredentials = {username: 'c'};
          const instance = new Sdk(configuration);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const result = await instance.createOrder(input, newCredentials);
          assert(isFail(result));
          expect(result.error.message).to.equal(
            'Invalid credentials provided. `username`'
            + ' and `password` must be present',
          );
        });
      });
    });
  });
});
