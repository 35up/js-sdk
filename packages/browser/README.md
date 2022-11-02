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
The library exposes `initialise` function that prepares and returns a 
`Sdk` instance:

```js
  import { initialise } from '@35up/js-sdk-browser';

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

## About sessions

When a session is not provided, we do generate a unique session id. But
that session id will be stored in the browser `localStorage` to be used between
client sessions.

If, for any reason, you want a new session id to be generated, the Sdk exposes a
`resetSession` function, that will remove the session from `localStorage`. Of
course, in the next Sdk call, a new session id will be generated.

To avoid all of this, you just need to provide session id yourself.
