import type { AuthorizationPayload, CallValidHeaders } from "../models";

export const call = async <T>(
  config: {
    url: string;
    method?: "GET" | "POST";
    headers?: CallValidHeaders;
  },
  authorization?: AuthorizationPayload,
  bodyPayload?: Record<string, any>
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...config.headers
  };

  if (authorization?.accessToken) {
    headers.Authorization = `Bearer ${authorization.accessToken}`;
  }

  const response = await fetch(config.url, {
    method: config?.method ?? "GET",
    headers,
    body: JSON.stringify(bodyPayload)
  });

  return (await response.json()) as T;
};
