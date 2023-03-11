import { createHash } from "crypto";
import type {
  AllCallOptions,
  AuthorizationPayload,
  UserGameListResponse
} from "../models";
import { call } from "../utils/call";
import { GRAPHQL_BASE_URL } from "./USER_BASE_URL";

/**
 * This endpoint is different to others in the codebase; it hits a graphql API endpoint.
 * 
 * The code in this file is reverse engineered from app-<hash>.js file loaded by the page
 * at https://library.playstation.com/recently-played. Following the code in this file leads
 * to some Apollo GraphQL code related to persisted queries. This means the request needs to
 * contain a SHA256 hash of the GraphQL query being executed. Searching for PersistedQueryLink
 * and createPersistedQueryLink_hashes, and an AST function in the JS source and debugging
 * will surface the query that's passed to the hash function on the page.
 */
const gqlQuery = 'query getUserGameList($categories: String, $limit: Int, $orderBy: String, $subscriptionService: SubscriptionService) {\n  gameLibraryTitlesRetrieve(categories: $categories, limit: $limit, orderBy: $orderBy, subscriptionService: $subscriptionService) {\n    __typename\n    games {\n      __typename\n      conceptId\n      entitlementId\n      image {\n        __typename\n        url\n      }\n      isActive\n      lastPlayedDateTime\n      name\n      platform\n      productId\n      subscriptionService\n      titleId\n    }\n  }\n}\n'

type GetUserGameListOptionsCategories = 'ps4_game'|'ps5_native_game'
type GetUserGameListOptions = Pick<AllCallOptions, 'limit'>&{ categories: GetUserGameListOptionsCategories[] };

/**
 * A call to this function will retrieve recently played games for the user associated
 * with the npsso token provided to this module during initialisation.
 * 
 * This is useful if you want recent activity that isn't tied to trophy progress.
 * 
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 */
export const getUserGameList = async (
  authorization: AuthorizationPayload,
  options: Partial<GetUserGameListOptions> = {}
): Promise<UserGameListResponse> => {
  const { limit = 50, categories = ['ps4_game','ps5_native_game'] } = options

  const url = new URL(GRAPHQL_BASE_URL)

  url.searchParams.set('operationName', 'getUserGameList')
  url.searchParams.set('variables', JSON.stringify({
    limit,
    categories: categories.join(',')
  }))
  url.searchParams.set('extensions', JSON.stringify({
    persistedQuery: {
      version: 1,
      sha256Hash: createHash('sha256').update(gqlQuery).digest('hex')
    }
  }))
  
  const response = await call<UserGameListResponse>(
    { url: url.toString() },
    authorization
  );

  // The graphql endpoints can return non
  if (!response.data || !response.data.gameLibraryTitlesRetrieve) {
    throw new Error(JSON.stringify(response));
  }

  return response;
};