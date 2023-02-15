# 35up Javascript SDK - browser

This library is designed for browser environments providing Javascript APIs to 
integrate 35up into your online shop.

## Installation
You can install this package by executing the following command:
```$xslt
npm i -S @35up/js-sdk-browser
```

or you can include it dynamically by adding it as your website asset and
inserting the following tag into your HTML:
```$xslt
<script type="text/javascript" src="your-site-assets/35up-js-sdk.iife.min.js"></script>
```

In this case all the API will be available from the global object
`thirtyFiveUp`

## How to use

### Call `initialise` function
The library exposes `initialise` function that prepares and returns an
`Sdk` instance that has several methods:

```js
  import { initialise } from '@35up/js-sdk-browser';

  const config = {
    seller: 'your_seller_id',
    lang: 'de',
    country: 'de'
  };
  
  const tfup = initialise(config);
  
  // Getting recommendations
  const result = await tfup.getProductRecommendations({
    baseProduct: {title: 'Samsung Galaxy S20 Cosmic grey'},
  });
```

Full configuration parameters list:

| Parameter | Description                                                             | Optional |
|-----------|-------------------------------------------------------------------------|----------|
| seller    | Your seller ID (contact 35up team to get one)                           | No       |
| lang      | Language `ISO 639-1` code (i.e. `de`, `en`)                             | Yes      |
| country   | Country `ISO 3166` code (i.e. `us`, `fr`)                               | Yes      |
| session   | The ID of a session (use only if you want to generate session yourself) | Yes      |

### Methods

This package provides following methods:
[Reference for cross-environment methods](../base/README.md#methods)

## Requirements

[Reference for cross-environment requirements](../base/README.md#requirements)

## About sessions

When a session is not provided we generate a unique session id which will
be stored in the browser `localStorage` and used between client sessions.

The _Sdk_ exposes a `resetSession` method that removes the session from
`localStorage`, in case a new session id is desired.
