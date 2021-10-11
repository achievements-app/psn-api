import { rest } from "msw";
import { setupServer } from "msw/node";

import type { AccessTokenResponse } from "@/models";

import { AUTH_BASE_URL } from "./AUTH_BASE_URL";
import { exchangeCodeForAccessToken } from "./exchangeCodeForAccessToken";

const server = setupServer();

describe("Function: exchangeCodeForAccessToken", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(exchangeCodeForAccessToken).toBeDefined();
  });

  it("makes a call to exchange an access code for a set of OAuth tokens", async () => {
    // ARRANGE
    const mockAccessTokenResponse: AccessTokenResponse = {
      accessToken: "mockAccessToken",
      expiresIn: 3000,
      idToken: "mockIdToken",
      refreshToken: "mockRefreshToken",
      refreshTokenExpiresIn: 9999,
      scope: "mockScope",
      tokenType: "bearer"
    };

    server.use(
      rest.post(`${AUTH_BASE_URL}/token`, (req, res, ctx) => {
        return res(
          ctx.json({
            access_token: mockAccessTokenResponse.accessToken,
            expires_in: mockAccessTokenResponse.expiresIn,
            id_token: mockAccessTokenResponse.idToken,
            refresh_token: mockAccessTokenResponse.refreshToken,
            refresh_token_expires_in:
              mockAccessTokenResponse.refreshTokenExpiresIn,
            token_type: mockAccessTokenResponse.tokenType,
            scope: mockAccessTokenResponse.scope
          })
        );
      })
    );

    // ACT
    const tokenResponse = await exchangeCodeForAccessToken("mockAccessCode");

    // ASSERT
    expect(tokenResponse).toEqual(mockAccessTokenResponse);
  });
});
