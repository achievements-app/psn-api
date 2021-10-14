import { rest } from "msw";
import { setupServer } from "msw/node";

import { AUTH_BASE_URL } from "./AUTH_BASE_URL";
import { exchangeNpssoForCode } from "./exchangeNpssoForCode";

const server = setupServer();

describe("Function: exchangeNpssoForCode", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(exchangeNpssoForCode).toBeDefined();
  });

  it("can make a call to exchange an NPSSO token for an access code", async () => {
    // ARRANGE
    const mockCode = "v3.ABCDEF";
    const mockLocationHeaderResponse = `com.playstation.PlayStationApp://redirect/?code=${mockCode}&cid=36e3823a-8049-4c36-9021-b154315ae2ad`;

    server.use(
      rest.get(`${AUTH_BASE_URL}/authorize`, (_, res, ctx) => {
        return res(
          ctx.status(302),
          ctx.set("Location", mockLocationHeaderResponse)
        );
      })
    );

    // ACT
    const code = await exchangeNpssoForCode("mockNpsso");

    // ASSERT
    expect(code).toEqual(mockCode);
  });

  it("throws an error if we receive an unexpected response", async () => {
    // ARRANGE
    server.use(
      rest.get(`${AUTH_BASE_URL}/authorize`, (_, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    // ASSERT
    await expect(exchangeNpssoForCode("mockNpsso")).rejects.toThrow();
  });
});
