const sinon = require('sinon');


const jsSdkBase = jest.requireActual('@35up/js-sdk-base');

const getProductRecommendationsService = sinon.stub(
  jsSdkBase,
  'getProductRecommendationsService',
).callThrough();

const getProductService = sinon.stub(
  jsSdkBase,
  'getProductService',
).callThrough();

module.exports = {
  ...jsSdkBase,
  getProductRecommendationsService,
  getProductService,
};
