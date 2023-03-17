const { faker } = require('@faker-js/faker');


const ACTION_URL = 'https://easy.35up.io/de/de';

const vendors = [...Array(faker.datatype.number({min: 3, max: 6}))]
  .map(() => {
    const vendorName = faker.company.name();
    return {
      id: vendorName.replace(/[\s,]/g, ''),
      name: vendorName,
      legalName: `${faker.company.name()} ${faker.company.companySuffix()}`,
      logo: {
        square: faker.image.business(),
        landscape: faker.image.business(),
      },
    };
  });

const vendorCategories = {
  charger: {name: 'Chargers', param: 'charger'},
  computerAccessory: {
    name: 'Computer Accessories',
    param: 'computer-accessory',
  },
  deviceSkin: {name: 'Device Skins', param: 'device-skin'},
  laptopBag: {name: 'Laptop Bags', param: 'laptop-bag'},
  smartphoneAccessory: {
    name: 'Smartphone Accessories',
    param: 'smartphone-accessory',
  },
  smartphoneCover: {name: 'Smartphone Covers', param: 'smartphone-cover'},
  sustainable: {name: 'Sustainable Products', param: 'sustainable'},
  tabletCover: {name: 'Tablet Covers', param: 'tablet-cover'},
};

function makeProductSku() {
  return `caseable/${faker.database.mongodbObjectId()}`;
}

function makePackageInfo() {
  return faker.datatype.boolean() ? undefined : {
    weight: {
      value: faker.datatype.number(2999),
      unit: 'g',
    },
    width: {
      value: faker.datatype.number(2999),
      unit: 'cm',
    },
    length: {
      value: faker.datatype.number(2999),
      unit: 'cm',
    },
    height: {
      value: faker.datatype.number(2999),
      unit: 'cm',
    },
  };
}

function makeProduct(sku) {
  const price = +faker.commerce.price();

  const cachebooster = Math.random();
  const deliveryPackage = makePackageInfo();

  return {
    sku: sku || makeProductSku(),
    vendor: faker.helpers.arrayElement(vendors),
    name: faker.commerce.productName(),
    price: {
      value: price,
      currency: 'EUR',
      formatted: `€ ${price}`,
    },
    images: {
      thumbnail: `https://placeimg.com/320/320/technics?${cachebooster}`,
      small: `https://placeimg.com/240/240/technics?${cachebooster}`,
      medium: `https://placeimg.com/480/480/technics?${cachebooster}`,
      large: `https://placeimg.com/900/900/technics?${cachebooster}`,
    },
    descriptions: {
      short: faker.commerce.productDescription(),
      long: faker.commerce.productDescription(),
    },
    categories: faker.helpers
      .arrayElements(Object.keys(vendorCategories), 2),
    actions: {
      singleClickCheckout: `${ACTION_URL}/add-and-go/sku/HCI60XX114014XXAPIP60/?partner=o2`,
      addToCart: `${ACTION_URL}/add/sku/HCI60XX114014XXAPIP60/?partner=o2`,
      deleteFromCart: `${ACTION_URL}/delete/sku/HCI60XX114014XXAPIP60/?partner=o2`,
      goToCart: `${ACTION_URL}/go/cart/?partner=o2`,
      goToCheckout: `${ACTION_URL}/go/checkout/?partner=o2`,
    },
    delivery: {
      timeMin: 2,
      timeMax: 4,
      ...(deliveryPackage ? {package: deliveryPackage} : null),
    },
    specs: {
      type: faker.commerce.product(),
      ...(faker.datatype.boolean() ? {
        color: faker.color.human(),
      } : null),
      ...(faker.datatype.boolean() ? {
        materials: [...Array(faker.datatype.number(10))]
          .map(() => faker.commerce.productMaterial()),
      } : null),
      ...makePackageInfo(),
    },
    ...(faker.datatype.boolean() ? {
      gtin: {
        isbn: faker.random.numeric(13),
      },
    } : null),
    taxes: [...Array(faker.datatype.number(3))]
      .map(() => ({
        code: faker.helpers.arrayElement(
          ['IVA', 'VAT', faker.random.alpha({count: 3, casing: 'upper'})],
        ),
        type: faker.helpers.arrayElement(
          ['standard', 'reduced', 'special'],
        ),
        base: faker.helpers.arrayElement(['net', 'gross']),
        rate: faker.datatype.number({precision: 0.01, min: 0.01, max: 1}),
        included: faker.datatype.boolean(),
      })),
  };
}

const makeRecommendation = () => ({
  ...makeProduct(),
  urls: {
    example: faker.image.image(),
  },
  details: {
    example: faker.random.words(),
  },
  tags: [...Array(faker.datatype.number(3))].map(faker.random.word),
});

module.exports = {makeProduct, makeRecommendation};
