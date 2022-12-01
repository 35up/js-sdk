# 35up Javascript SDK - node

This library is designed for node environments providing Javascript APIs to 
integrate 35up into your online shop.

## Installation
You can install this package by executing the following command:
```$xslt
npm i -S @35up/js-sdk-node
```

## How to use

The library exposes `initialise` function that prepares and returns an 
`Sdk` instance that has several methods:

```js
  import { initialise } from '@35up/js-sdk-node';

  const config = {
    seller: 'your_seller_id',
    lang: 'de',
    country: 'de',
    credentials: {
      username: 'example-user',
      password: 'example-password',
    }
  };

  const sdk = initialise(config);
  
  // Getting recommendations
  const result = await sdk.getProductRecommendations({
    baseProduct: {title: 'Samsung Galaxy S20 Cosmic grey'},
  });
```

Full configuration parameters list:

| Parameter   | Description                                                                     | Optional |
|-------------|---------------------------------------------------------------------------------|----------|
| seller      | Your seller ID (contact 35up team to get one)                                   | No       |
| lang        | Language `ISO 639-1` code (i.e. `de`, `en`)                                     | Yes      |
| country     | Country `ISO 3166` code (i.e. `us`, `fr`)                                       | Yes      |
| session     | The ID of a session (use only if you want to generate session yourself)         | Yes      |
| credentials | Object containing `username` and `password` for basic authentication in the API | Yes      |

### Methods

In addition to [cross-environment methods](../base/README.md#methods) this 
package provides the following ones:

#### `createOrder(details, credentials)`
Places an order on the 35up marketplace. If credentials where provided in the
SDK initialization, they don't need to be provided here.

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
  
  interface Credentials {
    username: string;
    password: string;
  }
```

```ts
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

  const credentials: Credentials = {
    username: 'example-user',
    password: 'example-password',
  }
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
