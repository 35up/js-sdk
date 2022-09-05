import { expect } from 'chai';
import { initialise } from './index';
import { Sdk } from './sdk';


describe('initialise', () => {
  it('creates Sdk object', () => {
    const actualObject = initialise({
      partner: 'partner-id',
      session: '8662f5bf-92c3-428c-b542-0c59147a8fb4',
      lang: 'en',
      country: 'de',
      apiUrl: 'https://api.35up.io/v1',
    });

    expect(actualObject).to.be.instanceOf(Sdk);
  });

  it('creates Sdk only with mandatory fields', () => {
    const actualObject = initialise({
      partner: 'partner-id',
      lang: 'en',
      country: 'de',
    });

    expect(actualObject).to.be.instanceOf(Sdk);
  });

  it('throws an error when no partner information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({lang: 'en', country: 'de', session: 'session-id'});
    }).to.throw('Cannot initialise the 35up SDK without a partner ID');
  });

  it('throws an error when no language information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({partner: 'partner-id', lang: 'en', session: 'session-id'});
    }).to.throw(
      'Cannot initialise the 35up SDK without a language and country',
    );
  });

  it('throws an error when no country information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({
        partner: 'partner-id',
        country: 'de',
        session: 'session-id',
      });
    }).to.throw(
      'Cannot initialise the 35up SDK without a language and country',
    );
  });

  it('throws an error when no language and country'
    + 'information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({partner: 'partner-id', session: 'session-id'});
    }).to.throw(
      'Cannot initialise the 35up SDK without a language and country',
    );
  });
});
