import sinon from 'sinon';

const orders = jest.requireActual('../orders');

export const createOrder = sinon.stub(orders, 'createOrder').callThrough();
