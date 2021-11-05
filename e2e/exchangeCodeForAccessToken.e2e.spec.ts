import { exchangeCodeForAccessToken, exchangeNpssoForCode } from "../src";

describe("E2E Health Check: exchangeCodeForAccessToken", () => {
  it("can exchange an access code for auth tokens", async () => {
    // ARRANGE
    const accessCode = await exchangeNpssoForCode(process.env.NPSSO ?? "");

    // ACT
    const response = await exchangeCodeForAccessToken(accessCode);

    // ASSERT
    expect(response.accessToken).toBeDefined();
    expect(response.refreshToken).toBeDefined();

    expect(response.expiresIn).toBeDefined();
    expect(response.refreshTokenExpiresIn).toBeDefined();

    expect(response.scope).toEqual("psn:mobile.v1 psn:clientapp");
  });
});
