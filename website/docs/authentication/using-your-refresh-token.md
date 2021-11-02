# Using Your Refresh Token

Once you've achieved [the first log in](/authentication/authenticating-manually), you will have an access token and a refresh token, as well as some metadata about when these two tokens will expire.

For security reasons, access tokens are short-lived and expire relatively quickly. The refresh token is used to "refresh" the access token once it expires. This lets you get new access tokens without requiring you to log in to the PlayStation website and get your NPSSO all over again.

## The refresh token usage flow

1. Before using a psn-api function, you check `expiresIn` (returned from [`exchangeCodeForAccessToken()`](/api-docs/authentication#exchangecodeforaccesstoken)) to see if your current `accessToken` is expired.

2. If it's expired, you use [`exchangeRefreshTokenForAuthTokens()`](/api-docs/authentication#exchangerefreshtokenforauthtokens) to get a new access token.

3. You call the psn-api function with your new access token.

:::caution
psn-api is unopinionated about how you store access and refresh tokens &mdash; _that is left entirely up to you._ Be mindful that these values should be considered secrets, much like passwords. If you're writing a bot, it's probably good enough just to put them directly into a key-value store like Redis. If you're collecting numerous tokens from many users and putting them into a database, it is **strongly** encouraged that you encrypt them with a secure hashing algorithm such as [argon2id](https://www.npmjs.com/package/argon2).
:::

## Refresh your access token

```ts
// We're going to be working with the authorization object
// returned from this function we used when we first authenticated.
const authorization = await exchangeCodeForAccessToken(accessCode);

// We'll take the `expiresIn` value and convert it to an
// ISO date string (eg- "2021-11-02T01:02:03.246Z").
// This conversion makes the expiration date easy to store
// and easy to compare to the current date when used later.
const now = new Date();
const expirationDate = new Date(
  now.getTime() + authorization.expiresIn * 1000
).toISOString();

// ... some time later ...

// Since `expirationDate` is already an ISO date string,
// doing a comparison to see if it's expired is a one-liner.
const isAccessTokenExpired = new Date(expirationDate).getTime() < now.getTime();

if (isAccessTokenExpired) {
  // We'll use our refresh token to get a new access token.
  // Assuming success, this function returns an auth object
  // with the same shape as the response from `exchangeCodeForAccessToken()`.
  const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
    authorization.refreshToken
  );

  // Like above, we can now convert `updatedAuthorization.expiresIn` to
  // an ISO date string to be ready for a future `isAccessTokenExpired` comparison.
}
```
