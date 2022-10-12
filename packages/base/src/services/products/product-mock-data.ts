import { TProduct } from './products-types';


export const getMockProductDetails = (): TProduct => ({
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
    addToCart: 'https://easy.35up.io/de/de/add/sku/HCI60XX114014XXAPIP60/?seller=o2',
    deleteFromCart: 'https://easy.35up.io/de/de/delete/sku/HCI60XX114014XXAPIP60/?seller=o2',
    goToCheckout: 'https://easy.35up.io/de/de/go/checkout/?seller=o2',
    goToCart: 'https://easy.35up.io/de/de/go/cart/?seller=o2',
    singleClickCheckout: 'https://easy.35up.io/de/de/add-and-go/sku/HCI60XX114014XXAPIP60/?seller=o2',
  },
  descriptions: {
    short: 'Hardshell cell phone case',
    long: (
      'Our hardshell cell phone cases can be attached to your smartphone...'
    ),
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
    package: undefined,
  },
  taxes: [],
  gtin: {
    ian: 'asdfb',
  },
  specs: {
    height: undefined,
    weight: undefined,
    width: undefined,
    length: undefined,
    color: undefined,
    type: 'phone hard case',
    materials: undefined,
  },
});
