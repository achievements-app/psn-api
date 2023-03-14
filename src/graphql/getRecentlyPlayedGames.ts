import type {
  AllCallOptions,
  AuthorizationPayload,
  RecentlyPlayedGamesResponse
} from "../models";
import { call } from "../utils/call";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";
import { getUserGameListHash } from "./operationHashes";

type GetRecentlyPlayedGamesOptionsCategories = "ps4_game" | "ps5_native_game";
type GetRecentlyPlayedGamesOptions = Pick<AllCallOptions, "limit"> & {
  categories: GetRecentlyPlayedGamesOptionsCategories[];
};

/**
 * A call to this function will retrieve recently played games for the user associated
 * with the npsso token provided to this module during initialisation.
 *
 * This is useful if you want recent activity that isn't tied to trophy progress.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 */
export const getRecentlyPlayedGames = async (
  authorization: AuthorizationPayload,
  options: Partial<GetRecentlyPlayedGamesOptions> = {}
): Promise<RecentlyPlayedGamesResponse> => {
  const { limit = 50, categories = ["ps4_game", "ps5_native_game"] } = options;

  const url = new URL(GRAPHQL_BASE_URL);

  url.searchParams.set("operationName", "getUserGameList");
  url.searchParams.set(
    "variables",
    JSON.stringify({
      limit,
      categories: categories.join(",")
    })
  );
  url.searchParams.set(
    "extensions",
    JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: getUserGameListHash
      }
    })
  );

  const response = await call<RecentlyPlayedGamesResponse>(
    { url: url.toString() },
    authorization
  );

  // The GraphQL queries can return non-truthy values.
  if (!response.data || !response.data.gameLibraryTitlesRetrieve) {
    throw new Error(JSON.stringify(response));
  }

  return response;
};
