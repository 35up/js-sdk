import { expect } from 'chai';
import { initialise } from './index';
import { Sdk } from './src/sdk';


describe('initialise', () => {
  it('creates Sdk object', () => {
    const actualObject = initialise({
      seller: 'seller-id',
      session: '8662f5bf-92c3-428c-b542-0c59147a8fb4',
      lang: 'en',
      country: 'de',
      apiUrl: 'https://api.35up.io/v1',
    });

    expect(actualObject).to.be.instanceOf(Sdk);
  });

  it('creates Sdk only with mandatory fields', () => {
    const actualObject = initialise({
      seller: 'seller-id',
      lang: 'en',
      country: 'de',
    });

    expect(actualObject).to.be.instanceOf(Sdk);
  });

  it('throws an error when no seller information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({lang: 'en', country: 'de', session: 'session-id'});
    }).to.throw('Cannot initialise the 35up SDK without a seller ID');
  });
});
