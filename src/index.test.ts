import { expect } from 'chai';
import { initialise } from './index';
import { ThirtyFiveUp } from './thirty-five-up';


describe('initialise', () => {
  it('creates ThirtyFiveUp object', () => {
    const actualObject = initialise({
      partner: 'partner-id',
      session: '8662f5bf-92c3-428c-b542-0c59147a8fb4',
      lang: 'en',
      country: 'de',
    });

    expect(actualObject).to.be.instanceOf(ThirtyFiveUp);
  });

  it('creates ThirtyFiveUp only with partner id', () => {
    const actualObject = initialise({
      partner: 'partner-id',
    });

    expect(actualObject).to.be.instanceOf(ThirtyFiveUp);
  });

  it('throws an error when no partner information is provided', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialise({lang: 'en'});
    }).to.have.thrown('Cannot initialize the 35up SDK without a partner ID');
  });
});
