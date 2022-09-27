const sinon = require('sinon');


const jsSdkBase = jest.requireActual('@35up/js-sdk-base');

const createOrderService = sinon.stub(jsSdkBase, 'createOrderService')
  .callThrough();
const getProductRecommendationsService = sinon.stub(
  jsSdkBase,
  'getProductRecommendationsService',
).callThrough();

module.exports = {
  ...jsSdkBase,
  createOrderService,
  getProductRecommendationsService,
};
