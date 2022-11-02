import { expect } from 'chai';
import { makeSuccess } from '@35up/tslib-utils';
import { makeTypedMockFn } from '@35up/tslib-test-utils';
import {
  SdkConfig,
  type GetRecommendationsParams,
  type GetProductDetailsParams,
  getProductRecommendationsService,
  getProductService,
} from '@35up/js-sdk-base';
import sinon from 'sinon';
import {
  getMockRecommendations,
} from '../../base/src/services/recommendations/recommendations-mock-data';
import {
  getMockProductDetails,
} from '../../base/src/services/products/product-mock-data';
import { Sdk, SESSION_LOCAL_STORAGE_KEY } from './sdk';


const getProductRecommendationsMock = makeTypedMockFn(
  getProductRecommendationsService,
);
const getProductServiceMock = makeTypedMockFn(
  getProductService,
);

const configuration: SdkConfig = {
  apiUrl: 'https://fake.api/v1',
  seller: 'seller-id',
  session: 'session-id',
  country: 'de',
  lang: 'en',
};

const configWithoutSession = {
  apiUrl: 'https://fake.api/v1',
  seller: 'seller-id',
  country: 'de',
  lang: 'en',
};

describe('Sdk', () => {
  const { recommendations } = getMockRecommendations();
  beforeEach(() => {
    getProductRecommendationsMock.reset();
    getProductRecommendationsMock.resolves(
      makeSuccess(recommendations),
    );
  });

  describe('getProductRecommendations', () => {
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

    const input: GetProductDetailsParams = {
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

  describe('session', () => {
    it('uses the provided session', async () => {
      const instance = new Sdk(configuration);

      expect(await instance.getProductRecommendations({
        baseProduct: {title: 'title'},
      })).to.be.deep.equal(makeSuccess(recommendations));
      expect(getProductRecommendationsMock).to.have.been.calledWith(
        sinon.match.any,
        sinon.match({session: configuration.session}),
      );
    });

    describe('no session is provided', () => {
      beforeEach(() => {
        window.localStorage.clear();
      });

      it('provides a new session and stores it in localStorage', async () => {
        const instance = new Sdk(configWithoutSession);
        expect(
          window.localStorage.getItem(SESSION_LOCAL_STORAGE_KEY),
        ).to.be.null;

        expect(await instance.getProductRecommendations({
          baseProduct: {title: 'title'},
        })).to.be.deep.equal(makeSuccess(recommendations));
        expect(
          window.localStorage.getItem(SESSION_LOCAL_STORAGE_KEY),
        ).to.be.not.empty;
        expect(getProductRecommendationsMock).to.have.been.calledWith(
          sinon.match.any,
          sinon.match({
            session: window.localStorage.getItem(SESSION_LOCAL_STORAGE_KEY),
          }),
        );
      });

      describe('there is a session stored in the localStorage', () => {
        const storedSession = 'stored-session';

        beforeEach(() => {
          window.localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, storedSession);
        });

        it('uses session from storage', async () => {
          const instance = new Sdk(configWithoutSession);

          expect(await instance.getProductRecommendations({
            baseProduct: {title: 'title'},
          })).to.be.deep.equal(makeSuccess(recommendations));
          expect(getProductRecommendationsMock).to.have.been.calledWith(
            sinon.match.any,
            sinon.match({session: storedSession}),
          );
        });
      });
    });

    describe('resetSession', () => {
      const storedSession = 'stored-session';

      beforeEach(() => {
        window.localStorage.setItem(SESSION_LOCAL_STORAGE_KEY, storedSession);
      });

      it('clears the stored session', async () => {
        const instance = new Sdk(configWithoutSession);

        instance.resetSession();

        expect(
          window.localStorage.getItem(SESSION_LOCAL_STORAGE_KEY),
        ).to.be.null;
      });
    });
  });
});
