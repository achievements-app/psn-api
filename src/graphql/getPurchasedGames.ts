import { AuthorizationPayload } from "../models";
import { GetPurchasedGamesResponse } from "../models/purchased-games-response.model";
import { call } from "../utils/call";
import { GRAPHQL_BASE_URL } from "./GRAPHQL_BASE_URL";

export type GetPurchasedGamesOptions = {
  platform?: Array<"ps4" | "ps5">;
  size?: number;
  start?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  isActive?: boolean;
  subscriptionService?: string;
};

const defaultOptions: GetPurchasedGamesOptions = {
  platform: ["ps4", "ps5"],
  size: 500,
  start: 0,
  sortBy: "ACTIVE_DATE",
  sortDirection: "desc",
  isActive: true,
  subscriptionService: "NONE"
};

/**
 * A call to this function will retrieve the list of games for the logged in user.
 * If the user cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param options.platform An array containing the platforms to filter by. Defaults to `["ps4", "ps5"]`.
 * @param options.size The number of results to return. Defaults to `500`.
 * @param options.start The offset to start from. Defaults to `0`.
 * @param options.sortBy The field to sort by. Defaults to `"ACTIVE_DATE"`.
 * @param options.sortDirection The direction to sort by. Defaults to `"desc"`.
 * @param options.isActive Whether to return active games only. Defaults to `true`.
 * @param options.subscriptionService The subscription service to filter by. Defaults to `"NONE"`.
 */
export const getPurchasedGames = async (
  authorization: AuthorizationPayload,
  options: Partial<GetPurchasedGamesOptions> = defaultOptions
): Promise<any> => {
  const operationName = "getPurchasedGameList";
  const variables = encodeURIComponent(JSON.stringify(options));
  const extensions = encodeURIComponent(
    '{"persistedQuery":{"version":1,"sha256Hash":"2c045408b0a4d0264bb5a3edfed4efd49fb4749cf8d216be9043768adff905e2"}}'
  );
  const url = `${GRAPHQL_BASE_URL}?operationName=${operationName}&variables=${variables}&extensions=${extensions}`;

  const response = await call<GetPurchasedGamesResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  // The GraphQL queries can return non-truthy values.
  if (!response.data || !response.data.purchasedTitlesRetrieve) {
    throw new Error(JSON.stringify(response));
  }

  return response;

  return response;
};
