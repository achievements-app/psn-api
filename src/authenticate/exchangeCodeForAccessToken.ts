import fetch from "isomorphic-unfetch";
import { query } from "urlcat";

import type { AccessTokenResponse } from "@/models";

export const exchangeCodeForAccessToken = async (
  accessCode: string
): Promise<AccessTokenResponse> => {
  const BASE_URL = "https://ca.account.sony.com/api/authz/v3/oauth/token";

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic YWM4ZDE2MWEtZDk2Ni00NzI4LWIwZWEtZmZlYzIyZjY5ZWRjOkRFaXhFcVhYQ2RYZHdqMHY="
    },
    body: query({
      code: `${accessCode}`,
      redirect_uri: "com.playstation.PlayStationApp://redirect",
      grant_type: "authorization_code",
      token_format: "jwt"
    })
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
