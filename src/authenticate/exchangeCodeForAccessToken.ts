import fetch from "isomorphic-unfetch";

import type { AuthTokensResponse } from "../models";
import { AUTH_BASE_URL } from "./AUTH_BASE_URL";

/**
 * @param accessCode Your access code, typically retrieved by using `exchangeNpssoForCode()`.
 * @returns An object containing an access token, refresh token, and expiry times for both.
 */
export const exchangeCodeForAccessToken = async (
  accessCode: string
): Promise<AuthTokensResponse> => {
  const requestUrl = `${AUTH_BASE_URL}/token`;

  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A="
    },
    body: new URLSearchParams({
      code: accessCode,
      redirect_uri: "com.scee.psxandroid.scecompcall://redirect",
      grant_type: "authorization_code",
      token_format: "jwt"
    }).toString()
  });

  const raw = await res.json();

  return {
    accessToken: raw.access_token,
    expiresIn: raw.expires_in,
    idToken: raw.id_token,
    refreshToken: raw.refresh_token,
    refreshTokenExpiresIn: raw.refresh_token_expires_in,
    scope: raw.scope,
    tokenType: raw.token_type
  };
};
