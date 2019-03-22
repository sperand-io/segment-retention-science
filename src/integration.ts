import { Integration } from "@segment/integration-sdk/lib/integration";
import {
  Track,
  Identify,
  Page,
  OrderCompleted,
  ProductAdded,
  ProductViewed,
  ProductRemoved,
  CartViewed
} from "@segment/integration-sdk/lib/facade/events";
import { Success } from "@segment/integration-sdk/lib/responses";
import { parse } from "basic-auth";
import { Mapper } from "./mapper";
import { Client } from "./client";

interface Settings {
  authorization: string;
}

export class MyIntegration extends Integration {
  private mapper = new Mapper();
  private client: Client;

  constructor(public settings: Settings) {
    super();
    const auth = parse(settings.authorization);
    const token = auth && auth.name;
    this.client = new Client(token || "");
    this.subscribe<ProductViewed>("Product Viewed", this.productViewed);
    this.subscribe<ProductAdded>("Product Added", this.productAdded);
    this.subscribe<ProductRemoved>("Product Removed", this.productRemoved);
    this.subscribe<CartViewed>("Cart Viewed", this.cartViewed);
    this.subscribe<OrderCompleted>("Order Completed", this.orderCompleted);
  }

  async identify(msg: Identify) {
    const payload = this.mapper.identify(msg);
    await this.client.identify(payload);
    return new Success();
  }

  async page(msg: Page) {
    const payload = this.mapper.pageView(msg);
    await this.client.pageView(payload);
    return new Success();
  }

  async track(event: Track) {
    const payload = this.mapper.customEvent(event);
    await this.client.event(payload);
    return new Success();
  }

  async productViewed(event: ProductViewed) {
    const payload = this.mapper.viewedProduct(event);
    await this.client.event(payload);
    return new Success();
  }

  async productAdded(event: ProductAdded) {
    const payload = this.mapper.addedProduct(event);
    await this.client.event(payload);
    return new Success();
  }

  async productRemoved(event: ProductRemoved) {
    const payload = this.mapper.removedProduct(event);
    await this.client.event(payload);
    return new Success();
  }

  async cartViewed(event: CartViewed) {
    const payload = this.mapper.viewedCart(event);
    await this.client.event(payload);
    return new Success();
  }

  async orderCompleted(event: OrderCompleted) {
    const payload = this.mapper.orderCompleted(event);
    await this.client.event(payload);
    return new Success();
  }
}
