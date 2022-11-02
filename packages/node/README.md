# 35up Javascript SDK - node

This library is designed for node environments providing Javascript APIs to 
integrate 35up into your online shop.

## Installation
You can install this package by executing the following command:
```$xslt
npm i -S @35up/js-sdk-node
```

## How to use

### Call `initialise` function
The library exposes `initialise` function that prepares and returns a 
`Sdk` instance:

```js
  import { initialise } from '@35up/js-sdk-node';

  const config = {
    partner: 'your_partner_id',
    lang: 'de',
    country: 'de'
  };

  const sdk = initialise(config);
```

Full configuration parameters list:

| Parameter | Description                                                             | Optional |
|-----------|-------------------------------------------------------------------------|----------|
| partner   | Your partner ID (contact 35up team to get one)                          | No       |
| lang      | Language `ISO 639-1` code (i.e. `de`, `en`)                             | Yes      |
| country   | Country `ISO 3166` code (i.e. `us`, `fr`)                               | Yes      |
| session   | The ID of a session (use only if you want to generate session yourself) | Yes      |

### Methods

[Reference for cross-environment methods](../base/README.md#methods)

#### `createOrder`
Places an order on the 35up marketplace

##### Input
```ts
  interface CreateOrderParams {
    reference: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
    };
    shippingAddress?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      company?: string;
      street: string;
      streetNumber: string;
      extra?: string;
      city: string;
      postcode: string;
      state?: string;
      country: string;
    };
    items: {
      sku: string;
      qty: number;
      config?: Record<string, string>;
    }[];
  }

  const details: CreateOrderDetails = {
    reference: '45883SKU34',
    customer: {
      firstName: 'Peter',
      lastName: 'Pan',
      email: 'peter@pan.com',
    },
    shippingAddress: {
      street: 'Home Unter the Ground',
      streetNumber: '3',
      city: 'Neverland',
      country: 'XX',
      postcode: '1911',
      phone: '+1123123123',
    },
    items: [
      {sku: 'HCI60XX114014XXAPIP60', qty: 9},
      {sku: 'FEI60XX114014XXAPIP80', qty: 1, config: {size: 'M'}},
    ],
  };
```

#### Output
```ts
  interface CreateOrderResponse {
    id: string;
    // New orders are always placed in "pending" state unless specified
    // in the request.
    status: string;
    updatedAt: string;
    createdAt: string;
  }

  const response: CreateOrderResponse = {
    id: '42346434',
    status: 'pending',
    createdAt: '1579685580',
    updatedAt: '1579685589',
  }
```

## Requirements

[Reference for cross-environment requirements](../base/README.md#requirements)