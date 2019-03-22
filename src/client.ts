import {
  ReSciIdentify,
  ReSciPageView,
  ReSciEvent
} from "./types";
import axios, { AxiosResponse, AxiosInstance } from "axios";
import _ from "@segment/integration-sdk/lib/utils";
import { IntegrationResponse } from "@segment/integration-sdk/lib/responses";

export interface ReSciResponse extends AxiosResponse {
  status:
    | 200 // Processed. Request has been received and logged
    | 202 // Queued. Request could not be processed within 300 ms due to load, so it has been queued.
    | 400 // Bad Request. Request is malformed, or otherwise contains an error.
    | 401 // Unauthorized: you have secure tracking enabled, but the request is not authenticated
    | 403 // Forbidden: Your project is not registered, or you have defined exclusions for this visitor
    | 500 // There has been a server error. Please double check your request format, then report to support@ReSci.com.
    | 501; // There has been a server error. Please double check your request format, then report to support@ReSci.com.
}

export class Client {
  private client: AxiosInstance;

  constructor(token: string) {
    this.client = axios.create({
      baseURL: "https://events.retentionscience.com/v2/",
      headers: { Authorization: `ApiKey ${token}` }
    });
  }

  async event(payload: ReSciEvent) {
    return await this.request("/track", payload);
  }

  async identify(payload: ReSciIdentify) {
    return await this.request("/identify", payload);
  }

  async pageView(payload: ReSciPageView) {
    return await this.request("/page", payload);
  }

  private async request(
    path: string,
    payload: ReSciIdentify | ReSciPageView | ReSciEvent
  ): Promise<IntegrationResponse> {
    try {
      const res = await this.client.post(
        path,
        _.deepReject(payload)
      ) as ReSciResponse;
      return new IntegrationResponse(res.status, res.data);
    } catch (e) {
      console.log(e.status);
      throw new IntegrationResponse(e.response.status, e.response.statusText);
    }
  }
}
