# 35up Javascript SDK

This library provides with Javascript APIs to integrate 35up
into your online shop.

## How to use

### 1. Include library in your project
You can include it into you code statically as a npm package
```$xslt
npm i -S @35up/js-sdk
```

or you can include it dynamically by adding it as your website asset and
inserting the following tag into your HTML:
```$xslt
<script type="text/javascript" src="your-site-assets/35up-js-sdk.iife.min.js"></script>
```

In this case all the API will be available from the global object
`thirtyFiveUp`

### 2. Call `initialise` function
The library exposes `initialise` function that prepares and returns an 
`Sdk` object:

```
  import { initialise } from '@35up/js-sdk';

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

### 3. Call `getRecommendations` sdk method to get products
Sdk object has `getRecommendations` function that returns list of product 
recommendations based on the input

```
  import { initialise } from '@35up/js-sdk';

  ...
  
  const sdk = initialise(config); 

  const input = {
    partner: 'partner-id',
    limit: 10,
    baseProduct: {
      title: 'Samsung Galaxy S20',
      category: 'Electronics',
      extra: {
        device-type: 'smartphone',
      },
    },
    customer: {
      age: [20, 30],
      cities: ['Berlin', 'Frankfurt am Main'],
    },
  };

  const recommendations = await sdk.getRecommendations(input);
```

Note that `getRecommendations` is an asynchronous function and returns a 
`Promise` object.

Full list of recommendations input params:
```
{
  baseProduct: {
    title: string, (mandatory)
    price: number,
    value: number,
    color: string,
    category: string,
    tag: boolean | string | number | object
  },
  customer: {
    age: number | [number, number],
    gender: string,
    postcode: number,
    city: string,
    country: string
  },
  lang: string,
  country: string,
  limit: number
}
```
Note: all fields are optional except `baseProduct.title` and you can also pass 
extra fields in `baseProduct` and `customer`

## Requirements

SDK library uses following javascript API and features, please make sure you have them polyfilled if you support older browsers:
 - [Fetch API]
 - [Object.entries]
 - [Object.values]
 - [Symbol]
 - [Array.isArray]


<!-- LINKS -->

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[Object.entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
[Object.values]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
[Symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[Array.isArray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
