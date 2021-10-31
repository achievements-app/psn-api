import type {
  AllCallOptions,
  AuthorizationPayload,
  TitleTrophyGroupsResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetTitleTrophyGroupsOptions = Pick<
  AllCallOptions,
  "npServiceName" | "headerOverrides"
>;

/**
 * A title may have multiple groups of trophies. This is most commonly
 * seen in games which have DLC expansions where additional trophies are added.
 *
 * You can call this function for a specific title - using the
 * unique `npCommunicationId` for the title - and you will receive a
 * summary of all of the trophy groups associated with the title.
 * This also includes a summary of the number of trophies for the
 * title, broken down by group and grade (gold, silver, etc.).
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param npCommunicationId The unique ID of the game title you wish to retrieve the trophy groups list for.
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getTitleTrophyGroups = async (
  authorization: AuthorizationPayload,
  npCommunicationId: string,
  options?: Partial<GetTitleTrophyGroupsOptions>
): Promise<TitleTrophyGroupsResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups",
    options,
    { npCommunicationId }
  );

  return await call<TitleTrophyGroupsResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};
