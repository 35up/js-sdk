const express = require('express');
const { makeProduct } = require('./data');

const router = express.Router();

const productsMap = {};

router.get('/:sku', (req, res) => {
  const sku = req.params;
  if (!productsMap[sku]) {
    productsMap[sku] = makeProduct(sku);
  }
  res.send(productsMap[sku]);
});

module.exports = {productsRouter: router};
