import fetch from "isomorphic-unfetch";

import type { AuthorizationPayload, CallValidHeaders } from "../models";

export const call = async <T>(
  config: {
    url: string;
    method?: "GET" | "POST";
    headers?: CallValidHeaders;
  },
  authorization: AuthorizationPayload,
  bodyPayload?: Record<string, any>
) => {
  const response = await fetch(config.url, {
    method: config?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${authorization.accessToken}`,
      "Content-Type": "application/json",
      ...config?.headers
    },
    body: JSON.stringify(bodyPayload)
  });

  return (await response.json()) as T;
};
