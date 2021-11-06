import type { AuthTokensResponse } from "../../src";
import { exchangeRefreshTokenForAuthTokens } from "../../src";
import { createRedisClient } from "./createRedisClient";

const sendAuthTokensToRedis = async ({
  accessToken,
  expiresIn,
  refreshToken,
  refreshTokenExpiresIn
}: AuthTokensResponse) => {
  const client = await createRedisClient();

  const now = new Date();

  await client.set("accessToken", accessToken);
  await client.set(
    "expiresIn",
    new Date(now.getTime() + expiresIn * 1000).toISOString()
  );
  await client.set("refreshToken", refreshToken);
  await client.set(
    "refreshTokenExpiresIn",
    new Date(now.getTime() + refreshTokenExpiresIn * 1000).toISOString()
  );
};

export const getWorkingAccessToken = async () => {
  // We are storing all the health check auth tokens in Redis.
  const redisClient = await createRedisClient();

  let accessToken = "";

  // First, check if our currently stored access token is expired.
  // If it's expired, we'll need to use our refresh token to get a new one.
  const now = new Date();
  const expiry = (await redisClient.get("expiresIn")) as string;

  const isAccessTokenExpired = new Date(expiry).getTime() < now.getTime();

  if (isAccessTokenExpired) {
    // If we've entered this block, it means our current access token is
    // expired. This happens fairly often, so it'll be normal to enter
    // this block at least once during a nightly health check run.

    // We'll use the refresh token we've stored in redis to get a new
    // access token. Afterwards, we'll push all our new auth values back up to redis.

    const refreshToken = (await redisClient.get("refreshToken")) as string;
    // TODO: is refresh token expired?

    const newAuthTokens = await exchangeRefreshTokenForAuthTokens(refreshToken);
    accessToken = newAuthTokens.accessToken;

    // Store the new auth tokens/expiries so it's all available during the next run.
    await sendAuthTokensToRedis(newAuthTokens);
  } else {
    // If we've entered this block, our current access token is still valid.
    accessToken = (await redisClient.get("accessToken")) as string;
  }

  await redisClient.disconnect();

  return { accessToken };
};
