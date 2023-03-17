const express = require('express');
const { makeRecommendation } = require('./data');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({recommendations: [...Array(5)].map(makeRecommendation)});
});

module.exports = {recommendationsRouter: router};
