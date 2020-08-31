import sinon from 'sinon';

const productRecommendations = jest.requireActual('../recommendations');

export const getProductRecommendations = sinon.stub(
  productRecommendations,
  'getProductRecommendations',
).callThrough();
