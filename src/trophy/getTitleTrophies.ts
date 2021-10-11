import fetch from "isomorphic-unfetch";
import urlcat from "urlcat";

import type { TitlePlatform, TitleTrophiesResponse } from "@/models";

const buildRequestUrl = (
  npCommunicationId: string,
  trophyGroupId: string,
  isLegacy: boolean
) => {
  const BASE_URL = "https://m.np.playstation.net/api";

  return urlcat(
    BASE_URL,
    "/trophy/v1/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    {
      npCommunicationId,
      trophyGroupId,
      ...(isLegacy && { npServiceName: "trophy" })
    }
  );
};

export const getTitleTrophies = async (
  npCommunicationId: string,
  trophyGroupId: string,
  authorization: {
    accessToken: string;
  },
  options?: Partial<{
    platform: TitlePlatform;
  }>
) => {
  const requestUrl = buildRequestUrl(
    npCommunicationId,
    trophyGroupId,
    options?.platform !== "PS5"
  );

  const response = await fetch(requestUrl, {
    headers: { Authorization: `Bearer ${authorization.accessToken}` }
  });

  return (await response.json()) as TitleTrophiesResponse;
};
