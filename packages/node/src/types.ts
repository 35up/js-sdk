import { BaseInputParams, SdkConfig, SdkInitConfig } from '@35up/js-sdk-base';


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

export interface CreateOrderParams extends BaseInputParams {
  /**
   * This field accepts an arbitrary string sent by the seller to assist
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
   * Information about the items bought from the marketplace as cross-selling
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

export interface Credentials {
  username: string;
  password: string;
}

export interface NodeSdkConfig extends SdkConfig {
  credentials?: Credentials,
}

export interface NodeSdkInitConfig extends SdkInitConfig {
  credentials?: Credentials,
}
