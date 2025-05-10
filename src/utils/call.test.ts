/* eslint-disable sonarjs/no-duplicate-string */

import nock from "nock";

import type { AuthorizationPayload, CallValidHeaders } from "../models";
import { call } from "./call";

describe("Util: call", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("is defined #sanity", () => {
    // ASSERT
    expect(call).toBeDefined();
  });

  it("uses a GET request by default", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";
    const baseUrl = "https://abc.xyz";
    const path = "/v1/endpoint";

    // ... ensure we intercept a GET request ...
    const mockScope = nock(baseUrl).get(path).reply(200, { foo: "bar" });

    // ACT
    const response = await call({ url: mockRequestUrl }, mockAuthorization);

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(mockScope.isDone()).toBeTruthy(); // Verify the request was made
  });

  it("can accept a custom method", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";
    const baseUrl = "https://abc.xyz";
    const path = "/v1/endpoint";

    // Ensure we intercept a POST request
    const mockScope = nock(baseUrl).post(path).reply(200, { foo: "bar" });

    // ACT
    const response = await call(
      { url: mockRequestUrl, method: "POST" },
      mockAuthorization
    );

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(mockScope.isDone()).toBeTruthy(); // Verify the request was made
  });

  it("makes an authenticated fetch call with a given configuration", async () => {
    // ARRANGE
    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockHeaders: CallValidHeaders = {
      "Accept-Language": "en-us"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";
    const baseUrl = "https://abc.xyz";
    const path = "/v1/endpoint";

    // Check for the expected headers
    const mockScope = nock(baseUrl)
      .post(path)
      .matchHeader("Accept-Language", "en-us")
      .matchHeader("Authorization", `Bearer ${mockAuthorization.accessToken}`)
      .reply(200, { foo: "bar" });

    // ACT
    await call(
      {
        url: mockRequestUrl,
        method: "POST",
        headers: mockHeaders
      },
      mockAuthorization
    );

    // ASSERT
    expect(mockScope.isDone()).toBeTruthy(); // Verify the request was made with correct headers
  });
});
