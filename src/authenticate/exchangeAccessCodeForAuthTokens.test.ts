import nock from "nock";

import type { AuthTokensResponse } from "../models";
import { AUTH_BASE_URL } from "./AUTH_BASE_URL";
import { exchangeAccessCodeForAuthTokens } from "./exchangeAccessCodeForAuthTokens";

describe("Function: exchangeAccessCodeForAuthTokens", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(exchangeAccessCodeForAuthTokens).toBeDefined();
  });

  it("makes a call to exchange an access code for a set of OAuth tokens", async () => {
    // ARRANGE
    const mockAuthTokensResponse: AuthTokensResponse = {
      accessToken: "mockAccessToken",
      expiresIn: 3000,
      idToken: "mockIdToken",
      refreshToken: "mockRefreshToken",
      refreshTokenExpiresIn: 9999,
      scope: "mockScope",
      tokenType: "bearer"
    };

    nock(AUTH_BASE_URL).post("/token").reply(200, {
      access_token: mockAuthTokensResponse.accessToken,
      expires_in: mockAuthTokensResponse.expiresIn,
      id_token: mockAuthTokensResponse.idToken,
      refresh_token: mockAuthTokensResponse.refreshToken,
      refresh_token_expires_in: mockAuthTokensResponse.refreshTokenExpiresIn,
      token_type: mockAuthTokensResponse.tokenType,
      scope: mockAuthTokensResponse.scope
    });

    // ACT
    const tokenResponse = await exchangeAccessCodeForAuthTokens(
      "mockAccessCode"
    );

    // ASSERT
    expect(tokenResponse).toEqual(mockAuthTokensResponse);
  });
});
