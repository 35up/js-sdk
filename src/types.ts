// eslint-disable-next-line @typescript-eslint/naming-convention
type mixed = boolean | string | number | Record<string, unknown>;

export interface BaseProduct {
  title: string;
  price?: number;
  value?: number;
  color?: string;
  category?: string;
  tag?: mixed
  [x: string]: unknown;
}

export interface Customer {
  age?: number | [number, number];
  gender?: string;
  postcode?: number;
  city?: string;
  country?: string;
  [x: string]: unknown;
}

export interface SdkInitConfig {
  partner: string;
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
  lang: string;
  country: string;
}

export interface SdkConfig extends SdkInitConfig {
  session: string;
  apiUrl: string;
}

export interface RecommendationParams {
  baseProduct: BaseProduct;
  customer?: Customer;
  lang?: string;
  country?: string;
  limit?: number;
}

export interface Logo {
  square: string;
  landscape: string;
}

export interface Vendor {
  id: string;
  name: string;
  legalName: string;
  logo: Logo;
}

export interface Price {
  value: number;
  currency: string;
  formatted: string;
  label?: string;
}

export interface Images {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

export interface Descriptions {
  short: string;
  long: string;
}

export interface Actions {
  singleClickCheckout?: string;
  addToCart: string;
  deleteFromCart: string;
  goToCart?: string;
  goToCheckout: string;
}

export interface ValueWithUnit {
  unit: string;
  value: number;
}

export interface Delivery {
  timeMin?: number;
  timeMax?: number;
  package?: {
    weight?: ValueWithUnit;
    width?: ValueWithUnit;
    height?: ValueWithUnit;
    length?: ValueWithUnit;
  }
}

export interface Specs {
  type: string;
  materials?: string[];
  color?: string;
  weight?: ValueWithUnit;
  width?: ValueWithUnit;
  height?: ValueWithUnit;
  length?: ValueWithUnit;
  contract?: {
    duration?: ValueWithUnit;
  }
}

export interface Gtin { [k: string]: string; }

export interface Tax {
  code: string;
  type: string;
  base: string;
  rate: number;
  included: boolean;
}

export interface ProductRecommendation {
  sku: string;
  vendor: Vendor;
  name: string;
  images: Images;
  descriptions: Descriptions;
  specs: Specs;
  delivery?: Delivery;
  price?: Price;
  gtin?: Gtin;
  taxes?: Tax[];
  urls?: Record<string, string>;
  actions?: Actions;
  details?: Record<string, unknown>;
  categories?: string[];
  tags?: string[];
}

export interface RecommendationsData {
  recommendations: ProductRecommendation[],
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  PROCESSING = 'processing',
  FULFILLED = 'fulfilled',
  DELIVERED = 'delivered',
  PENDING_CANCELLATION = 'pending_cancellation',
  CANCELLED = 'cancelled',
  CLOSED = 'closed',
}

export interface CreateOrderCustomer {
  /**
   * First name of the customer.
   */
  firstName: string;
  /**
   * Last name of the customer.
   */
  lastName: string;
  /**
   * Email address of the customer.
   */
  email: string;
  /**
   * Phone number of the customer.
   */
  phone?: string;
}

export interface CreateOrderShippingAddress {
  /**
   * First name of the customer. If not provided in `customer.firstName` will
   * be used as default.
   */
  firstName?: string;
  /**
   * Last name of the customer. If not provided, `customer.lastName` will be
   * used as default.
   */
  lastName?: string;
  /**
   * Email address of the customer. If not provided, `customer.email` will be
   * used as default.
   */
  email?: string;
  /**
   * Phone number of the customer. If not provided in delivery, `customer.phone`
   * will be used as default.
   */
  phone?: string;
  /**
   * Name of the company, in case the delivery address is non-residential.
   */
  company?: string;
  /**
   * Street name of the customer's delivery address.
   */
  street: string;
  /**
   * Street number of the customer's delivery address.
   */
  streetNumber: string;
  /**
   * Additional information needed for delivery, for example, apartment number,
   * "c/o" information, etc.
   */
  extra?: string;
  /**
   * City of the customer.
   */
  city: string;
  /**
   * Postal Code of the customer.
   */
  postcode: string;
  /**
   * State of the customer, required in US, CA and AU in 2 digit iso code
   * (ISO 3166-1 alpha-2).
   */
  state?: string;
  /**
   * Country of the customer's address in 2 digit iso code (ISO 3166-1 alpha-2).
   */
  country: string;
}

export interface CreateOrderItem {
  /**
   * Unique identifier of the product.
   */
  sku: string;
  /**
   * Quantity of that product.
   */
  qty: number;
  config?: Record<string, string>;
}

export interface CreateOrderDetails {
  /**
   * This field accepts an arbitrary string sent by the partner to assist
   * tracking the order and relating it to a base order. Although this field is
   * optional, we strongly recommend always sending it containing the seller's
   * orderId.
   */
  reference: string;
  /**
   * Information about the billing address of the customer.
   */
  customer: CreateOrderCustomer;
  /**
   * Information about the delivery address of the customer for products that
   * require physical delivery.
   */
  shippingAddress?: CreateOrderShippingAddress;
  /**
   * Information about the items bought from the marketplace as cross selling
   * products in that order.
   */
  items: CreateOrderItem[];
}

export interface CreateOrderResult {
  /**
   * Order number of the cross-selling order within 35up marketplace.
   */
  id: string;
  status: ORDER_STATUS;
  /**
   * Defines date and time of last change of order status.
   */
  updatedAt: Date;
  /**
   * Defines date and time when order was created.
   */
  createdAt: Date;
}
