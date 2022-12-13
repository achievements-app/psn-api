import fetch from "isomorphic-unfetch";

import { AUTH_BASE_URL } from "./AUTH_BASE_URL";

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
): Promise<string> => {
  const queryString = new URLSearchParams({
    access_type: "offline",
    client_id: "09515159-7237-4370-9b40-3806e67c0891",
    redirect_uri: "com.scee.psxandroid.scecompcall://redirect",
    response_type: "code",
    scope: "psn:mobile.v2.core psn:clientapp"
  }).toString();

  const requestUrl = `${AUTH_BASE_URL}/authorize?${queryString}`;

  // This never returns a 200. As of Oct 10 2021, it seems to return a 302.
  const { headers: responseHeaders } = await fetch(requestUrl, {
    headers: {
      Cookie: `npsso=${npssoToken}`
    },
    redirect: "manual"
  });

  // The access code itself is stored in a header on the response.
  // We'll perform a few validations to ensure it's actually there.
  if (
    !responseHeaders.has("location") ||
    !responseHeaders.get("location")?.includes("?code=")
  ) {
    throw new Error(`
      There was a problem retrieving your PSN access code. Is your NPSSO code valid?
      To get a new NPSSO code, visit https://ca.account.sony.com/api/v1/ssocookie.
    `);
  }

  const redirectLocation = responseHeaders.get("location") as string;
  const redirectParams = new URLSearchParams(
    redirectLocation.split("redirect/")[1]
  );

  return redirectParams.get("code") as string;
};
