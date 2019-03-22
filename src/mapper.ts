import {
  Track,
  Identify,
  Page,
  ProductViewed,
  ProductAdded,
  ProductRemoved,
  CartViewed,
  OrderCompleted
} from "@segment/integration-sdk/lib/facade/events";
import {
  ReSciBase,
  ReSciCustomEvent,
  ReSciIdentify,
  ReSciPageView,
  ReSciEvent,
  ReSciViewedProduct,
  ReSciAddedProduct,
  ReSciRemovedProduct,
  ReSciViewedCart,
  ReSciCompletedOrder
} from "./types";
import _ from "lodash";

export class Mapper {
  pageView(msg: Page): ReSciPageView {
    return {
      name:
        ((msg.toJSON()["name"] || msg.properties.toJSON()["name"]) as string) ||
        "",
      properties: msg.properties,
      ...this.basePayload(msg)
    };
  }

  identify(msg: Identify): ReSciIdentify {
    return {
      ...this.basePayload(msg),
      traits: msg.traits.toJSON(),
      page: msg.context.page.toJSON()
    };
  }

  customEvent(msg: Track): ReSciCustomEvent {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg)
    };
  }

  viewedProduct(msg: ProductViewed): ReSciViewedProduct {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg),
      event: "Viewed Product"
    };
  }

  addedProduct(msg: ProductAdded): ReSciAddedProduct {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg),
      event: "Added Product",
      properties: {
        products: [msg.properties.toJSON()]
      }
    };
  }

  removedProduct(msg: ProductRemoved): ReSciRemovedProduct {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg),
      event: "Removed Product",
      properties: {
        products: [msg.properties.toJSON()]
      }
    };
  }

  viewedCart(msg: CartViewed): ReSciViewedCart {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg),
      event: "Viewed Cart",
      properties: {
        products: [msg.properties.toJSON()]
      }
    };
  }

  orderCompleted(msg: OrderCompleted): ReSciCompletedOrder {
    return {
      ...this.basePayload(msg),
      ...this.baseEventPayload(msg),
      event: "Completed Order",
      properties: {
        ...msg.properties.toJSON(),
        products: msg.properties.products.map(p => p.toJSON()),
        orderedAt: msg.timestamp.toString()
      }
    };
  }

  private basePayload(msg: Track | Identify | Page): ReSciBase {
    return {
      ip: msg.context.ip,
      userId: msg.userId,
      anonymousId: msg.anonymousId
    };
  }

  private baseEventPayload(event: Track): ReSciEvent {
    return {
      event: event.event,
      properties: event.properties.toJSON(),
      page: event.context.page.toJSON(),
      traits: (event.context.toJSON()["traits"] as object) || {}
    };
  }
}
