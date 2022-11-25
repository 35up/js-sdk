import { expect } from 'chai';
import { makeBasicAuthHeaders } from './make-basic-auth-headers';


describe('makeBasicAuthHeaders', () => {
  it('returns a properly authentication header', () => {
    const result = makeBasicAuthHeaders({username: 'a', password: 'b'});

    expect(result).to.have.property(
      'authorization',
      `Basic ${Buffer.from('a:b').toString('base64')}`,
    );
  });
});
