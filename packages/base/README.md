# 35up Javascript SDK - base

This library is used as a dependency for `js-sdk-browser` and `js-sdk-node`
packages. It exposes common functionality that are used in both environments.

## Methods

### `getRecommendations`
Returns a list of product recommendations based on the input

#### Input
```ts
  interface RecommendationParams {
    baseProduct: {
      title: string,
      price?: number,
      value?: number,
      color?: string,
      category?: string,
      tag?: boolean | string | number | object,
      [key: string]?: unknown,
    },
    customer?: {
      age?: number | [number, number],
      gender?: string,
      postcode?: number,
      city?: string,
      country?: string,
      [key: string]?: unknown,
    },
    lang?: string,
    country?: string,
    limit?: number,
  }

  const params: RecommendationParams = {
    partner: 'partner-id',
    limit: 10,
    baseProduct: {
      title: 'Samsung Galaxy S20',
      category: 'Electronics',
      extra: {
        'device-type': 'smartphone',
      },
    },
    customer: {
      age: [20, 30],
      cities: ['Berlin', 'Frankfurt am Main'],
    },
  };
```

Note that `getRecommendations` is an asynchronous function and returns a 
`Promise`.

#### Output

```ts
  interface Recommendation {
    sku: string;
    vendor: {
      id: string;
      name: string;
      legalName: string;
      logo: {
        square: string;
        landscape: string;
      };
    };
    name: string;
    images: {
      thumbnail: string;
      small?: string;
      medium?: string;
      large?: string;
    };
    descriptions: {
      short: string;
      long: string;
    };
    specs: {
      type: string;
      materials?: string[];
      color?: string;
      weight?: { unit: string; value: number; };
      width?: { unit: string; value: number; };
      height?: { unit: string; value: number; };
      length?: { unit: string; value: number; };
      contract?: {
        duration?: { unit: string; value: number; };
      }
    };
    delivery?: {
      timeMin?: number;
      timeMax?: number;
      package?: {
        weight?: { unit: string; value: number; };
        width?: { unit: string; value: number; };
        height?: { unit: string; value: number; };
        length?: { unit: string; value: number; };
      }
    };
    price?: {
      value: number;
      currency: string;
      formatted: string;
      label?: string;
    };
    gtin?: Record<string, string>;
    taxes?: {
      code: string;
      type: string;
      base: string;
      rate: number;
      included: boolean;
    }[];
    urls?: Record<string, string>;
    actions?: {
      singleClickCheckout?: string;
      addToCart: string;
      deleteFromCart: string;
      goToCart?: string;
      goToCheckout: string;
    };
    details?: Record<string, unknown>;
    categories?: string[];
    tags?: string[];
  }

  const recommendations: Recommendation[] = [{
    name: 'Galaxy S500 HardCase, "Realism" by Dan Say',
    sku: 'caseable/BCI60XX114014XXAPIP67',
    categories: [],
    vendor: {
      id: 'caseable',
      legalName: 'caseable GmbH',
      name: 'caseable',
      logo: {
        landscape: 'https://caseable.com/media/logo/horizontal.png',
        square: 'https://caseable.com/media/logo/squared.png',
      },
    },
    price: {
      value: 99.3,
      currency: 'EUR',
      formatted: '€ 99,30',
    },
    actions: {
      addToCart: 'https://easy.35up.io/de/de/add/sku/BCI60XX114014XXAPIP67/?partner=o2',
      deleteFromCart: 'https://easy.35up.io/de/de/delete/sku/BCI60XX114014XXAPIP67/?partner=o2',
      goToCheckout: 'https://easy.35up.io/de/de/go/checkout/?partner=o2',
      goToCart: 'https://easy.35up.io/de/de/go/cart/?partner=o2',
      singleClickCheckout: 'https://easy.35up.io/de/de/add-and-go/sku/BCI60XX114014XXAPIP67/?partner=o2',
    },
    descriptions: {
      short: 'Hardnut cello phone case',
      long: 'Our hardnut cello phone cases can be attached to your smartphone...',
    },
    images: {
      thumbnail: 'https://caseable.com/media/product/galaxy-s500-hc/dan-say/realism/thumb.jpg',
      small: 'https://caseable.com/media/product/galaxy-s500-hc/dan-say/realism/small.jpg',
      medium: 'https://caseable.com/media/product/galaxy-s500-hc/dan-say/realism/medium.jpg',
      large: 'https://caseable.com/media/product/galaxy-s500-hc/dan-say/realism/large.jpg',
    },
    delivery: {
      timeMin: 3,
      timeMax: 5,
      package: {
        height: { value: 15, unit: 'cm' },
        length: { value: 5, unit: 'mm' },
        weight: { value: 300, unit: 'gr' },
        width: { value: 5, unit: 'cm' },
      },
    },
    taxes: [
      {
        code: 'MNL',
        type: 'included',
        base: 'net',
        rate: 0.27,
        included: false,
      },
      {
        code: 'VAT',
        type: 'standard',
        base: 'gross',
        rate: 0.15,
        included: true,
      },
    ],
    gtin: { isbn: '2355232435' },
    specs: {
      height: { value: 15, unit: 'cm' },
      weight: { value: 300, unit: 'gr' },
      width: { value: 5, unit: 'cm' },
      length: { value: 5, unit: 'mm' },
      color: 'darkblue',
      type: 'phone hard case',
      materials: [ 'silicon', 'plastic' ],
    },
  }];
```

