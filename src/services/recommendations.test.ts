import { expect } from 'chai';
import fetch from 'jest-fetch-mock';
import { makeSearchParams, getProductRecommendations } from './recommendations';
import { InputParameters, ProductRecommendations } from '../types';
import { getMockRecommendations } from './recommendations-data';


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

const productRecommendations: ProductRecommendations = {
  sku: 'caseable/HCI60XX114014XXAPIP60',
  vendor: {
    id: 'caseable',
    name: 'caseable',
    legalName: 'caseable GmbH',
    logo: {
      square: 'https://caseable.com/media/logo/squared.png',
      landscape: 'https://caseable.com/media/logo/horizontal.png',
    },
  },
  name: 'Galaxy S10 HardCase, "Release" by Dan May',
  price: {
    value: 29.3,
    currency: 'EUR',
    formatted: '€ 29,30',
  },
  images: {
    thumbnail: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/thumb.jpg',
    small: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/small.jpg',
    medium: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/medium.jpg',
    large: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/large.jpg',
  },
  descriptions: {
    short: 'Hardshell cell phone case',
    long: 'Our hardshell cell phone cases can be attached to your smartphone...',
  },
  actions: {
    singleClickCheckout: 'https://easy.caseable.com/de/de/add-and-go/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    addToCart: 'https://easy.caseable.com/de/de/add/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    deleteFromCart: 'https://easy.caseable.com/de/de/delete/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    goToCart: 'https://easy.caseable.com/de/de/go/cart/?partner=o2&session=123abc',
    goToCheckout: 'https://easy.caseable.com/de/de/go/checkout/?partner=o2&session=123abc',
  },
  delivery: {
    timeMin: 2,
    timeMax: 4,
  },
};

describe('service - recommendations', () => {
  describe('makeSearchParams', () => {
    it('converts object to search string', () => {
      const expected = 'partner=partner-7&session=sess-12&lang=en&limit=10&baseProduct.title=Cocobolo%20desk&baseProduct.category=Furniture&baseProduct.extra.foo=ba-da%20boo%5E%3F&customer.age=20-30&customer.cities=Berlin,Frankfurt%20am%20Main';

      expect(makeSearchParams(input)).to.equal(expected);
    });
  });

  describe('getProductRecommendations', () => {
    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify(getMockRecommendations(input)),
        {headers: {'Content-Type': 'application/json'}},
      );
    });

    afterEach(() => {
      fetch.resetMocks();
    });

    it('returns recommendations', async () => {
      const recommendations = await getProductRecommendations(input);

      expect(recommendations.data).to.deep.equal(productRecommendations);
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
