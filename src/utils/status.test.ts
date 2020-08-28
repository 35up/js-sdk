import { expect } from 'chai';
import { makeSuccess, makeFail, STATUS } from './status';

describe('utils - status', () => {
  it('makeSuccess', () => {
    const payload = 'content';
    const output = makeSuccess<string>(payload);

    expect(output.status).to.be.equal(STATUS.SUCCESS);
    expect(output.data).to.be.equal(payload);
    expect(output.error).to.be.equal(null);
  });

  it('makeFail', () => {
    const error = new Error('something');
    const output = makeFail(error);

    expect(output.status).to.be.equal(STATUS.FAIL);
    expect(output.data).to.be.equal(null);
    expect(output.error).to.be.equal(error);
  });
});
