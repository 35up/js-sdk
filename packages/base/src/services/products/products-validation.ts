import {
  composeValidations,
  skipValidation,
  validateList,
  validateRecord,
  validateRequired,
  validateObjectMap,
} from '@35up/tslib-utils';
import type { TProduct } from './products-types';


const validateLogo = validateRecord<TProduct['vendor']['logo']>({
  landscape: validateRequired(''),
  square: validateRequired(''),
});

const validateProductVendor = validateRecord<TProduct['vendor']>({
  id: validateRequired(''),
  legalName: validateRequired(''),
  name: validateRequired(''),
  logo: validateLogo,
});

function generateFormattedPrice(
  value: number | undefined,
  currency: string | undefined,
): string {
  if (value === undefined) return '';

  if (currency) {
    return Intl.NumberFormat([], {style: 'currency', currency})
      .format(value);
  }

  return Intl.NumberFormat([]).format(value);
}


const validatePrice = composeValidations(
  price => (!price ? price : ({
    ...price,
    formatted: (
      price.formatted ?? generateFormattedPrice(price.value, price.currency)
    ),
  })),
  validateRecord<TProduct['price']>({
    value: validateRequired(Number.NaN),
    currency: validateRequired(''),
    formatted: validateRequired(''),
  }),
);

const validateActions = validateRecord<TProduct['actions']>({
  addToCart: validateRequired(''),
  deleteFromCart: validateRequired(''),
  goToCheckout: validateRequired(''),
  goToCart: skipValidation,
  singleClickCheckout: skipValidation,
});

const validateMaybeMeasurement = validateRecord<{
  unit: string;
  value: number;
} | undefined
  >({
    value: validateRequired(Number.NaN),
    unit: validateRequired(''),
  });

const validateDelivery = validateRecord<TProduct['delivery']>({
  timeMax: skipValidation,
  timeMin: skipValidation,
  package: validateRecord<TProduct['delivery']['package']>({
    height: validateMaybeMeasurement,
    length: validateMaybeMeasurement,
    weight: validateMaybeMeasurement,
    width: validateMaybeMeasurement,
  }),
});

const validateTax = validateRecord<TProduct['taxes'][0]>({
  type: validateRequired(''),
  base: validateRequired(''),
  code: validateRequired(''),
  included: validateRequired<boolean>(false),
  rate: validateRequired(Number.NaN),
});

const validateDescriptions = validateRecord<TProduct['descriptions']>({
  short: validateRequired(''),
  long: validateRequired(''),
});

const validateImages = composeValidations(
  validateRecord<TProduct['images']>({
    thumbnail: validateRequired(''),
    small: skipValidation,
    medium: skipValidation,
    large: skipValidation,
  }),
  image => (!image ? image : ({
    ...image,
    thumbnail: image.thumbnail ?? image.small ?? image.medium ?? image.large,
  })),
);

export const validateProduct = validateRecord<TProduct>({
  name: validateRequired(''),
  sku: validateRequired(''),
  vendor: validateProductVendor,
  price: validatePrice,
  actions: validateActions,
  descriptions: validateDescriptions,
  images: validateImages,
  delivery: validateDelivery,
  categories: validateRequired<string[]>([]),
  taxes: validateList(validateTax),
  gtin: validateObjectMap<string>(
    validateRequired(''),
  ),
  specs: validateRecord<TProduct['specs']>({
    height: validateMaybeMeasurement,
    weight: validateMaybeMeasurement,
    width: validateMaybeMeasurement,
    length: validateMaybeMeasurement,
    color: skipValidation,
    type: validateRequired(''),
    materials: validateList<string>(
      validateRequired(''),
    ),
  }),
});
