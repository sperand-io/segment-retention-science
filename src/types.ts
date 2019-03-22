import { Product, ProductList, Order } from "@segment/spec/types/ecommerce";

export interface ReSciBase {
  anonymousId?: string;
  userId?: string;
  ip?: string;
}

export interface ReSciEvent extends ReSciBase {
  event: string;
  properties: ReSciProperties;
  page: ReSciPage;
  traits: ReSciTraits;
}

export interface ReSciIdentify extends ReSciBase {
  traits?: ReSciTraits;
  page?: ReSciPage;
}

export interface ReSciPageView extends ReSciBase {
  name: string;
  properties: ReSciPage;
}

export interface ReSciProperties {
  [key: string]: any;
}

export interface ReSciTraits {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  [key: string]: any;
}

export interface ReSciPage {
  path?: string;
  referrer?: string;
  search?: string;
  title?: string;
  url?: string;
  [key: string]: any;
}

export interface ReSciCustomEvent extends ReSciEvent {
  event: string;
}

export interface ReSciViewedProduct extends ReSciEvent {
  event: "Viewed Product";
  properties: Product;
}

export interface ReSciAddedProduct extends ReSciEvent {
  event: "Added Product";
  properties: ProductList
}

export interface ReSciRemovedProduct extends ReSciEvent {
  event: "Removed Product";
  properties: ProductList;
}

export interface ReSciViewedCart extends ReSciEvent {
  event: "Viewed Cart";
  properties: ProductList;
}

export interface ReSciCompletedOrder extends ReSciEvent {
  event: "Completed Order";
  properties: ReSciOrder;
}

export interface ReSciOrder extends Order {
  orderedAt: string;
  orderStatus?: string;
}
