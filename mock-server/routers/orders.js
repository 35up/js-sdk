const express = require('express');
const { faker } = require('@faker-js/faker');


const router = express.Router();

const ORDER_STATUS = [
  'pending',
  'approved',
  'processing',
  'fulfilled',
  'delivered',
  'pending_cancellation',
  'cancelled',
  'closed',
];

router.post('/', (req, res) => {
  res.status(200).json({
    id: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(ORDER_STATUS),
    createdAt: `${Math.round(faker.date.recent().getTime() / 1000)}`,
    updatedAt: `${Math.round(faker.date.recent().getTime() / 1000)}`,
  });
});

module.exports = {ordersRouter: router};
