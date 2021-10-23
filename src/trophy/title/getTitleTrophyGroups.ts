import { buildRequestUrl } from "../../buildRequestUrl";
import { call } from "../../call";
import type {
  AllCallOptions,
  AuthorizationPayload,
  TitleTrophyGroupsResponse
} from "../../models";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetTitleTrophyGroupsOptions = Pick<
  AllCallOptions,
  "npServiceName" | "headerOverrides"
>;

/**
 * A title may have additional groups of trophies. This is most commonly
 * seen in games which have expansions where additional trophies are added.
 *
 * You can make a request to this URL for a specific title - using the
 * unique `npCommunicationId` for the title - and in response will receive a
 * summary of all of the trophy groups associated with the title.
 * This also includes a summary of the number of trophies for the
 * title broken down by group and type (gold, silver etc.).
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param npCommunicationId Unique ID of the title.
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
