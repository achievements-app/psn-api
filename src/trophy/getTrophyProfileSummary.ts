import urlcat from "urlcat";

import type {
  AuthorizationPayload,
  CallValidHeaders,
  TrophyProfileSummaryResponse
} from "@/models";

import { call } from "../call";
import { baseUrl } from "./baseUrl";

interface GetTrophyProfileSummaryOptions {
  /*
   * Override the headers in the request to the PSN API,
   * such as to change the language.
   */
  headerOverrides: CallValidHeaders;
}

/**
 * A request to this URL will retrieve an overall summary of the number of
 * trophies earned for a user broken down by type, as well as their current
 * overall trophy level, progress towards the next level and which tier their
 * current level falls in to. The tiers are based on the [level changes introduced in 2020](https://andshrew.github.io/PlayStation-Trophies/images/psn-trophy-tiers.png).
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getTrophyProfileSummary = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: Partial<GetTrophyProfileSummaryOptions>
) => {
  const url = buildRequestUrl(accountId);

  return await call<TrophyProfileSummaryResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};

const buildRequestUrl = (accountId: string) => {
  return urlcat(baseUrl, "/v1/users/:accountId/trophySummary", {
    accountId
  });
};
