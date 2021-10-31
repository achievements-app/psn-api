import type {
  AllCallOptions,
  AuthorizationPayload,
  UserTrophiesEarnedForTitleResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetUserTrophiesEarnedForTitleOptions = Pick<
  AllCallOptions,
  "offset" | "npServiceName" | "limit" | "headerOverrides"
>;

/**
 * A call to this function will retrieve the earned status of trophies for a user
 * from either a single - or all - trophy groups in a title. A title can have
 * multiple groups of trophies (a `"default"` group which all titles have, and
 * additional groups starting with a name of `"001"` and incrementing for each
 * additional group). To retrieve trophies from all groups within a title
 * (ie. the full trophy set), then `trophyGroupId` should be set to `"all"`.
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * This function returns the earned status of the
 * trophy only and no additional descriptive metadata (ie. trophy name,
 * trophy description). Use `getTitleTrophies()` to obtain this information.
 *
 * When the title platform is PS3, PS4, or PS Vita, you __must__ specify the
 * `npServiceName` option as `"trophy"`.
 *
 * If you attempt to query a title which the user does not have associated
 * with their account (ie. the title has not been launched and allowed to
 * sync at least once) then a Resource Not Found error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param npCommunicationId Unique ID of the title.
 * @param trophyGroupId `"all"` to return all trophies for the title, otherwise restrict results to a specific trophy group (such as a DLC).
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.limit Limit the number of trophies returned.
 * @param options.offset Return trophy data from this result onwards.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTrophiesEarnedForTitle = async (
  authorization: AuthorizationPayload,
  accountId: string,
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetUserTrophiesEarnedForTitleOptions>
): Promise<UserTrophiesEarnedForTitleResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    options,
    { accountId, npCommunicationId, trophyGroupId }
  );

  const response = await call<UserTrophiesEarnedForTitleResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
