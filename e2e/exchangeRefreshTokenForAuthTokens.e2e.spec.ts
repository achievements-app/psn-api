import { exchangeRefreshTokenForAuthTokens } from "../src";
import { createRedisClient } from "./utils/createRedisClient";

describe("E2E Health Check: exchangeRefreshTokenForAuthTokens", () => {
  it("can exchange a refresh token for a new set of auth tokens", async () => {
    // ARRANGE
    // We are storing all the health check auth tokens in Redis.
    const redisClient = await createRedisClient();

    const refreshToken = (await redisClient.get("refreshToken")) as string;

    // ACT
    const newAuthTokens = await exchangeRefreshTokenForAuthTokens(refreshToken);

    // ASSERT
    expect(newAuthTokens.accessToken).toBeDefined();
    expect(newAuthTokens.expiresIn).toBeDefined();
    expect(newAuthTokens.refreshToken).toBeDefined();
    expect(newAuthTokens.refreshTokenExpiresIn).toBeDefined();
  });
});
