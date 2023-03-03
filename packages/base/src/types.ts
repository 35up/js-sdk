import {
  TActions,
  TBaseProduct,
  TCustomer,
  TDelivery,
  TDescriptions,
  TGtin,
  TImages,
  TLogo,
  TPrice,
  TSpecs,
  TTax,
  TValueWithUnit,
  TVender,
} from './validations';


export interface BaseProduct extends TBaseProduct {}

export interface Customer extends TCustomer {}

export interface Logo extends TLogo {}

export interface Vendor extends TVender {}

export interface ValueWithUnit extends TValueWithUnit {}

export interface Descriptions extends TDescriptions {}

export interface Images extends TImages {}

export interface Price extends TPrice {}

export interface Actions extends TActions {}

export interface Delivery extends TDelivery {}

export interface Specs extends TSpecs {}

export interface Gtin extends TGtin {}

export interface Tax extends TTax {}

export interface SdkInitConfig {
  seller: string;
  /**
   * A unique session ID which is used to connect several requests over time.
   * The unique session ID can be any unique string.
   */
  session?: string;
  /**
   * By default, this sdk interfaces with the API located at
   * https://api.35up.io/v1, but it can be configured to point to a sandbox
   * server, a proxy, or a mock implementation, by specifying another url
   */
  apiUrl?: string;
  lang?: string;
  country?: string;
}

export interface SdkConfig extends SdkInitConfig {
  session: string;
  apiUrl: string;
}

export interface BaseInputParams {
  session?: string;
}

export interface GetRecommendationsParams extends BaseInputParams {
  baseProduct: BaseProduct;
  customer?: Customer;
  lang?: string;
  country?: string;
  limit?: number;
}

export interface GetProductDetailsParams {
  sku: string,
  lang?: string;
  country?: string;
}
