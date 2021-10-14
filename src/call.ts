import fetch from "isomorphic-unfetch";

import type { AuthorizationPayload, CallValidHeaders } from "./models";

export const call = async <T>(
  config: {
    url: string;
    method?: "GET" | "POST";
    headers?: CallValidHeaders;
  },
  authorization: AuthorizationPayload
) => {
  const response = await fetch(config.url, {
    method: config?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${authorization.accessToken}`,
      ...config?.headers
    }
  });

  return (await response.json()) as T;
};
