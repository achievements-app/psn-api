import type {
  AllCallOptions,
  AuthorizationPayload,
  UserTrophyProfileSummaryResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

type GetUserTrophyProfileSummaryOptions = Pick<
  AllCallOptions,
  "headerOverrides"
>;

/**
 * A call to this function will retrieve an overall summary of the number of
 * trophies earned for a user broken down by grade, as well as their current
 * overall trophy level, progress towards the next level, and which tier their
 * current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTrophyProfileSummary = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetUserTrophyProfileSummaryOptions>
): Promise<UserTrophyProfileSummaryResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/trophySummary",
    options,
    { accountId }
  );

  return await call<UserTrophyProfileSummaryResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};
