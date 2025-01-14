import { AllCallOptions, AuthorizationPayload } from "../models";
import { UserPlayedGamesResponse } from "../models/user-played-games-response.model";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_GAMES_BASE_URL } from "./USER_BASE_URL";

interface GetUserGamesOptions extends Pick<AllCallOptions, "limit" | "offset"> {
  /**
   * Comma separated list of platforms
   * @example ps4_game,ps5_native_game, pspc_game, unknown
   */
  categories?: string;
}

/**
 * A call to this function will return a list of played games associated with the given accountId.
 * The list is sorted by recently played by default.
 * If the list cannot be found (either due to non-existence or privacy settings), an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The account id to be queried. Use `"me"` for the authenticating account.
 */
export async function getUserPlayedGames(
  authorization: AuthorizationPayload,
  accountId: string,
  options?: GetUserGamesOptions
): Promise<UserPlayedGamesResponse> {
  const url = buildRequestUrl(
    USER_GAMES_BASE_URL,
    "/:accountId/titles",
    options,
    {
      accountId
    }
  );

  const response = await call<UserPlayedGamesResponse>({ url }, authorization);

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
}
