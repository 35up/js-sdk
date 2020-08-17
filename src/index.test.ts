import { expect } from 'chai';
import { initialise, ThirtyFiveUp } from './index';


describe('initialise', () => {
  it('creates ThirtyFiveUp object', () => {
    const actualObject = initialise(
      'partner-id', '8662f5bf-92c3-428c-b542-0c59147a8fb4',
    );

    expect(actualObject).to.be.instanceOf(ThirtyFiveUp);
  });
});
