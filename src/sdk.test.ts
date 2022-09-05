import { expect } from 'chai';
import { makeSuccess } from '@35up/tslib-frontend-utils';
import { makeTypedMockFn } from '@35up/tslib-test-utils';
import { getProductRecommendations } from './services/recommendations';
import { getMockRecommendations } from './services/recommendations-data';
import { Sdk } from './sdk';
import {
  CreateOrderDetails,
  ORDER_STATUS,
  RecommendationParams,
  SdkConfig,
} from './types';
import { createOrder } from './services/orders';


jest.mock('./services/recommendations');
jest.mock('./services/orders');
const getProductRecommendationsMock = makeTypedMockFn(
  getProductRecommendations,
);
const createOrderMock = makeTypedMockFn(createOrder);

const configuration: SdkConfig = {
  apiUrl: 'https://fake.api/v1',
  partner: 'partner-id',
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

    const input: RecommendationParams = {
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

      expect(
        await instance.getProductRecommendations(input),
      ).to.be.deep.equal(makeSuccess(recommendations));
      expect(getProductRecommendationsMock).to.have.been.calledWith(
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

    const input: CreateOrderDetails = {
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

      expect(
        await instance.createOrder(input),
      ).to.be.deep.equal(makeSuccess(createOrderResult));
      expect(createOrderMock)
        .to.have.been.calledWith(input, configuration);
    });
  });
});
