# exchangeCodeForAccessToken

```ts
/**
 * @param accessCode Your access code, typically retrieved by using `exchangeNpssoForCode()`.
 * @returns An object containing an access token, refresh token, and expiry times for both.
 */
export const exchangeCodeForAccessToken = async (
  accessCode: string
): Promise<AccessTokenResponse> => { ... }
```

```ts
interface AccessTokenResponse {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope: string;
  tokenType: string;
}
```

```ts
// Usage example
const authorization = await exchangeCodeForAccessToken(accessCode);
```
