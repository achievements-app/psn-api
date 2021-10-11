import urlcat from "urlcat";

import type {
  AuthorizationPayload,
  CallValidHeaders,
  SummarizedTrophiesByTrophyGroupResponse
} from "@/models";

import { call } from "../call";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

interface GetSummarizedTrophiesByTrophyGroupOptions {
  /**
   * Not required unless the platform is PS3, PS4, or PS Vita.
   * If one of these platforms, the value __must__ be `"trophy"`.
   *
   * `"trophy"` for PS3, PS4, or PS Vita platforms.
   * `"trophy2"` for the PS5 platform.
   */
  npServiceName: "trophy" | "trophy2";

  /*
   * Override the headers in the request to the PSN API,
   * such as to change the language.
   */
  headerOverrides: CallValidHeaders;
}

/**
 * A request to this URL will retrieve a summary of the trophies earned for
 * a user broken down by trophy group within a title. A title can have
 * multiple groups of trophies (a `"default"` group which all titles have,
 * and additional groups beginning with the name `"001"` and incrementing for
 * each additional group).
 *
 * The numeric `accountId` can be that of any PSN account for which the
 * authenticating account has permissions to view the trophy list.
 * When querying the titles associated with the authenticating account, the
 * numeric `accountId` can be substituted with `"me"`.
 *
 * This function calls an endpoint that returns the earned status of the
 * trophy only and no additional descriptive metadata (ie. trophy name,
 * trophy description). Use `getTrophiesForTitle()` to obtain this information.
 *
 *  When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` parameter as `"trophy"`.
 *
 * If you attempt to query a title which the user does not have associated
 * with their account (ie. the title has not been launched and allowed to
 * sync at least once) then a Resource Not Found error will be returned.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param npCommunicationId Unique ID of the title.
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getSummarizedTrophiesByTrophyGroup = async (
  authorization: AuthorizationPayload,
  accountId: string,
  npCommunicationId: string,
  options?: Partial<GetSummarizedTrophiesByTrophyGroupOptions>
) => {
  const url = buildRequestUrl(accountId, npCommunicationId, options);

  return await call<SummarizedTrophiesByTrophyGroupResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );
};

const buildRequestUrl = (
  accountId: string,
  npCommunicationId: string,
  options: Partial<GetSummarizedTrophiesByTrophyGroupOptions> = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  return urlcat(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups",
    { accountId, npCommunicationId, ...pickedOptions }
  );
};
