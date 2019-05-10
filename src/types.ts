import { Product, ProductList, Order } from "@segment/spec/types/ecommerce";

export interface ReSciBase {
  anonymousId?: string;
  userId?: string;
  // `ip` is top level in ReSci, sourced from context.ip in Segment base spec
  ip?: string;
}

export interface ReSciEvent extends ReSciBase {
  event: string;
  properties: ReSciProperties;
  // `page` context is top level in ReSci Events
  // sourced from context.page in Segment track event spec
  page?: ReSciPage;
  // `traits` context is top level in ReSci Events
  // sourced from context.traits in Segment track event spec
  traits?: ReSciTraits;
}

export interface ReSciIdentify extends ReSciBase {
  traits?: ReSciTraits;
  // `page` context is top level in ReSci Identify
  // sourced from context.page in Segment identify spec
  page?: ReSciPage;
}

export interface ReSciPageView extends ReSciBase {
  name: string;
  properties: ReSciPage;
}

// Custom Event Properties
export interface ReSciProperties {
  [key: string]: any;
}

// Retention Science has some standard traits
// and allows ad hoc custom traits as well.
export interface ReSciTraits {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  [key: string]: any;
}

// Retention Science has some standard page attributes
// and allows ad hoc page attributes as well.
export interface ReSciPage {
  path?: string;
  referrer?: string;
  search?: string;
  title?: string;
  url?: string;
  [key: string]: any;
}

// Segment Events that don't have a corresponding
// ReSci Standard event type are sent as custom
export interface ReSciCustomEvent extends ReSciEvent {
  event: string;
}

// Maps to Segment "Product Viewed" event, with properties
// that match Segment product spec exactly.
export interface ReSciViewedProduct extends ReSciEvent {
  event: "Viewed Product";
  properties: Product;
}

// Maps to Segment "Product Added" event.
// Segment Product Added takes one event, but ReSci takes 
// an array that matches Segment product list spec exactly.
export interface ReSciAddedProduct extends ReSciEvent {
  event: "Added Product";
  properties: ProductList
}

// Maps to Segment "Product Removed" event.
// Segment Product Removed takes one event, but ReSci takes 
// an array that matches Segment product list spec exactly.
export interface ReSciRemovedProduct extends ReSciEvent {
  event: "Removed Product";
  properties: ProductList;
}

// Maps to Segment "Cart Viewed" event, with properties
// that match Segment product list spec exactly.
export interface ReSciViewedCart extends ReSciEvent {
  event: "Viewed Cart";
  properties: ProductList;
}

// Maps to Segment "Order Completed" event, with properties
// that are a superset of Segment Order spec.
export interface ReSciCompletedOrder extends ReSciEvent {
  event: "Completed Order";
  properties: ReSciOrder;
}

// ReSci extensions to the Segment Order spec
export interface ReSciOrder extends Order {
  orderedAt?: string;
  orderStatus?: string;
}
