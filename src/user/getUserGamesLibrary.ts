// import { AuthorizationPayload, ProfileFromUserNameResponse } from "../models";

import { AuthorizationPayload } from "../models";
import { GamesLibraryForUserResponse } from "../models/games-library-for-user.model";
import { call } from "../utils/call";

/**
 * A call to this function will retrieve the list of games for the logged in user.
 * If the user cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * TODO: Add filter options as parameters
 * TODO: You can filter by PS+ games only or all purchases, sort direction asc (first to last purchase) or desc
 * TODO: (last to first purchase), offset and limit the request just as with basically any other endpoint.
 */
export const getUserGamesLibrary = async (
  authorization: AuthorizationPayload
): Promise<any> => {
  // TODO: pass the filter options to the URL
  // TODO: Fix this URL to be more dynamic
  const url = `https://web.np.playstation.com/api/graphql/v1/op?operationName=getPurchasedGameList&variables=%7B%22isActive%22%3Atrue%2C%22platform%22%3A%5B%22ps4%22%2C%22ps5%22%5D%2C%22size%22%3A500%2C%22start%22%3A0%2C%22sortBy%22%3A%22ACTIVE_DATE%22%2C%22sortDirection%22%3A%22desc%22%2C%22subscriptionService%22%3A%22NONE%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%222c045408b0a4d0264bb5a3edfed4efd49fb4749cf8d216be9043768adff905e2%22%7D%7D`;

  const response = await call<GamesLibraryForUserResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