#### `getProduct`
Returns details of a given product

#### Input
```ts
  interface ProductParams {
    lang?: string;
    country?: string;
  }

  const params: ProductParams = {
    lang: 'en',
    country: 'uk',
  };
```

Note that `getProduct` is an asynchronous function and returns a 
`Promise`.

#### Output

```ts
  interface Product {
    sku: string;
    vendor: {
        id: string;
        name: string;
        legalName: string;
        logo: {
          square: string;
          landscape: string;
        };
      };
      name: string;
      images: {
        thumbnail: string;
        small?: string;
        medium?: string;
        large?: string;
      };
      descriptions: {
        short: string;
        long: string;
      };
    categories: string[];
    actions: {
      singleClickCheckout?: string;
      addToCart: string;
      deleteFromCart: string;
      goToCart?: string;
      goToCheckout: string;
    };
    delivery: {
      timeMin?: number;
      timeMax?: number;
      package?: {
        weight?: { unit: string; value: number; };
        width?: { unit: string; value: number; };
        height?: { unit: string; value: number; };
        length?: { unit: string; value: number; };
      }
    };
    specs?: {
      type: string;
      materials?: string[];
      color?: string;
      weight?: { unit: string; value: number; };
      width?: { unit: string; value: number; };
      height?: { unit: string; value: number; };
      length?: { unit: string; value: number; };
    };
    gtin?: Record<string, string>;
    taxes: {
      code: string;
      type: string;
      base: string;
      rate: number;
      included: boolean;
    }[];
  }

  const product: Product = {
    name: 'Galaxy S10 HardCase, "Release" by Dan May',
    sku: 'caseable/HCI60XX114014XXAPIP60',
    categories: [
      'accessories',
      'cases',
    ],
    vendor: {
      id: 'caseable',
      legalName: 'caseable GmbH',
      name: 'caseable',
      logo: {
        landscape: 'https://caseable.com/media/logo/horizontal.png',
        square: 'https://caseable.com/media/logo/squared.png',
      },
    },
    price: {
      value: 29.3,
      currency: 'EUR',
      formatted: '€ 29,30',
    },
    actions: {
      addToCart: 'https://easy.35up.io/de/de/add/sku/HCI60XX114014XXAPIP60/?partner=o2',
      deleteFromCart: 'https://easy.35up.io/de/de/delete/sku/HCI60XX114014XXAPIP60/?partner=o2',
      goToCheckout: 'https://easy.35up.io/de/de/go/checkout/?partner=o2',
      goToCart: 'https://easy.35up.io/de/de/go/cart/?partner=o2',
      singleClickCheckout: 'https://easy.35up.io/de/de/add-and-go/sku/HCI60XX114014XXAPIP60/?partner=o2',
    },
    descriptions: {
      short: 'Hardshell cell phone case',
      long: 'Our hardshell cell phone cases can be attached to your smartphone...',
    },
    images: {
      thumbnail: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/thumb.jpg',
      small: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/small.jpg',
      medium: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/medium.jpg',
      large: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/large.jpg',
    },
    delivery: {
      timeMax: 4,
      timeMin: 2,
    },
    taxes: [],
    gtin: { ian: 'asdfb' },
    specs: {
      type: 'phone hard case',
    },
  };
```

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
