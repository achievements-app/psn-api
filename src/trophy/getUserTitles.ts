import fetch from "isomorphic-unfetch";

import type { UserTitlesResponse } from "@/models";

export const getUserTitles = async (
  accountId: string,
  authorization: {
    accessToken: string;
  }
) => {
  const requestUrl = `https://m.np.playstation.net/api/trophy/v1/users/${accountId}/trophyTitles?limit=237`;

  const response = await fetch(requestUrl, {
    headers: { Authorization: `Bearer ${authorization.accessToken}` }
  });

  return (await response.json()) as UserTitlesResponse;
};
