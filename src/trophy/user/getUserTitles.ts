import type {
  AllCallOptions,
  AuthorizationPayload,
  UserTitlesResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetUserTitlesOptions = Pick<
  AllCallOptions,
  "headerOverrides" | "limit" | "offset"
>;

/**
 * A call to this function will retrieve a summarized list of titles played
 * by a user, ordered by recent trophy unlocks. The maximum amount that can
 * be returned by a single call is 800 (assuming a `limit` option of 800 is set).
 * If the user has more titles than the given `limit` option, subsequent calls
 * of this funciton must be made to fetch the complete list by paging via the
 * `offset` option.
 *
 * The numeric `accountId` can be that of any PSN account for which the authenticating
 * account has permissions to view the trophy list. When querying the titles
 * associated with the authenticating account, the numeric `accountId` can be
 * substituted with `"me"`.
 *
 * To fetch more detailed account progress for a title, the `getUserTrophiesEarnedForTitle()`
 * function can be used.
 *
 * To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * Included in the information returned is the titles' unique `npCommunicationId`.
 * This is required to make use of subsequent functions for requesting more specific
 * detail about a title's trophies.
 *
 * The results are presented in order of the `lastUpdatedDateTime` for the title,
 * so the first result will be the title for which a trophy was most recently earned
 * (or synced for the first time in the case of a game with 0% progress).
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.limit Limit the number of titles returned.
 * @param options.offset Return title data from this result onwards.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTitles = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserTitlesOptions>
): Promise<UserTitlesResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/trophyTitles",
    options,
    { accountId }
  );

  return await call<UserTitlesResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};
