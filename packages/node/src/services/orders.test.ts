import { expect } from 'chai';
import { isFail, isSuccess } from '@35up/tslib-utils';
import { HttpError } from '@35up/http-client';
import {
  parseUnixTimestamp,
  type BadParamsError,
  type TSdkConfig,
} from '@35up/js-sdk-base';
import {
  TCreateOrderParams,
  TCreateOrderResult,
  ORDER_STATUS,
} from '../types';
import { createOrder } from './orders';


const config: TSdkConfig = {
  session: 'the-session',
  lang: 'en',
  country: 'de',
  seller: 'store',
  apiUrl: 'https://api.fake.io/v1',
};

describe('orders service', () => {
  describe('createOrders', () => {
    const details: TCreateOrderParams = {
      reference: 'some-reference',
      customer: {
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'anon@mail.mail',
      },
      shippingAddress: {
        street: 'The street',
        streetNumber: '23a',
        city: 'SomeCity',
        country: 'AU',
        postcode: '12123',
        phone: '+1-234-5678',
      },
      items: [
        {sku: '1234567', qty: 9},
        {sku: '453', qty: 1, config: {size: 'M'}},
      ],
    };

    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(
        JSON.stringify({
          id: '3wdasfdfg',
          status: ORDER_STATUS.PENDING,
          createdAt: '12345678',
          updatedAt: '23456789',
        }),
        {headers: {'Content-Type': 'application/json'}},
      );
    });

    it('makes the request to the orders endpoint', async () => {
      await createOrder(details, config);

      expect(fetchMock.mock.calls[0][0]).to.equal(
        `${config.apiUrl}/orders?session=${config.session}`,
      );
      expect(fetchMock.mock.calls[0][1]).to.include({
        body: JSON.stringify(details),
      });
    });

    describe('the request succeeds', () => {
      it('returns info about the created order, transformed', async () => {
        const result = await createOrder(details, config);

        expect(isSuccess(result)).to.be.true;
        expect(result.data).to.deep.equal({
          id: '3wdasfdfg',
          status: ORDER_STATUS.PENDING,
          createdAt: parseUnixTimestamp('12345678'),
          updatedAt: parseUnixTimestamp('23456789'),
        });
      });
    });

    describe('the request fails', () => {
      beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce('', {
          status: 500,
          statusText: 'Internal error',
        });
      });

      it('returns a failed result with the error', async () => {
        const result = await createOrder(details, config);

        expect(isFail(result)).to.be.true;
        expect(result.error).to.be.a('Error');
        expect((result.error as HttpError).responseStatus).to.equal(500);
      });

      describe('when it fails with 400', () => {
        const errors = {items: ['unknown property config']};

        beforeEach(() => {
          fetchMock.resetMocks();
          fetchMock.mockResponseOnce(
            JSON.stringify({errors}),
            {status: 400, headers: {'Content-Type': 'application/json'}},
          );
        });

        it('returns an error with the error information', async () => {
          const result = await createOrder(details, config);

          expect(isFail(result)).to.be.true;
          expect(result.error).to.be.a('Error');
          const badParamErrors = result.error as BadParamsError<
            TCreateOrderResult
          >;
          expect(badParamErrors.details).to.deep.equal(errors);
        });
      });
    });
  });
});
