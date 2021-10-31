---
sidebar_label: Authentication
sidebar_position: 1
---

# Authentication API

## exchangeCodeForAccessToken

This function lets you exchange your access code for access and refresh tokens. If you do not have an access code, see the guide on [authenticating manually](/authentication/authenticating-manually).

### Example

```ts
import { exchangeCodeForAccessToken } from "psn-api";

const authorization = await exchangeCodeForAccessToken(accessCode);
```

### Parameters

| Name         | Type     | Description       |
| :----------- | :------- | :---------------- |
| `accessCode` | `string` | Your access code. |

### Returns

An `AuthTokenResponse` object, containing the following properties:

| Name                    | Type     | Description                                                                                                                                                   |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessToken`           | `string` | Used to retrieve data from the PSN API.                                                                                                                       |
| `expiresIn`             | `number` | When the access token will expire.                                                                                                                            |
| `idToken`               | `string` |                                                                                                                                                               |
| `refreshToken`          | `string` | Used to retrieve a new access token after it expires with [`exchangeRefreshTokenForAuthTokens()`](/api-docs/authentication#exchangerefreshtokenforauthtokens) |
| `refreshTokenExpiresIn` | `number` | When the refresh token will expire.                                                                                                                           |
| `scope`                 | `string` |                                                                                                                                                               |
| `tokenType`             | `string` |                                                                                                                                                               |

### Source

[authenticate/exchangeCodeForAccessToken.ts](https://github.com/achievements-app/psn-api/blob/main/src/authenticate/exchangeCodeForAccessToken.ts)

---

## exchangeNpssoForCode

This function lets you exchange your NPSSO token for an access code. If you do not have an NPSSO, see the guide on [authenticating manually](/authentication/authenticating-manually).

### Example

```ts
import { exchangeNpssoForCode } from "psn-api";

const accessCode = await exchangeNpssoForCode("<my 64-digit NPSSO>");

console.log(accessCode); // --> "v3.ABCDEF"
```

### Parameters

| Name         | Type     | Description       |
| :----------- | :------- | :---------------- |
| `npssoToken` | `string` | Your NPSSO token. |

### Returns

`Promise<string>`

An access code, which can be exchanged for access and refresh tokens with [exchangeCodeForAccessToken()](/api-docs/authentication#exchangecodeforaccesstoken).

### Source

[authenticate/exchangeNpssoForCode.ts](https://github.com/wescopeland/psn-api/blob/main/src/authenticate/exchangeNpssoForCode.ts)

## exchangeRefreshTokenForAuthTokens

This function lets you exchange your refresh token retrieved from your initial log in for a set of new access and refresh tokens. By using this function, you no longer need to constantly retrieve a new NPSSO.

### Example

```ts
import { exchangeRefreshTokenForAuthTokens } from "psn-api";

// Let's assume at some point in history
// we've done the below initial log in.
const accessCode = await exchangeNpssoForCode(npsso);
const authorization = await exchangeCodeForAccessToken(accessCode);

// Now, let's pretend `authorization.accessToken` has expired.
// Rather than using the above process (via NPSSO) to get a new one,
// we'll use our refresh token to get a new one:
const newAuthTokens = await exchangeRefreshTokenForAuthTokens(
  authorization.refreshToken
);
```

### Parameters

| Name           | Type     | Description                                           |
| :------------- | :------- | :---------------------------------------------------- |
| `refreshToken` | `string` | A previously retrieved and non-expired refresh token. |

### Returns

An `AuthTokenResponse` object, containing the following properties:

| Name                    | Type     | Description                                           |
| :---------------------- | :------- | :---------------------------------------------------- |
| `accessToken`           | `string` | Used to retrieve data from the PSN API.               |
| `expiresIn`             | `number` | When the access token will expire.                    |
| `idToken`               | `string` |                                                       |
| `refreshToken`          | `string` | Used to retrieve a new access token after it expires. |
| `refreshTokenExpiresIn` | `number` | When the refresh token will expire.                   |
| `scope`                 | `string` |                                                       |
| `tokenType`             | `string` |                                                       |

### Source

[authenticate/exchangeRefreshTokenForAuthTokens.ts](https://github.com/achievements-app/psn-api/blob/main/src/authenticate/exchangeRefreshTokenForAuthTokens.ts)
