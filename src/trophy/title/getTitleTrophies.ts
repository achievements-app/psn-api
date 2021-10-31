import type {
  AllCallOptions,
  AuthorizationPayload,
  TitleTrophiesResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetTitleTrophiesOptions = Pick<
  AllCallOptions,
  "headerOverrides" | "limit" | "npServiceName" | "offset"
>;

/**
 * A call to this function will retrieve the trophy list of a
 * single - or all - trophy groups for a title. A title can have multiple
 * groups of trophies (a `"default"` group which all titles have, and additional
 * groups starting with the name `"001"` and incrementing for each additional group). To retrieve
 * trophies from all groups within a title (ie. the full trophy set), then
 * `trophyGroupId` should be set to `"all"`.
 *
 * When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param npCommunicationId Unique ID of the title.
 * @param trophyGroupId `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC).
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.limit Limit the number of trophies returned.
 * @param options.offset Return trophy data from this result onwards.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getTitleTrophies = async (
  authorization: AuthorizationPayload,
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetTitleTrophiesOptions>
): Promise<TitleTrophiesResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    options,
    { npCommunicationId, trophyGroupId }
  );

  return await call<TitleTrophiesResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};
