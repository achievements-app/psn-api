import urlcat from "urlcat";

import type {
  AuthorizationPayload,
  CallValidHeaders,
  TrophiesEarnedForTitleResponse
} from "@/models";

import { call } from "../call";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

interface GetTrophiesEarnedForTitleOptions {
  /**
   * Not required unless the platform is PS3, PS4, or PS Vita.
   * If one of these platforms, the value __must__ be `"trophy"`.
   *
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: "trophy" | "trophy2";

  /** Limit the number of trophies returned. */
  limit: number;

  /** Return trophy data from this result onwards. */
  offset: number;

  /*
   * Override the headers in the request to the PSN API,
   * such as to change the language.
   */
  headerOverrides: CallValidHeaders;
}

/**
 * A request to this URL will retrieve the earned status of trophies for a user
 * from either a single - or all - trophy groups in a title. A title can have
 * multiple groups of trophies (a `"default"` group which all titles have, and
 * additional groups starting with a name of `"001"` and incrementing for each
 * additional group). To retrieve trophies from all groups within a title
 * (ie. the full trophy set) then `trophyGroupId` should be set to `"all"`.
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * This function calls an endpoint that returns the earned status of the
 * trophy only and no additional descriptive metadata (ie. trophy name,
 * trophy description). Use `getTrophiesForTitle()` to obtain this information.
 *
 * When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * If you attempt to query a title which the user does not have associated
 * with their account (ie. the title has not been launched and allowed to
 * sync at least once) then a Resource Not Found error will be returned.
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
export const getTrophiesEarnedForTitle = async (
  authorization: AuthorizationPayload,
  accountId: string,
  npCommunicationId: string,
  trophyGroupId: string,
  options?: Partial<GetTrophiesEarnedForTitleOptions>
) => {
  const url = buildRequestUrl(
    accountId,
    npCommunicationId,
    trophyGroupId,
    options
  );

  return await call<TrophiesEarnedForTitleResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};

const buildRequestUrl = (
  accountId: string,
  npCommunicationId: string,
  trophyGroupId: string,
  options: Partial<GetTrophiesEarnedForTitleOptions> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  return urlcat(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    {
      accountId,
      npCommunicationId,
      trophyGroupId,
      ...pickedOptions
    }
  );
};
