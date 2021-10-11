import fetch from "isomorphic-unfetch";
import urlcat from "urlcat";

import type {
  TitlePlatform,
  UserEarnedTrophiesForTitleResponse
} from "@/models";

const buildRequestUrl = (
  accountId: string,
  npCommunicationId: string,
  trophyGroupId: string,
  isLegacy: boolean
) => {
  const BASE_URL = "https://m.np.playstation.net/api";

  return urlcat(
    BASE_URL,
    "/trophy/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    {
      accountId,
      npCommunicationId,
      trophyGroupId,
      ...(isLegacy && { npServiceName: "trophy" })
    }
  );
};

export const getUserEarnedTrophiesForTitle = async (
  accountId: string,
  npCommunicationId: string,
  trophyGroupId: string,
  authorization: {
    accessToken: string;
  },
  options?: Partial<{ platform: TitlePlatform }>
) => {
  const requestUrl = buildRequestUrl(
    accountId,
    npCommunicationId,
    trophyGroupId,
    options?.platform !== "PS5"
  );

  const response = await fetch(requestUrl, {
    headers: { Authorization: `Bearer ${authorization.accessToken}` }
  });

  return (await response.json()) as UserEarnedTrophiesForTitleResponse;
};
