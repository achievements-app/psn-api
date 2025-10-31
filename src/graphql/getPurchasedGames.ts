import type { AuthorizationPayload, PurchasedGamesResponse } from "../models";
import { Membership } from "../models/membership.model";
import { call } from "../utils/call";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";
import { getPurchasedGameListHash } from "./operationHashes";

type GetPurchasedGamesOptions = {
  isActive: boolean;
  platform: ("ps4" | "ps5")[];
  size: number;
  start: number;
  sortBy: "ACTIVE_DATE";
  sortDirection: "asc" | "desc";
  membership: Membership;
};

/**
 * A call to this function will retrieve purchased games for the user associated
 * with the npsso token provided to this module during initialisation.
 *
 * This endpoint returns only PS4 and PS5 games.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeAccessCodeForAuthTokens()`.
 * @param options Optional parameters to filter and sort purchased games.
 */
export const getPurchasedGames = async (
  authorization: AuthorizationPayload,
  options: Partial<GetPurchasedGamesOptions> = {}
): Promise<PurchasedGamesResponse> => {
  const url = new URL(GRAPHQL_BASE_URL);

  const {
    isActive = true,
    platform = ["ps4", "ps5"],
    size = 24,
    start = 0,
    sortBy = "ACTIVE_DATE",
    sortDirection = "desc",
    ...restOptions
  } = options;

  url.searchParams.set("operationName", "getPurchasedGameList");
  url.searchParams.set(
    "variables",
    JSON.stringify({
      isActive,
      platform,
      size,
      start,
      sortBy,
      sortDirection,
      ...restOptions
    })
  );
  url.searchParams.set(
    "extensions",
    JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: getPurchasedGameListHash
      }
    })
  );

  const response = await call<PurchasedGamesResponse>(
    { url: url.toString() },
    authorization
  );

  // The GraphQL queries can return non-truthy values.
  if (!response.data || !response.data.purchasedTitlesRetrieve) {
    throw new Error(JSON.stringify(response));
  }

  return response;
};
