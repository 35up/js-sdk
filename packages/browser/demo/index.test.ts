import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
// dependency of "jest-environment-jsdom"
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { flushPromises } from '@35up/tslib-test-utils';
import type { ProductRecommendation } from '@35up/js-sdk-base';
// eslint-disable-next-line import/no-relative-packages
import { makeRecommendation } from '../../../mock-server/routers/data';


const recommendations: ProductRecommendation[] = [...Array(5)]
  .map(makeRecommendation);
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const localStorageMock = {
  getItem: () => `${Math.random()}`,
};

const server = setupServer(
  rest.get('http://localhost:4000/recommendations', async (_, res, ctx) => res(
    ctx.json({recommendations}),
  )),
);

describe('demo - acceptance test', () => {
  let dom: InstanceType<typeof JSDOM>;
  let container: HTMLElement;

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  beforeEach(async () => {
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: `file://${path.resolve(__dirname)}/`,
    });
    Object.defineProperties(dom.window, {
      localStorage: {value: localStorageMock},
      fetch: {value: fetch},
    });
    container = dom.window.document.body;
    await new Promise((res) => {
      dom.window.onload = res;
    });
  });

  it('renders static elements without recommendations', () => {
    expect(container.querySelector('h1')?.textContent)
      .to.equal('Shopping cart');
    expect(container.querySelector('button')?.textContent)
      .to.equal('Fetch recommendations');
    recommendations.forEach((reco) => {
      expect(container?.textContent).not.to.contain(reco.sku);
    });
  });

  describe('when recommendations are requested', () => {
    it('renders recommendations', async () => {
      container.querySelector('button')?.click();
      await flushPromises();
      await flushPromises();

      recommendations.forEach((reco) => {
        expect(container?.textContent).to.contain(reco.sku);
      });
    });
  });
});
