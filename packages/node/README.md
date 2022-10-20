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

## Requirements

[Reference for cross-environment requirements](../base/README.md#requirements)
