import nock from "nock";

import { AUTH_BASE_URL } from "./AUTH_BASE_URL";
import { exchangeNpssoForAccessCode } from "./exchangeNpssoForAccessCode";

describe("Function: exchangeNpssoForAccessCode", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(exchangeNpssoForAccessCode).toBeDefined();
  });

  it("can make a call to exchange an NPSSO token for an access code", async () => {
    // ARRANGE
    const mockCode = "v3.ABCDEF";
    const mockLocationHeaderResponse = `com.playstation.PlayStationApp://redirect/?code=${mockCode}&cid=36e3823a-8049-4c36-9021-b154315ae2ad`;

    nock(AUTH_BASE_URL)
      .get(/\/authorize/) // This will match any path containing "/authorize".
      .reply(302, "", {
        Location: mockLocationHeaderResponse
      });

    // ACT
    const code = await exchangeNpssoForAccessCode("mockNpsso");

    // ASSERT
    expect(code).toEqual(mockCode);
  });

  it("throws an error if the response has no location header", async () => {
    // ARRANGE
    nock(AUTH_BASE_URL)
      .get(/\/authorize/)
      .reply(302, "");

    // ASSERT
    await expect(exchangeNpssoForAccessCode("mockNpsso")).rejects.toThrow(
      "There was a problem retrieving your PSN access code"
    );
  });

  it("throws an error if the location header does not contain a code", async () => {
    // ARRANGE
    nock(AUTH_BASE_URL)
      .get(/\/authorize/)
      .reply(302, "", {
        Location: "com.playstation.PlayStationApp://redirect/?error=some_error"
      });

    // ASSERT
    await expect(exchangeNpssoForAccessCode("mockNpsso")).rejects.toThrow(
      "There was a problem retrieving your PSN access code"
    );
  });
});
