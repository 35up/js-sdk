import sinon from 'sinon';

const productRecommendations = jest.requireActual('../product-recommendations');

export const getProductRecommendations = sinon.stub(
  productRecommendations,
  'getProductRecommendations',
).callThrough();
