import { expect } from 'chai';
import fetch from 'jest-fetch-mock';
import { ZodError } from 'zod';
import { SdkConfig } from '../../types';
import { getProduct } from './products';
import { getMockProductDetails } from './product-mock-data';
import { ValidationError } from '../../errors';


const sdkConfig: SdkConfig = {
  session: 'the-session',
  lang: 'en',
  country: 'de',
  seller: 'store',
  apiUrl: 'https://api.fake.io/v1',
};
const init = {headers: {'Content-Type': 'application/json'}};

describe('Products Service', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  describe('getProduct', () => {
    const sku = `${Math.random()}`;
    const { seller } = sdkConfig;
    const optionalParams = {
      lang: `${Math.random()}`,
      country: `${Math.random()}`,
    };

    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify({product: getMockProductDetails()}),
        init,
      );
    });

    it('makes request using GET', async () => {
      await getProduct({sku, ...optionalParams}, sdkConfig);
      const params = new URLSearchParams({seller, ...optionalParams});

      expect(fetch.mock.calls).to.have.lengthOf(1);
      expect(fetch.mock.calls[0][0]).to.be.equal(
        `${sdkConfig.apiUrl}/products/${sku}?${params}`,
      );
      expect(fetch.mock.calls[0][1]).to.have.property('method', 'GET');
    });

    it('encodes sku param', async () => {
      const lang = 'de';
      await getProduct(
        {
          sku: 'caseable/6f0c51a33cdc48a',
          lang,
          country: undefined,
        },
        sdkConfig,
      );
      const params = new URLSearchParams({seller, lang});

      expect(fetch.mock.calls).to.have.lengthOf(1);
      expect(fetch.mock.calls[0][0]).to.be.equal(
        `${sdkConfig.apiUrl}/products/caseable%2F6f0c51a33cdc48a?${params}`,
      );
    });

    it('returns product details', async () => {
      const result = await getProduct({sku, ...optionalParams}, sdkConfig);

      expect(result).to.deep.equal(getMockProductDetails());
    });

    it('throws error when product is invalid', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...product } = getMockProductDetails();
      fetch.mockResponse(JSON.stringify({product}), init);

      try {
        await getProduct({sku, ...optionalParams}, sdkConfig);
        expect.fail('should have thrown');
      } catch (e) {
        expect(e).to.be.instanceof(ValidationError);
        expect(e).to.have.property('validationError')
          .instanceof(ZodError);
      }
    });

    describe('when request fails', () => {
      const error = new Error('fail');

      beforeEach(() => {
        fetch.mockReject(error);
      });

      it('throws error when request fails', async () => {
        try {
          await getProduct({sku, ...optionalParams}, sdkConfig);
          expect.fail('should have thrown');
        } catch (e) {
          expect(e).to.be.equal(error);
        }
      });
    });
  });
});
