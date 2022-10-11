import { ProductRecommendation, RecommendationsData } from '../../types';


function makeRecommendation(): ProductRecommendation {
  return {
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
      long: (
        'Our hardnut cello phone cases can be attached to your smartphone...'
      ),
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
        height: {
          value: 15,
          unit: 'cm',
        },
        length: {
          value: 5,
          unit: 'mm',
        },
        weight: {
          value: 300,
          unit: 'gr',
        },
        width: {
          value: 5,
          unit: 'cm',
        },
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
    gtin: {
      isbn: '2355232435',
    },
    specs: {
      height: {
        value: 15,
        unit: 'cm',
      },
      weight: {
        value: 300,
        unit: 'gr',
      },
      width: {
        value: 5,
        unit: 'cm',
      },
      length: {
        value: 5,
        unit: 'mm',
      },
      color: 'darkblue',
      type: 'phone hard case',
      materials: [
        'silicon',
        'plastic',
      ],
    },
  };
}

export const getMockRecommendations = (): RecommendationsData => ({
  recommendations: [
    makeRecommendation(),
    makeRecommendation(),
    makeRecommendation(),
    makeRecommendation(),
  ],
});

