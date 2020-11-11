import { expect } from 'chai';
import { SinonStub } from 'sinon';
import { makeSuccess } from '@caseable/tslib-frontend-utils';
import { getProductRecommendations, RemoteRecommendations } from './services/recommendations';
import { getMockRecommendations } from './services/recommendations-data';
import { ThirtyFiveUp } from './thirty-five-up';
import { RecommendationParameters, SDKConfiguration } from './types';


jest.mock('./services/recommendations');
const getProductRecommendationsMock = getProductRecommendations as SinonStub<
  unknown[],
  Promise<RemoteRecommendations>
>;

const recommendations = getMockRecommendations();
const configuration: SDKConfiguration = {
  partner: 'partner-id',
  session: 'session-id',
  country: 'de',
  lang: 'en',
};
const input: RecommendationParameters = {
  lang: 'fr',
  baseProduct: {
    title: 'Cocobolo desk',
    category: 'Furniture',
    extra: {
      foo: 'ba-da boo^?',
    },
  },
  customer: {
    age: [20, 30],
    cities: ['Berlin', 'Frankfurt am Main'],
  },
};

describe('ThirtyFiveUp', () => {
  beforeEach(() => {
    getProductRecommendationsMock.reset();
    getProductRecommendationsMock.resolves(makeSuccess(recommendations));
  });

  describe('getProductRecommendations', () => {
    it('gets recommendations using provided params and the sdk configuration', async () => {
      const instance = new ThirtyFiveUp(configuration);

      expect(
        await instance.getProductRecommendations(input),
      ).to.be.deep.equal(recommendations);
      expect(getProductRecommendationsMock).to.have.been.calledWith({
        ...configuration,
        ...input,
      });
    });
  });
});
