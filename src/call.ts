import fetch from "isomorphic-unfetch";

export const call = async <T>(
  config: {
    url: string;
    method?: "GET" | "POST";
  },
  authorization: { accessToken: string }
) => {
  const response = await fetch(config.url, {
    method: config?.method ?? "GET",
    headers: { Authorization: `Bearer ${authorization.accessToken}` }
  });

  return (await response.json()) as T;
};
