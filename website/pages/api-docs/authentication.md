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

An `AccessTokenResponse` object, containing the following properties:

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

An access code, which can be exchanged for access and refresh tokens with [exchangeCodeForAccessToken()](/api-docs/authentication#exchangeCodeForAccessToken).

### Source

[authenticate/exchangeNpssoForCode.ts](https://github.com/wescopeland/psn-api/blob/main/src/authenticate/exchangeNpssoForCode.ts)
