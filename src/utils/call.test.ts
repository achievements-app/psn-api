/* eslint-disable sonarjs/no-duplicate-string */

import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AuthorizationPayload, CallValidHeaders } from "../models";
import { call } from "./call";

const server = setupServer();

describe("Util: call", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(call).toBeDefined();
  });

  it("uses a GET request by default", async () => {
    // ARRANGE
    let receivedMethod = "";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";

    server.use(
      rest.get(mockRequestUrl, (req, res, ctx) => {
        receivedMethod = req.method;
        return res(ctx.json({ foo: "bar" }));
      })
    );

    // ACT
    const response = await call({ url: mockRequestUrl }, mockAuthorization);

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(receivedMethod).toEqual("GET");
  });

  it("can accept a custom method", async () => {
    // ARRANGE
    let receivedMethod = "";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";

    server.use(
      rest.post(mockRequestUrl, (req, res, ctx) => {
        receivedMethod = req.method;
        return res(ctx.json({ foo: "bar" }));
      })
    );

    // ACT
    const response = await call(
      { url: mockRequestUrl, method: "POST" },
      mockAuthorization
    );

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(receivedMethod).toEqual("POST");
  });

  it("makes an authenticated fetch call with a given configuration", async () => {
    // ARRANGE
    let receivedMockHeader = false;
    let receivedMockAuthorization = false;

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockHeaders: CallValidHeaders = {
      "Accept-Language": "en-us"
    };

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";

    server.use(
      rest.post(mockRequestUrl, (req, res, ctx) => {
        receivedMockHeader =
          req.headers.get("Accept-Language") === "en-us" ? true : false;

        receivedMockAuthorization =
          req.headers.get("Authorization") ===
          `Bearer ${mockAuthorization.accessToken}`
            ? true
            : false;

        return res(ctx.json({ foo: "bar" }));
      })
    );

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
    expect(receivedMockHeader).toEqual(true);
    expect(receivedMockAuthorization).toEqual(true);
  });
});
