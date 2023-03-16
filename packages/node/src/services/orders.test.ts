import { expect } from 'chai';
import { HttpError } from '@35up/http-client';
import {
  parseUnixTimestamp,
  ValidationError,
  type BadParamsError,
} from '@35up/js-sdk-base';
import { ZodError } from 'zod';
import {
  CreateOrderParams,
  CreateOrderResult,
  ORDER_STATUS,
} from '../types';
import { createOrder } from './orders';


const configWithoutCredentials = {
  session: 'the-session',
  lang: 'en',
  country: 'de',
  seller: 'store',
  apiUrl: 'https://api.fake.io/v1',
};

const config = {
  ...configWithoutCredentials,
  credentials: {username: 'test', password: 'abcd1234'},
};

describe('orders service', () => {
  describe('createOrders', () => {
    const details: CreateOrderParams = {
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

    it('throws when credentials are not present', async () => {
      try {
        await createOrder(details, configWithoutCredentials);
        expect.fail('should have thrown');
      } catch (e) {
        expect(e.message).to.equal(
          'Credentials are not present in configuration',
        );
      }
    });

    it('makes the request to the orders endpoint', async () => {
      await createOrder(details, config);

      expect(fetchMock.mock.calls[0][0]).to.equal(
        `${config.apiUrl}/orders?session=${config.session}`,
      );
      expect(fetchMock.mock.calls[0][1])
        .to.have.property('body', JSON.stringify(details));
      expect(fetchMock.mock.calls[0][1]).to.have.property('headers')
        .that.include({authorization: `Basic ${Buffer.from(
          `${config.credentials.username}:${config.credentials.password}`,
        ).toString('base64')}`});
    });

    describe('the request succeeds', () => {
      it('returns info about the created order, transformed', async () => {
        const result = await createOrder(details, config);

        expect(result).to.deep.equal({
          id: '3wdasfdfg',
          status: ORDER_STATUS.PENDING,
          createdAt: parseUnixTimestamp('12345678'),
          updatedAt: parseUnixTimestamp('23456789'),
        });
      });

      describe('the info of the created order is missing fields', () => {
        beforeEach(() => {
          fetchMock.resetMocks();
          fetchMock.mockResponseOnce(
            JSON.stringify({
              id: '3wdasfdfg',
              createdAt: '12345678',
              updatedAt: '23456789',
            }),
            {headers: {'Content-Type': 'application/json'}},
          );
        });

        it('throws an error', async () => {
          try {
            await createOrder(details, config);
            expect.fail('should have thrown');
          } catch (e) {
            expect(e).to.be.instanceof(ValidationError);
            expect(e).to.have.property('validationError')
              .instanceof(ZodError);
          }
        });
      });

      describe('the info of the created order has invalid timestamps', () => {
        beforeEach(() => {
          fetchMock.resetMocks();
          fetchMock.mockResponseOnce(
            JSON.stringify({
              id: '3wdasfdfg',
              status: ORDER_STATUS.PENDING,
              createdAt: '1234567wwq8',
              updatedAt: '',
            }),
            {headers: {'Content-Type': 'application/json'}},
          );
        });

        it('throws an error', async () => {
          try {
            await createOrder(details, config);
            expect.fail('should have thrown');
          } catch (e) {
            expect(e).to.be.instanceof(ValidationError);
            expect(e).to.have.property('validationError')
              .instanceof(ZodError);
          }
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

      it('throws an error', async () => {
        try {
          await createOrder(details, config);
          expect.fail('should have thrown');
        } catch (e) {
          expect(e).to.be.a('Error');
          expect((e as HttpError).responseStatus).to.equal(500);
        }
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

        it('throws an error with the error information', async () => {
          try {
            await createOrder(details, config);
            expect.fail('should have thrown');
          } catch (e) {
            expect(e).to.be.a('Error');
            const badParamErrors = e as BadParamsError<
              CreateOrderResult
            >;
            expect(badParamErrors.details).to.deep.equal(errors);
          }
        });
      });
    });
  });
});
