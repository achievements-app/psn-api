# exchangeNpssoForCode

This function lets you exchange your NPSSO token for an access code. If you do not have an NPSSO, see the guide on [authenticating manually](../../authentication/authenticating-manually).

## Example

```ts
import { exchangeNpssoForCode } from "psn-api";

const accessCode = await exchangeNpssoForCode("<my 64-digit NPSSO>");

console.log(accessCode); // --> "v3.ABCDEF"
```

## Parameters

| Name         | Type     | Description       |
| :----------- | :------- | :---------------- |
| `npssoToken` | `string` | Your NPSSO token. |

## Returns

`Promise<string>`

An access code, which can be exchanged for access and refresh tokens with [exchangeCodeForAccessToken()](./exchangeCodeForAccessToken.md).

## Source

[authenticate/exchangeNpssoForCode.ts](https://github.com/wescopeland/psn-api/blob/main/src/authenticate/exchangeNpssoForCode.ts)
