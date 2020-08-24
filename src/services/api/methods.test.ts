import { expect } from 'chai';
import sinon from 'sinon';
import { get, post, put, patch } from './methods';


const PRODUCTS_API = 'https://products.35up.com/';

async function testMethod(method, methodName): Promise<void> {
  await method('');
  expect(window.fetch).to.have.been.calledOnce;
  expect(window.fetch).to.have.been.calledWith(
    PRODUCTS_API,
    sinon.match({
      method: methodName,
    }),
  );
}

describe('Products API', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch').resolves(new Response(null));
    (window.fetch as sinon.SinonStub).resetHistory();
  });

  afterEach(() => {
    (window.fetch as sinon.SinonStub).restore();
  });

  it('tests get method', async () => {
    await testMethod(get, 'GET');
  });

  it('tests post method', async () => {
    await testMethod(post, 'POST');
  });

  it('tests put method', async () => {
    await testMethod(put, 'PUT');
  });

  it('tests patch method', async () => {
    await testMethod(patch, 'PATCH');
  });
});
