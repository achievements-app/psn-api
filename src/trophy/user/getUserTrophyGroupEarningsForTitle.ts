import type {
  AuthorizationPayload,
  CallValidHeaders,
  UserTrophyGroupEarningsForTitleResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

interface GetUserTrophyGroupEarningsForTitleOptions {
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
 * A request to this endpoint function will retrieve a summary of the trophies earned for
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
 * To find a user's `accountId`, the `makeUniversalSearch()` function can be used.
 *
 * This function calls an endpoint that returns the earned status of the
 * trophy only and no additional descriptive metadata (ie. trophy name,
 * trophy description). Use `getTitleTrophies()` to obtain this information.
 *
 *  When the title platform is PS3, PS4 or PS Vita you __must__ specify the
 * `npServiceName` option as `"trophy"`.
 *
 * If you attempt to query a title which the user does not have associated
 * with their account (ie. the title has not been launched and allowed to
 * sync at least once) then a Resource Not Found error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param npCommunicationId Unique ID of the title.
 * @param options.npServiceName `"trophy"` for PS3, PS4, or PS Vita platforms. `"trophy2"` for the PS5 platform.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTrophyGroupEarningsForTitle = async (
  authorization: AuthorizationPayload,
  accountId: string,
  npCommunicationId: string,
  options?: Partial<GetUserTrophyGroupEarningsForTitleOptions>
): Promise<UserTrophyGroupEarningsForTitleResponse> => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups",
    options,
    { accountId, npCommunicationId }
  );

  const response = await call<UserTrophyGroupEarningsForTitleResponse>(
    { url, headers: options?.headerOverrides },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
