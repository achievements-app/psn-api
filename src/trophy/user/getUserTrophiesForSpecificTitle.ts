import type {
  AuthorizationPayload,
  CallValidHeaders,
  UserTrophiesBySpecificTitleResponse
} from "../../models";
import { buildRequestUrl } from "../../utils/buildRequestUrl";
import { call } from "../../utils/call";
import { TROPHY_BASE_URL } from "../TROPHY_BASE_URL";

interface GetUserTrophiesForSpecificTitleOptions {
  npTitleIds: string;
  includeNotEarnedTrophyIds?: boolean;
  headerOverrides?: CallValidHeaders;
}

/**
 * A call to this function will retrieve a summary of the trophies earned by
 * a user for specific titles.
 *
 * This function can be used as a way of linking the npCommunicationId of
 * a Trophy Set to a titles npTitleId,but as with the other user based endpoints
 * in this version of the API you will only get a useful response back if the account
 * you are querying against has played the title.
 *
 * If you attempt to query a title ID which does not exist then a Resource not found error will be returned.
 *
 * There is a limit of 5 title IDs which can be included in the npTitleIds query.
 * Trying to include more than 5 will result in a Bad Request (query: npTitleId) error being returned.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param accountId The account whose trophy list is being accessed. Use `"me"` for the authenticating account.
 * @param options.npTitleIds The titleId can be a single title ID, or it can be a comma separated list of title IDs (%2C when used in a URL). Every title has an ID assigned to it with these typically starting "CUSA" for PS4 titles and "PPSA" for PS5 titles.
 * @param options.includeNotEarnedTrophyIds If optional parameter includeNotEarnedTrophyIds is included and set to true then the response will contain a list of IDs for the individual trophies which the user has not earned for each title ID queried. This functionality was added to the endpoint post release, most likely early 2023.
 * @param options.headerOverrides Override the headers in the request to the PSN API, such as to change the language.
 */
export const getUserTrophiesForSpecificTitle = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options: GetUserTrophiesForSpecificTitleOptions
): Promise<UserTrophiesBySpecificTitleResponse> => {
  const { headerOverrides, ...args } = options;
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/titles/trophyTitles",
    {},
    { accountId, ...args }
  );

  return await call<UserTrophiesBySpecificTitleResponse>(
    { url, headers: headerOverrides },
    authorization
  );
};
