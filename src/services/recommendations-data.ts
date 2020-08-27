import { InputParameters, ProductRecommendations } from '../types';

export const getMockRecommendations = (params: InputParameters): ProductRecommendations => ({
  sku: 'caseable/HCI60XX114014XXAPIP60',
  vendor: {
    id: 'caseable',
    name: 'caseable',
    legalName: 'caseable GmbH',
    logo: {
      square: 'https://caseable.com/media/logo/squared.png',
      landscape: 'https://caseable.com/media/logo/horizontal.png',
    },
  },
  name: 'Galaxy S10 HardCase, "Release" by Dan May',
  price: {
    value: 29.3,
    currency: 'EUR',
    formatted: '€ 29,30',
  },
  images: {
    thumbnail: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/thumb.jpg',
    small: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/small.jpg',
    medium: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/medium.jpg',
    large: 'https://caseable.com/media/product/galaxy-s10-hc/dan-may/release/large.jpg',
  },
  descriptions: {
    short: 'Hardshell cell phone case',
    long: 'Our hardshell cell phone cases can be attached to your smartphone...',
  },
  actions: {
    singleClickCheckout: 'https://easy.caseable.com/de/de/add-and-go/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    addToCart: 'https://easy.caseable.com/de/de/add/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    deleteFromCart: 'https://easy.caseable.com/de/de/delete/sku/HCI60XX114014XXAPIP60/?partner=o2&session=123abc',
    goToCart: 'https://easy.caseable.com/de/de/go/cart/?partner=o2&session=123abc',
    goToCheckout: 'https://easy.caseable.com/de/de/go/checkout/?partner=o2&session=123abc',
  },
  delivery: {
    timeMin: 2,
    timeMax: 4,
  },
});
