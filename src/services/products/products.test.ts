import { isFail, isSuccess } from '@35up/tslib-utils';
import { expect } from 'chai';
import fetch from 'jest-fetch-mock';
import { SdkConfig } from '../../types';
import { getProduct } from './products';
import type { Product } from './products-types';


const productDetails: Product = {
  name: 'Galaxy S10 HardCase, "Release" by Dan May',
  sku: 'caseable/HCI60XX114014XXAPIP60',
  categories: [
    'accessories',
    'cases',
  ],
  vendor: {
    id: 'caseable',
    legalName: 'caseable GmbH',
    name: 'caseable',
    logo: {
      landscape: 'https://caseable.com/media/logo/horizontal.png',
      square: 'https://caseable.com/media/logo/squared.png',
    },
  },
  price: {
    value: 29.3,
    currency: 'EUR',
    formatted: '€ 29,30',
  },
  actions: {
    addToCart: 'https://easy.35up.io/de/de/add/sku/HCI60XX114014XXAPIP60/?partner=o2',
    deleteFromCart: 'https://easy.35up.io/de/de/delete/sku/HCI60XX114014XXAPIP60/?partner=o2',
    goToCheckout: 'https://easy.35up.io/de/de/go/checkout/?partner=o2',
    goToCart: 'https://easy.35up.io/de/de/go/cart/?partner=o2',
    singleClickCheckout: 'https://easy.35up.io/de/de/add-and-go/sku/HCI60XX114014XXAPIP60/?partner=o2',
  },
  descriptions: {
    short: 'Hardshell cell phone case',
    long: (
      'Our hardshell cell phone cases can be attached to your smartphone...'
    ),
  },
  images: {
    thumbnail: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/thumb.jpg',
    small: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/small.jpg',
    medium: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/medium.jpg',
    large: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/large.jpg',
  },
  delivery: {
    timeMax: 4,
    timeMin: 2,
    package: undefined,
  },
  taxes: [],
  gtin: {
    ian: 'asdfb',
  },
  specs: {
    height: undefined,
    weight: undefined,
    width: undefined,
    length: undefined,
    color: undefined,
    type: 'phone hard case',
    materials: undefined,
  },
};
const sdkConfig: SdkConfig = {
  session: 'the-session',
  lang: 'en',
  country: 'de',
  partner: 'store',
  apiUrl: 'https://api.fake.io/v1',
};
const init = {headers: {'Content-Type': 'application/json'}};

describe('Products Service', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  describe('getProduct', () => {
    const sku = `${Math.random()}`;
    const { partner } = sdkConfig;
    const optionalParams = {
      lang: `${Math.random()}`,
      country: `${Math.random()}`,
    };

    beforeEach(() => {
      fetch.mockResponse(JSON.stringify({product: productDetails}), init);
    });

    it('makes request using GET', async () => {
      await getProduct(sku, sdkConfig, optionalParams);
      const params = new URLSearchParams({partner, ...optionalParams});

      expect(fetch.mock.calls).to.have.lengthOf(1);
      expect(fetch.mock.calls[0][0]).to.be.equal(
        `${sdkConfig.apiUrl}/products/${sku}?${params}`,
      );
      expect(fetch.mock.calls[0][1]).to.have.property('method', 'GET');
    });

    it('encodes sku param', async () => {
      await getProduct('caseable/6f0c51a33cdc48a', sdkConfig);
      const params = new URLSearchParams({partner});

      expect(fetch.mock.calls).to.have.lengthOf(1);
      expect(fetch.mock.calls[0][0]).to.be.equal(
        `${sdkConfig.apiUrl}/products/caseable%2F6f0c51a33cdc48a?${params}`,
      );
    });

    it('returns validated product details', async () => {
      fetch.mockResponse(
        JSON.stringify({product: {...productDetails, name: null}}),
        init,
      );
      const result = await getProduct(sku, sdkConfig);

      expect(isSuccess(result)).to.be.true;
      expect(result.data).to.deep.equal(
        {...productDetails, name: ''},
      );
      expect(result.error).to.be.null;
    });

    describe('when request fails', () => {
      const error = new Error('fail');

      beforeEach(() => {
        fetch.mockReject(error);
      });

      it('returns error when request fails', async () => {
        const result = await getProduct(sku, sdkConfig);

        expect(isFail(result)).be.be.true;
        expect(result.data).to.be.null;
        expect(result.error).to.be.equal(error);
      });
    });
  });
});
