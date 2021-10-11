# exchangeNpssoForCode

````ts
/**
 *
 * @param npssoToken Your NPSSO token, retrieved from https://ca.account.sony.com/api/v1/ssocookie
 * @returns An access code, which can be exchanged for an access token using `exchangeCodeForAccessToken`.
 * @example
 * ```ts
 * const code = await exchangeNpssoForCode("myNpssoToken");
 *
 * console.log(code) // --> "v3.XXXXXX"
 * ```
 */
export const exchangeNpssoForCode = async (
  npssoToken: string
): Promise<string> => { ... }
````

```ts
// Usage example
const myNpsso = "Hwl9Vq...";
const accessCode = await exchangeNpssoForCode(npsso); // --> "v3.ABCDEF"
```
