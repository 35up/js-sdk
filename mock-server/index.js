#!/usr/bin/env node
const express = require('express');
const cors = require('cors');
const {
  ordersRouter,
  productsRouter,
  recommendationsRouter,
} = require('./routers');

const REQUEST_DELAY_TIME = 500;

const app = express();

app.use((req, res, next) => {
  setTimeout(next, REQUEST_DELAY_TIME);
});

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use('/orders/', ordersRouter);
app.use('/products/', productsRouter);
app.use('/recommendations/', recommendationsRouter);

app.listen(process.env.MOCK_PORT || 4000, () => {
  // eslint-disable-next-line no-console
  console.info('Mock server is running');
});
